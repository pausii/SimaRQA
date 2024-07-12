import 'package:get/get.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class DashboardController extends GetxController {
  // stats Aset
  final musholla = 0.obs;
  final auditorium = 0.obs;
  final perpustakaan = 0.obs;
  final utilitas = 0.obs;

  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
    if (Storage.read("authToken") == ""){
      Get.offAllNamed('/login');
    }
  }
}
