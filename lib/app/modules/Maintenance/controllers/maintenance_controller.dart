import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class MaintenanceController extends GetxController {
  var dataList = <dynamic>[].obs;

  @override
  void onReady() {
    super.onReady();
    loadAssets();
  }

   void loadAssets() async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/maintenance/');
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

  getNameByCode(String code) async {
    String name = "none";
    if (code.startsWith(AssetsMushollaModel.code)){
      name = AssetsMushollaModel().name;
    } else if (code.startsWith(AssetsAuditoriumModel.code)){
      name = AssetsAuditoriumModel().name;
    } else if (code.startsWith(AssetsPerpustakaanModel.code)){
      name = AssetsPerpustakaanModel().name;
    } else if (code.startsWith(AssetsUtilitasModel.code)){
      name = AssetsUtilitasModel().name;
    }
    print(code);
    return name;
  }
}
