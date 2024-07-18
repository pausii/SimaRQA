// login_controller.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:dio/dio.dart';
import '../../../utils/alert.dart';
import '../../../utils/storage.dart';
import '../../../config/app_config.dart';
// final dio = Dio();

class LoginController extends GetxController {
  final username = TextEditingController();
  final textFieldFocusNode1 = FocusNode();

  final password = TextEditingController();
  final textFieldFocusNode2 = FocusNode();
  var isLoading = false.obs;

  @override
  void onReady() {
    super.onReady();
    if (Storage.read("onboardingPageVisited") != "true") {
      Get.offAllNamed('/onboarding-screen');
    }
  }

  void login() async {
    if (isLoading.value == true){
      return;
    }

    isLoading.value = true;
    try {
      Dio dio = Dio();
      final response = await dio.post(
        '${AppConfig.baseUrl}/api/auth/login',
        data: {"username": username.text, "password": password.text},
      );

      if (response.statusCode == 200) {
        Alert.success("Login Success", response.data['message']);
        await Future.delayed(const Duration(seconds: 1));
        Storage.write("authToken", "${response.data['body']['token']}");
        Storage.write("userId", "${response.data['body']['user_id']}");
        Storage.write("role", "${response.data['body']['role']}");
        Get.offAllNamed('/dashboard');
      }
    } catch (e) {
      if (e is DioException) {
        if (e.response?.statusCode == 404 || e.response?.statusCode == 401) {
          Alert.error(
              "Login Failed", e.response?.data['message'] ?? "Error PS1");
        } else {
          print("ExceptionPS2: $e");
        }
      } else {
        print("ExceptionPS3: $e");
      }
    } finally {
      isLoading.value = false;
    }
  }
}
