import 'package:sembast_web/sembast_web.dart';

/// 网页使用 IndexedDB 事务，不把大型回放塞进容量很小的 localStorage。
Future<Database> openArchiveDatabase() =>
    databaseFactoryWeb.openDatabase('dragon_heroes');
