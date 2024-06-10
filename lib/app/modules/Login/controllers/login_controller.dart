// login_controller.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginController extends GetxController {
  final textController1 = TextEditingController();
  final textFieldFocusNode1 = FocusNode();
  
  final textController2 = TextEditingController();
  final textFieldFocusNode2 = FocusNode();

  @override
  void onClose() {
    textController1.dispose();
    textFieldFocusNode1.dispose();
    textController2.dispose();
    textFieldFocusNode2.dispose();
    super.onClose();
  }
}
