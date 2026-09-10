/// 后台通信传输，消息只使用 JSON 字符串。
abstract interface class AiTransport {
  /// 后端身份。
  String get name;

  /// 子执行环境的消息或错误。
  Stream<String> get messages;

  /// 创建一个常驻执行环境。
  Future<void> start();

  /// 发送消息，不等待规划完成。
  void send(String message);

  /// 关闭执行环境及端口。
  void close();
}
