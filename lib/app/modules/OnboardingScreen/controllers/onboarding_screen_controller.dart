import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class OnboardingScreenController extends GetxController {  
  PageController? pageViewController;
  int get pageViewCurrentIndex => pageViewController != null &&
          pageViewController!.hasClients &&
          pageViewController!.page != null
      ? pageViewController!.page!.round()
      : 0;
  
  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
  }

  void getStarted(){
    Storage.write("onboardingPageVisited", "true");
    Get.offAllNamed('/login');
  }
}
