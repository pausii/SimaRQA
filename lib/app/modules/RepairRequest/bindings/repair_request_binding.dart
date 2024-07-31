import 'package:get/get.dart';

import '../controllers/repair_request_controller.dart';

class RepairRequestBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<RepairRequestController>(
      () => RepairRequestController(),
    );
  }
}
