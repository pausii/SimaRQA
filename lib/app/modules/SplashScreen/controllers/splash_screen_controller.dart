import 'package:get/get.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class SplashScreenController extends GetxController {
  @override
  void onReady() {
    super.onReady();
    if (Storage.read("onboardingPageVisited") != "true") {
      Get.offAllNamed('/onboarding-screen');
    } else if (Storage.read("authToken") == "") {
      Get.offAllNamed('/login');
    }else{
      Get.offAllNamed('/dashboard');
    }
  }
}
