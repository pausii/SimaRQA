import 'package:get/get.dart';

import '../controllers/asset_musholla_controller.dart';

class AssetMushollaBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AssetMushollaController>(
      () => AssetMushollaController(),
    );
  }
}
