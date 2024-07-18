import 'package:dio/dio.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class AssetsCategoryAddController extends GetxController {
  final inputCategoryName = TextEditingController();
  String action = "";
  String id = "";
  bool readonly = false;

  final count = 0.obs;
  @override
  void onInit() {
    var parameters = Get.parameters;
    action = parameters['action'] ?? '';
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
    var parameters = Get.parameters;
    id = parameters['id'] ?? '';
    if (action == 'edit') {
      loadCategory(id);
    }
  }

  void loadCategory(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/category/$id');
      if (response.statusCode == 200) {
        inputCategoryName.text = response.data['data']['category_name'] ?? "";
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

  void updateForm() async {
    if (inputCategoryName.text.isNotEmpty) {
      try {
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response = await dio.put('${AppConfig.baseUrl}/api/category/$id',
            data: {"category_name": inputCategoryName.text});
        if (response.statusCode == 200) {
          Get.back(closeOverlays: true, result: true);
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
        }
      }
    } else {
      Alert.error("Error", "Anda harus memasukan nama kategori");
    }
  }
  void submitForm() async {
    if (inputCategoryName.text.isNotEmpty) {
      try {
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response = await dio.post('${AppConfig.baseUrl}/api/category/',
            data: {"category_name": inputCategoryName.text});
        if (response.statusCode == 201) {
          Get.back(closeOverlays: true, result: true);
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
        }
      }
    } else {
      Alert.error("Error", "Anda harus memasukan nama kategori");
    }
  }
}
