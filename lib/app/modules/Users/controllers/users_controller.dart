import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class UsersController extends GetxController {
  var usersList = <dynamic>[].obs;
  var isLoading = true.obs;

  @override
  void onReady() {
    super.onReady();
    loadUsers();
  }

  void deleteUser(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.delete('${AppConfig.baseUrl}/api/user/$id');
      if (response.statusCode == 200) {
        Alert.success("Success", "User berhasil dihapus");
        loadUsers();
      }
    } catch (e) {
      print("ExceptionPS3: $e");
    }
  }

  void loadUsers() async {
    isLoading.value = true;
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] ='Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/user/');
      if (response.statusCode == 200) {
        usersList.assignAll(response.data['data']);
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
    } finally {
      isLoading.value = false;
    }
  }

}
