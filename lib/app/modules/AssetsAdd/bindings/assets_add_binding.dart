import 'package:get/get.dart';

import '../controllers/assets_add_controller.dart';

class AssetsAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AssetsAddController>(
      () => AssetsAddController(),
    );
  }
}
