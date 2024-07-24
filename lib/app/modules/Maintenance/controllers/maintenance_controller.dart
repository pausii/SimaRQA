import 'dart:io';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';
import 'package:path_provider/path_provider.dart';

class MaintenanceController extends GetxController {
  var dataList = <dynamic>[].obs;
  var isLoading = true.obs;

  @override
  void onReady() {
    super.onReady();
    loadData();
  }

  void loadData() async {
    isLoading.value = true;
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
    } finally {
      isLoading.value = false;
    }
  }

  getNameByCode(String code) async {
    String name = "none";
    if (code.startsWith(AssetsMushollaModel.code)) {
      name = AssetsMushollaModel().name;
    } else if (code.startsWith(AssetsAuditoriumModel.code)) {
      name = AssetsAuditoriumModel().name;
    } else if (code.startsWith(AssetsPerpustakaanModel.code)) {
      name = AssetsPerpustakaanModel().name;
    } else if (code.startsWith(AssetsUtilitasModel.code)) {
      name = AssetsUtilitasModel().name;
    }
    print(code);
    return name;
  }

  Future<void> saveReport(BuildContext context) async {
    try {
      Dio dio = Dio();
      Map<String, dynamic> headers = {
        HttpHeaders.authorizationHeader: 'Bearer ${Storage.read("authToken")}',
        HttpHeaders.contentTypeHeader: 'application/json',
      };
      var response = await dio.get(
        '${AppConfig.baseUrl}/api/maintenance/export/excel',
        options: Options(
          headers: headers,
          responseType:
              ResponseType.bytes, // Menanggapi sebagai byte untuk file
        ),
      );

      String fileName = response.headers.value('Content-Disposition')!;
      fileName = fileName.replaceAll('attachment; filename="', "");
      fileName = fileName.replaceAll('"', "");

      Directory? directory;
      if (Platform.isAndroid) {
        directory = await getExternalStorageDirectory();
      } else if (Platform.isIOS) {
        directory = await getApplicationDocumentsDirectory();
      }
      if (directory == null) {
        Alert.error("Error", "Directory not found");
        return;
      }
      String filePath = '${directory.path}/$fileName';
      File file = File(filePath);
      await file.writeAsBytes(response.data as List<int>);
      Alert.success("Success", "File downloaded at $filePath");
    } catch (e) {
      print("ExceptionPS1: $e");
      Alert.error("Error", "ExceptionPS1: $e");
    }
  }
}
