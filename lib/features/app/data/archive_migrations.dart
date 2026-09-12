/// 为已确认兼容的策略修复和数据迁移记录版本映射，其他指纹仍严格校验。
const archiveSignatureMigrations = <String, String>{
  '790949fb83d8cc3d8a44aa464837f1574cc2f8f2b87b047be7cf4e188ea3c69c':
      'a313c3a01f120cf450d6bbdffb71abde1e93e58c80c404d116b793074de7ac16',
  '876ad184b377dfbcdbfe5f3fad8c39e7fb84b1665424ec185102a9f568254a44':
      'bb2005931d09c6a4a297eff64d530e3f80e58687e08e4bf8095cf56bb85d9249',
  '31a618a60e4a6ab4ca76a38268346e8d33e19d38b4ac8bf3cbaabb3ab2a7bcf2':
      'bb2005931d09c6a4a297eff64d530e3f80e58687e08e4bf8095cf56bb85d9249',
};
