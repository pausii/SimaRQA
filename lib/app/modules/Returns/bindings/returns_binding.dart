import 'package:get/get.dart';

import '../controllers/returns_controller.dart';

class ReturnsBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ReturnsController>(
      () => ReturnsController(),
    );
  }
}
