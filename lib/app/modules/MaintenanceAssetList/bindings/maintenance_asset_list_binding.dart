import 'package:get/get.dart';

import '../controllers/maintenance_asset_list_controller.dart';

class MaintenanceAssetListBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<MaintenanceAssetListController>(
      () => MaintenanceAssetListController(),
    );
  }
}
