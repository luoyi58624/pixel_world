"""按模拟对局的实际经济事件对账，不把 AI 计划或重复的决策摘要计入收支。"""
import argparse
import json
from collections import Counter
from pathlib import Path


def audit(directory):
    """逐国重建国库，核验每次扣款、月结和灭国转移后余额。"""
    runs = json.loads((directory / 'results.json').read_text(encoding='utf-8'))
    reports, errors = [], []
    kinds = {
        'cityUpgraded', 'soldiersRecruited', 'heroDrawn', 'heroSigned',
        'heroDismissed', 'weaponPurchased', 'supplyPaid', 'monthSettled',
        'treasuryCaptured',
    }
    for run in runs:
        final = {r['country']: r for r in run['final']}
        for initial in run['initial']:
            country = initial['country']
            file = directory / f"world{run['world']}_seed{run['seed']}_country{country}.jsonl"
            balance, changes, months = initial['gold'], Counter(), set()
            for line in file.read_text(encoding='utf-8').splitlines():
                e = json.loads(line)
                kind, d = e['kind'], e['data']
                if e['phase'] != 'applied' or kind not in kinds:
                    continue
                before = d.get('goldBefore', d.get('before', {}).get('gold'))
                after = d.get('goldAfter', d.get('after', {}).get('gold'))
                if kind == 'treasuryCaptured':
                    delta = d['gold'] * (1 if country == d['toCountry'] else -1)
                    before, after = balance, balance + delta
                if before is None or after is None:
                    errors.append({'file': file.name, 'event': e['sequence'], 'error': '缺少收支快照', 'kind': kind})
                    continue
                if before != balance:
                    errors.append({'file': file.name, 'event': e['sequence'], 'error': '余额不连续', 'expected': balance, 'actual': before})
                if kind == 'monthSettled':
                    key = (e['year'], e['month'])
                    if key in months:
                        errors.append({'file': file.name, 'event': e['sequence'], 'error': '同一月份重复结算'})
                    months.add(key)
                    if after != max(0, before + d['income'] - d['salary']):
                        errors.append({'file': file.name, 'event': e['sequence'], 'error': '月结算式错误'})
                    if 'fixedIncome' in d and d['baseIncome'] != d['fixedIncome'] + sum(c['income'] for c in d['cities']):
                        errors.append({'file': file.name, 'event': e['sequence'], 'error': '城池收入重复或漏算'})
                    changes['grossIncome'] += d['income']
                    changes['salaryCharged'] += min(d['salary'], max(0, before + d['income']))
                changes[kind] += after - before
                balance = after
            if balance != final[country]['gold']:
                errors.append({'file': file.name, 'error': '最终余额不一致', 'expected': balance, 'actual': final[country]['gold']})
            reports.append({'world': run['world'], 'seed': run['seed'], 'country': country, 'name': initial['name'], 'initialGold': initial['gold'], 'finalGold': balance, 'changes': dict(changes)})
    return {'games': len(runs), 'countries': len(reports), 'errors': errors, 'accounts': reports}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path, help='使用 --trace 生成的完整对局目录')
    args = parser.parse_args()
    report = audit(args.directory)
    target = args.directory / 'economy_audit.json'
    target.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({k: v for k, v in report.items() if k != 'accounts'}, ensure_ascii=False))
    print(f'对账明细：{target}')
    raise SystemExit(1 if report['errors'] else 0)
