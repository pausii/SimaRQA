import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Alert {
  static void success(String title, String message) {
    Get.snackbar(
      title,
      message,
      backgroundColor: Colors.green.shade500,
      colorText: Colors.white,
      margin: const EdgeInsets.all(16),
    );
  }

  static void error(String title, String message, [bool confirm = false]) {
    Get.snackbar(
      title,
      message,
      backgroundColor: Colors.red.shade700,
      colorText: Colors.white,
      margin: const EdgeInsets.all(16),
    );
  }

}
