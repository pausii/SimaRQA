import 'package:get/get.dart';

import '../controllers/maintenance_add_controller.dart';

class MaintenanceAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<MaintenanceAddController>(
      () => MaintenanceAddController(),
    );
  }
}
