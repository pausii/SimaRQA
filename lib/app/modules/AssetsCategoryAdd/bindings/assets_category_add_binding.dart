import 'package:get/get.dart';

import '../controllers/assets_category_add_controller.dart';

class AssetsCategoryAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AssetsCategoryAddController>(
      () => AssetsCategoryAddController(),
    );
  }
}
