import 'package:get/get.dart';

import '../controllers/assets_category_controller.dart';

class AssetsCategoryBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AssetsCategoryController>(
      () => AssetsCategoryController(),
    );
  }
}
