import 'package:get/get.dart';

import '../controllers/borrowing_controller.dart';

class BorrowingBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<BorrowingController>(
      () => BorrowingController(),
    );
  }
}
