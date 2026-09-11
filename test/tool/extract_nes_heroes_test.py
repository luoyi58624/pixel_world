"""验证游戏目录精简后重复提取不会丢失配置或恢复冗余字段。"""

import copy
import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tool"))
from extract_nes_heroes import GAME_HERO_FIELDS, game_catalog


def _hero(hero_id):
    return {
        "id": hero_id, "name": None if hero_id == 40 else f"hero-{hero_id}",
        "type": "protagonist" if hero_id == 40 else "advanced",
        "maxHp": 95, "combat": 15, "politics": 10, "salary": 8,
        "eggCapable": True, "soldierLimit": 4,
        "encodedName": [57, 113, 0], "romGlyphTranscription": "source-name",
        "rawTypeSeed": 0, "rawEggFlags": 128,
        "initialEggCharges": 3, "initialEggState": 0,
        "initialStationedSoldiers": 0, "initialAceIds": [],
        "sourceFileOffsets": {"combat": 98748}, "nameSource": "rom",
    }


class HeroCatalogExportTest(unittest.TestCase):
    def test_only_game_fields_are_exported(self):
        """原始提取字段与顶层说明不进入游戏JSON。"""
        source = {"version": 1, "sourceSha256": "source", "notes": {},
                  "heroes": [_hero(0), _hero(40)]}
        before = copy.deepcopy(source)
        result = game_catalog(source)
        self.assertEqual(set(result), {"version", "heroes"})
        self.assertEqual([h["id"] for h in result["heroes"]], [40, 0])
        for hero in result["heroes"]:
            self.assertEqual(set(hero), set(GAME_HERO_FIELDS))
        self.assertEqual(source, before)

    def test_clean_catalog_preserves_values_extensions_and_order_on_reexport(self):
        """删除ROM标记后，重复导出仍保留月俸、扩展将领和用户排序。"""
        source = {"heroes": [_hero(0), _hero(1), _hero(40)]}
        existing = game_catalog({"heroes": [_hero(0), _hero(40)]})
        protagonist, hero = existing["heroes"]
        hero.update(name="custom-name", type="normal", maxHp=77, combat=14,
                    morale=95, politics=3, salary=6, nativeCountryId=2)
        extension = {**hero, "id": 100, "combat": 18, "salary": 7}
        existing["heroes"] = [hero, extension, protagonist]
        before = copy.deepcopy(existing)
        result = game_catalog(source, existing)
        self.assertEqual([h["id"] for h in result["heroes"]], [40, 0, 100, 1])
        self.assertEqual(result["heroes"][1], hero)
        self.assertEqual(result["heroes"][2], extension)
        self.assertEqual(game_catalog(source, result), result)
        self.assertEqual(existing, before)

    def test_old_metadata_is_removed_without_replacing_game_salary(self):
        """旧目录的游戏月俸不会被原版报酬或默认值替换。"""
        previous = {**_hero(0), "salary": 6, "romSalary": 8,
                    "romCombat": 15, "morale": 100, "nativeCountryId": 0}
        result = game_catalog({"heroes": [_hero(0)]}, {"heroes": [previous]})
        hero = result["heroes"][0]
        self.assertEqual(hero["salary"], 6)
        self.assertEqual(hero["combat"], 15)
        self.assertNotIn("romCombat", hero)
        self.assertNotIn("romSalary", hero)
        self.assertNotIn("encodedName", hero)

    def test_invalid_editable_values_stop_export(self):
        """无效属性使导出失败，不能用默认值悄悄覆盖用户输入。"""
        source = {"heroes": [_hero(0)]}
        for key, value in [("salary", -1), ("combat", 64), ("morale", 101)]:
            with self.subTest(key=key):
                previous = {**_hero(0), key: value}
                with self.assertRaises(ValueError):
                    game_catalog(source, {"heroes": [previous]})

    def test_runtime_catalog_has_all_characters_and_only_runtime_fields(self):
        """正式资源保持47名将领，原版与扩展角色均使用精简格式。"""
        data = json.loads((ROOT / "assets/data/rom_heroes.json").read_text(encoding="utf-8"))
        self.assertEqual(set(data), {"version", "heroes"})
        self.assertEqual(len(data["heroes"]), 47)
        self.assertEqual({h["id"] for h in data["heroes"]}, set(range(41)) | set(range(100, 106)))
        for hero in data["heroes"]:
            self.assertEqual(set(hero), set(GAME_HERO_FIELDS))


if __name__ == "__main__":
    unittest.main()
