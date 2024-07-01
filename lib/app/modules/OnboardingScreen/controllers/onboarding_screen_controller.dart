import 'package:get/get.dart';
import 'package:flutter/material.dart';
// import 'package:flutterflow_ui/flutterflow_ui.dart';
// import 'package:flutterflow_ui/src/flutter_flow/flutter_flow_animations.dart';
// import 'package:flutter_animate/flutter_animate.dart';

class OnboardingScreenController extends GetxController {
  //TODO: Implement OnboardingScreenController
  
  PageController? pageViewController;

  int get pageViewCurrentIndex => pageViewController != null &&
          pageViewController!.hasClients &&
          pageViewController!.page != null
      ? pageViewController!.page!.round()
      : 0;
  final count = 0.obs;
  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

  void increment() => count.value++;
}
