import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class UsersAddController extends GetxController {
  var readonly = false.obs;
  final inputUsername = TextEditingController();
  final inputPassword = TextEditingController();
  final inputFirstName = TextEditingController();
  final inputLastName = TextEditingController();
  final inputTelp = TextEditingController();
  final inputAddress = TextEditingController();
  var title = "".obs;

  var hintTextRole = "Level User".obs;
  String action = "";
  String userId = "";

  @override
  void onInit() {
    super.onInit();
    var parameters = Get.parameters;
    action = parameters['action'] ?? '';
    if (action == 'viewDetail') {
      title.value = 'Data User';
    } else if (action == 'edit') {
      title.value = 'Edit Data User';
    }else{
      title.value = 'Tambah Data User';
    }
  }

  @override
  void onReady() {
    super.onReady();
    var parameters = Get.parameters;
    userId = parameters['id'] ?? '';
    if (action == 'viewDetail') {
      readonly.value = true;
      loadUser(userId);
    } else if (action == 'edit') {
      loadUser(userId);
    }
  }

  void loadUser(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/user/$id');
      if (response.statusCode == 200) {
        inputUsername.text = response.data['data']['username'];
        // inputPassword.text = response.data['data']['password'];
        hintTextRole.value = response.data['data']['role'];
        inputFirstName.text = response.data['data']['first_name'];
        inputLastName.text = response.data['data']['last_name'];
        inputTelp.text = response.data['data']['phone_number'];
        inputAddress.text = response.data['data']['address'];
      }
    } catch (e) {
      if (e is DioException) {
        if (e.response?.statusCode == 401) {
          Get.offAllNamed("/login");
        } else {
          print("ExceptionPS2: $e");
        }
      } else {
        print("ExceptionPS3: $e");
      }
    }
  }

  void submitForm() async {
    if (allFormFieldValid()) {
      try {
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response = await dio.post('${AppConfig.baseUrl}/api/user/', data: {
          "username": inputUsername.text,
          "password": inputPassword.text,
          "role": hintTextRole.value,
          "first_name": inputFirstName.text,
          "last_name": inputLastName.text,
          "phone_number": inputTelp.text,
          "address": inputAddress.text
        });
        if (response.statusCode == 201) {
          Get.back(closeOverlays: true, result: true);
          await Future.delayed(const Duration(milliseconds: 100));
          Alert.success("Success", response.data['message']);
        }
      } catch (e) {
        if (e is DioException) {
          if (e.response?.statusCode == 401) {
            Get.offAllNamed("/login");
          } else if (e.response?.statusCode == 500) {
            Alert.error("Error", e.response?.data['message'] ?? "Error PS1");
          } else {
            print("ExceptionPS2: $e");
          }
        } else {
          print("ExceptionPS3: $e");
        }
      }
    }
  }

  void updateForm() async {
    if (allFormFieldValid(false)) {
      try {
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response =
            await dio.put('${AppConfig.baseUrl}/api/user/$userId', data: {
          "username": inputUsername.text,
          "role": hintTextRole.value,
          "first_name": inputFirstName.text,
          "last_name": inputLastName.text,
          "phone_number": inputTelp.text,
          "address": inputAddress.text,
          "password": inputPassword.text == "" ? null : inputPassword.text,
        });
        if (response.statusCode == 200) {
          Get.back(closeOverlays: true, result: true);
          Alert.success("Success", response.data['message']);
        }
      } catch (e) {
        if (e is DioException) {
          if (e.response?.statusCode == 401) {
            Get.offAllNamed("/login");
          } else if (e.response?.statusCode == 500 || e.response?.statusCode == 404) {
            Alert.error("Error", e.response?.data['message'] ?? "Error PS1");
          } else {
            print("ExceptionPS2: $e");
          }
        } else {
          print("ExceptionPS3: $e");
        }
      }
    }
  }

  bool allFormFieldValid([bool password = true]) {
    if (inputUsername.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan username");
    } else if (inputPassword.text.isEmpty && password) {
      Alert.error("Error", "Anda belum memasukan password");
    } else if (inputFirstName.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan nama depan");
    } else if (inputLastName.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan nama belakang");
    } else if (inputTelp.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan nomor telepon");
    } else if (inputAddress.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan alamat");
    } else if (hintTextRole.value == "Level User") {
      Alert.error("Error", "Anda belum memilih level user");
    }
    return true;
  }
}
