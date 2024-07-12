import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';
// ignore: depend_on_referenced_packages
import 'package:file_picker/file_picker.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as path;

class ReportController extends GetxController {
  late AssetsModel asset;
  var dataList = <dynamic>[].obs;

  final count = 0.obs;
  @override
  void onInit() {
    super.onInit();
    var parameters = Get.parameters;
    String? name = parameters['name'];
    if (name == 'musholla') {
      asset = AssetsMushollaModel();
    } else if (name == 'auditorium') {
      asset = AssetsAuditoriumModel();
    } else if (name == 'perpustakaan') {
      asset = AssetsPerpustakaanModel();
    } else if (name == 'utilitas') {
      asset = AssetsUtilitasModel();
    }
  }

  @override
  void onReady() {
    super.onReady();
    loadAssets(asset.apiPath);
  }

  void loadAssets(String name) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/$name');
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

  String formatDate(String dateString, String format) {
    DateTime date = DateTime.parse(dateString);
    DateFormat formatter = DateFormat(format);
    return formatter.format(date);
  }

  String currencyFormat(String value) {
    final formatCurrency =
        NumberFormat.currency(locale: 'id', symbol: 'Rp', decimalDigits: 0);
    return formatCurrency.format(double.parse(value));
  }

  Future<void> saveReport(BuildContext context) async {
    try {
      // Mendapatkan direktori penyimpanan lokal yang tersedia
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

      Dio dio = Dio();
      Map<String, dynamic> headers = {
        HttpHeaders.authorizationHeader: 'Bearer ${Storage.read("authToken")}',
        HttpHeaders.contentTypeHeader: 'application/json',
      };
      var response = await dio.get(
        '${AppConfig.baseUrl}/api/${asset.apiPath}-reports/export/excel',
        options: Options(
          headers: headers,
          responseType:
              ResponseType.bytes, // Menanggapi sebagai byte untuk file
        ),
      );

      String fileName = response.headers.value('Content-Disposition')!;
      
      // ignore: unnecessary_null_comparison
      if (directory != null) {
        String filePath = '${directory.path}/$fileName';
        File file = File(filePath);
        await file.writeAsBytes(response.data as List<int>);
        Alert.success("Success", "File downloaded at $filePath");
        return;
      } else {
        Alert.error("Error", "Failed to get storage directory");
        return;
      }
    } catch (e) {
      print("ExceptionPS1: $e");
      Alert.error("Error", "ExceptionPS1: $e");
    }
  }
}