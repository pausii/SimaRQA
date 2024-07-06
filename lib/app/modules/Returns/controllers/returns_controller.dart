import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class ReturnsController extends GetxController {
  var data = {}.obs;
  String id = "";

  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
    var parameters = Get.parameters;
    id = parameters['id'] ?? "";
    loadDataById(id);
  }

  void loadDataById(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.get('${AppConfig.baseUrl}/api/borrowed-return/$id');
      if (response.statusCode == 200) {
        data.assignAll(response.data['data']);
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

  void returns() async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio
          .put('${AppConfig.baseUrl}/api/borrowed-return/$id', data: {
        "borrowed_asset_code": data["borrowed_asset_code"],
        "borrowed_name": data["borrowed_name"],
        "used_by_program": data["used_by_program"],
        "borrowed_date": data['borrowed_date'],
        "due_date": data['due_date'],
        "return_date": DateTime.now().toUtc().toIso8601String(),
        "status": "Dikembalikan",
        "notes": data['notes']
      });
      if (response.statusCode == 200) {
        Get.back(closeOverlays: true, result: true);
        await Future.delayed(const Duration(milliseconds: 100));
        Alert.success("Success", response.data['message']);
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
}
