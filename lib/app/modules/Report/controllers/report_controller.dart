import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

class ReportController extends GetxController {
  late AssetsModel asset;
  var dataList = <dynamic>[].obs;
  var isLoading = false.obs;

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
    loadData(asset.apiPath);
  }

  void loadData(String name) async {
    isLoading.value = true;
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
    } finally {
      isLoading.value = false;
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
      // if (!(await Permission.storage.isGranted) ||
      //     !(await Permission.manageExternalStorage.isGranted)) {
      //   await Permission.storage.request();
      //   await Permission.manageExternalStorage
      //       .request(); // for android above 11
      // }

      // if (await Permission.manageExternalStorage.isGranted ||
      //     await Permission.storage.isGranted) {
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
