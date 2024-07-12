import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
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
    if (Storage.read("authToken") == "") {
      Get.offAllNamed('/login');
    }

    loadData();
  }

  void loadData() async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      
      var response = await dio.get('${AppConfig.baseUrl}/api/auditorium/stats');
      if (response.statusCode == 200) {
        auditorium.value = response.data['auditorium'];
      }

      response = await dio.get('${AppConfig.baseUrl}/api/musholla/stats');
      if (response.statusCode == 200) {
        musholla.value = response.data['musholla'];
      }

      response = await dio.get('${AppConfig.baseUrl}/api/perpustakaan/stats');
      if (response.statusCode == 200) {
        perpustakaan.value = response.data['perpustakaan'];
      }

      response = await dio.get('${AppConfig.baseUrl}/api/utilitas/stats');
      if (response.statusCode == 200) {
        utilitas.value = response.data['utilitas'];
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
