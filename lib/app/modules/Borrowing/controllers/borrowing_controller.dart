import 'dart:io';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

class BorrowingController extends GetxController {
  var dataList = <dynamic>[].obs;
  var isLoading = true.obs;

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
    isLoading.value = true;
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/borrowed-return/');
      if (response.statusCode == 200) {
        dataList.assignAll(response.data['data']);
      }
    } catch (e) {
      if (e is DioException) {
        if (e.response?.statusCode == 401) {
          Get.offAllNamed("/login");
        } else if (e.response?.statusCode == 404) {
          Alert.error("Error", e.response?.data['message'] ?? "Error PS1");
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

  Future<void> saveReport(BuildContext context) async {
    try {
      Dio dio = Dio();
      Map<String, dynamic> headers = {
        HttpHeaders.authorizationHeader: 'Bearer ${Storage.read("authToken")}',
        HttpHeaders.contentTypeHeader: 'application/json',
      };
      var response = await dio.get(
        '${AppConfig.baseUrl}/api/borrowed-return/export/excel',
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

      // String downloadsPath = '/storage/emulated/0/Download';
      // Directory? downloadsDirectory;
      // downloadsDirectory = await getExternalStorageDirectory();
      // String downloadsPath = '${downloadsDirectory?.path.split('Android')[0]}Download';
      // print(downloadsPath);
      // return;
      // String filePath = '$downloadsPath/$fileName';
      // print(filePath.toString());
      // File fileDef = File(filePath.toString());
      // try {
      //   await fileDef.create(recursive: true);
      //   File file = File(filePath.toString());
      //   await file.writeAsBytes(response.data as List<int>);
      //   Alert.success("Success", "File downloaded at $filePath");
      // } catch (e) {
      //   Alert.error("Error", "Gagal menyimpan file: $e");
      // }
      // } else {
      //   Alert.error("Error", "Izin storage ditolak");
      // }
    } catch (e) {
      print("ExceptionPS1: $e");
      Alert.error("Error", "ExceptionPS1: $e");
    }
  }
}
