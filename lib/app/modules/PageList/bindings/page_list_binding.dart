import 'package:get/get.dart';

import '../controllers/page_list_controller.dart';

class PageListBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PageListController>(
      () => PageListController(),
    );
  }
}
