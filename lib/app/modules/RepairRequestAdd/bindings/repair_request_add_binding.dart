import 'package:get/get.dart';

import '../controllers/repair_request_add_controller.dart';

class RepairRequestAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<RepairRequestAddController>(
      () => RepairRequestAddController(),
    );
  }
}
