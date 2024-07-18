import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class DashboardController extends GetxController {
  // stats Aset
  final musholla = "0".obs;
  final auditorium = "0".obs;
  final perpustakaan = "0".obs;
  final utilitas = "0".obs;

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

    musholla.value = Storage.read("totalMusholla") == "" ? "0" : Storage.read("totalMusholla");
    auditorium.value = Storage.read("totalAuditorium") == "" ? "0" : Storage.read("totalAuditorium");
    perpustakaan.value = Storage.read("totalPerpustakaan") == "" ? "0" : Storage.read("totalPerpustakaan");
    utilitas.value = Storage.read("totalUtilitas") == "" ? "0" : Storage.read("totalUtilitas");

    loadData();
  }

  void loadData() async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      
      var response = await dio.get('${AppConfig.baseUrl}/api/statistics');
      if (response.statusCode == 200) {
        auditorium.value = response.data['auditorium'].toString();
        musholla.value = response.data['musholla'].toString();
        perpustakaan.value = response.data['perpustakaan'].toString();
        utilitas.value = response.data['utilitas'].toString();
        Storage.write("totalAuditorium", auditorium.value.toString());
        Storage.write("totalMusholla", musholla.value.toString());
        Storage.write("totalPerpustakaan", perpustakaan.value.toString());
        Storage.write("totalUtilitas", utilitas.value.toString());
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
