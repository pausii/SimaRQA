import 'package:get/get.dart';

import '../controllers/borrowing_add_controller.dart';

class BorrowingAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<BorrowingAddController>(
      () => BorrowingAddController(),
    );
  }
}
