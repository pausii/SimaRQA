import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class BorrowingController extends GetxController {
  var dataList = <dynamic>[].obs;
  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
    loadDataList();
  }

    void loadDataList() async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] ='Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/borrowed-return/');
      if (response.statusCode == 200) {
       dataList.assignAll(response.data['data']);
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
