import 'package:get/get.dart';

import '../controllers/users_add_controller.dart';

class UsersAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<UsersAddController>(
      () => UsersAddController(),
    );
  }
}
