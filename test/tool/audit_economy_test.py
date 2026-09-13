"""验证经济对账同时支持旧版零下限和新版逐城收成、军费透支。"""
import json
import runpy
import tempfile
import unittest
from pathlib import Path


class EconomyAuditTest(unittest.TestCase):
    def run_audit(self, entries, final):
        audit = runpy.run_path('tool/audit_economy.py')['audit']
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            results = [{'world': 0, 'seed': 1,
                        'initial': [{'country': 0, 'name': '测试国', 'gold': 1}],
                        'final': [{'country': 0, 'gold': final}]}]
            (root / 'results.json').write_text(json.dumps(results), encoding='utf-8')
            rows = [dict(sequence=i + 1, year=1, month=1, phase='applied',
                         kind=kind, data=data) for i, (kind, data) in enumerate(entries)]
            (root / 'world0_seed1_country0.jsonl').write_text(
                '\n'.join(json.dumps(row) for row in rows), encoding='utf-8')
            return audit(root)

    def test_credit_and_independent_cities(self):
        entries = [
            ('soldiersRecruited', {'goldBefore': 1, 'goldAfter': -3}),
            ('supplyPaid', {'goldBefore': -3, 'goldAfter': -4}),
            ('monthSettled', {'economyVersion': 2, 'goldBefore': -4, 'goldAfter': -29,
                              'income': -10, 'salary': 15, 'baseIncome': 50,
                              'fixedIncome': 10, 'cities': [
                                  {'id': n, 'baseIncome': 20, 'adjustment': -30, 'income': -10}
                                  for n in range(2)]}),
        ]
        report = self.run_audit(entries, -29)
        self.assertEqual(report['errors'], [])
        self.assertEqual(report['accounts'][0]['changes']['salaryCharged'], 15)

    def test_legacy_floor_is_preserved(self):
        report = self.run_audit([('monthSettled', {
            'goldBefore': 1, 'goldAfter': 0, 'income': 10, 'salary': 15,
            'baseIncome': 10, 'fixedIncome': 0, 'cities': [{'income': 10}],
        })], 0)
        self.assertEqual(report['errors'], [])
        self.assertEqual(report['accounts'][0]['changes']['salaryCharged'], 11)

    def test_departure_income_is_counted_once_with_country_harvest(self):
        entries = [
            ('heroDeparted', {'before': {'gold': 1}, 'after': {'gold': 16},
                              'reward': 15, 'settledIn': 'monthSettled'}),
            ('monthSettled', {'economyVersion': 4, 'goldBefore': 1, 'goldAfter': 11,
                              'baseIncome': 20, 'fixedIncome': 10, 'adjustment': -20,
                              'income': 0, 'salaryDue': 30, 'salary': 5,
                              'departureIncome': 15, 'departedHeroes': 1,
                              'cities': [{'id': 0, 'baseIncome': 10,
                                          'adjustment': 0, 'income': 10}]}),
        ]
        report = self.run_audit(entries, 11)
        self.assertEqual(report['errors'], [])
        self.assertEqual(report['accounts'][0]['changes']['departureIncome'], 15)
        entries[1][1]['goldAfter'] += 15
        report = self.run_audit(entries, 26)
        self.assertTrue(any(e['error'] == '月结算式错误' for e in report['errors']))

    def test_invalid_city_income_is_reported(self):
        report = self.run_audit([('monthSettled', {
            'economyVersion': 2, 'goldBefore': 1, 'goldAfter': 11,
            'income': 10, 'salary': 0, 'baseIncome': 30, 'fixedIncome': 10,
            'cities': [{'id': 0, 'baseIncome': 20, 'adjustment': -30, 'income': 0}],
        })], 11)
        self.assertTrue(any(e['error'] == '单城收成算式错误' for e in report['errors']))

    def test_defeated_treasury_clear_is_an_explicit_outflow(self):
        report = self.run_audit([('treasuryCleared', {
            'goldBefore': 1, 'goldAfter': 0,
        })], 0)
        self.assertEqual(report['errors'], [])
        self.assertEqual(report['accounts'][0]['changes']['treasuryCleared'], -1)


if __name__ == '__main__':
    unittest.main()
