import 'package:path_provider/path_provider.dart';
import 'package:sembast/sembast_io.dart';

/// 应用支持目录内的事务数据库，正常关闭与异常退出共用恢复路径。
Future<Database> openArchiveDatabase() async {
  final directory = await getApplicationSupportDirectory();
  await directory.create(recursive: true);
  return databaseFactoryIo.openDatabase('${directory.path}/dragon_heroes.db');
}
