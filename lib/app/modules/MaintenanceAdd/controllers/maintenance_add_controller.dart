import 'package:dio/dio.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:flutter/material.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class MaintenanceAddController extends GetxController {
  late AssetsModel asset;
  final inputMaintenanceDate = TextEditingController();
  final inputPrice = TextEditingController();
  final inputDetails = TextEditingController();
  var hintTextAssetCondition = "Kondisi Aset".obs;
  var hintTextAssetCode = "Pilih Aset".obs;
  var assetList = <dynamic>[].obs;
  String id = "";
  bool readonly = false;
  String action = "";

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
    inputMaintenanceDate.text = DateFormat('yyyy-MM-dd').format(DateTime.now());

    action = parameters['action'] ?? '';
    if (action == 'viewDetail') {
      readonly = true;
    } else if (action == 'edit') {}
  }

  @override
  void onReady() {
    super.onReady();
    var parameters = Get.parameters;
    id = parameters['id'] ?? '';
    if (action == 'viewDetail') {
      loadDataById(id);
    } else if (action == 'edit') {
      loadDataById(id);
    } else {
      loadAssetList();
    }
  }

  void loadDataById(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/maintenance/$id');
      if (response.statusCode == 200) {
        inputPrice.text = response.data['data']['price_maintenance'].toString();
        inputDetails.text = response.data['data']['details_maintenance'];
        hintTextAssetCode.value =
            "${response.data['data']['maintenance_asset_code']} - ${response.data['data']['maintenance_asset_name']}";
        hintTextAssetCondition.value =
            response.data['data']['maintenance_asset_condition'];
        inputMaintenanceDate.text = DateFormat('yyyy-MM-dd')
            .format(DateTime.parse(response.data['data']['maintenance_date']));
        
        assetList.assignAll([{
          "asset_code": response.data['data']['maintenance_asset_code'],
          "asset_name": response.data['data']['maintenance_asset_name'],
        }]);
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

  void updateForm() async {
    if (hintTextAssetCode.value == "Pilih Aset") {
      Alert.error("Error", "Anda harus memilih asset");
    } else if (inputMaintenanceDate.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan tanggal pemeliharaan");
    } else if (hintTextAssetCondition.value == "Kondisi Aset") {
      Alert.error("Error", "Anda belum memasukan kondisi aset");
    } else if (inputPrice.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan biaya pemeliharaan");
    } else if (inputDetails.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan detail pemeliharaan");
    } else {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.put('${AppConfig.baseUrl}/api/maintenance/$id', data: {
        "maintenance_asset_code": hintTextAssetCode.value.split(" ")[0],
        "maintenance_date": inputMaintenanceDate.text,
        "price_maintenance": inputPrice.text,
        "maintenance_asset_condition": hintTextAssetCondition.value,
        "details_maintenance": inputDetails.text
      });
      if (response.statusCode == 200) {
        Get.back(closeOverlays: true, result: true);
        await Future.delayed(const Duration(milliseconds: 100));
        Alert.success("Success", response.data['message']);
      }
    }
  }

  void submitForm() async {
    try {
      if (hintTextAssetCode.value == "Pilih Aset") {
        Alert.error("Error", "Anda harus memilih asset");
      } else if (inputMaintenanceDate.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan tanggal pemeliharaan");
      } else if (hintTextAssetCondition.value == "Kondisi Aset") {
        Alert.error("Error", "Anda belum memasukan kondisi aset");
      } else if (inputPrice.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan biaya pemeliharaan");
      } else if (inputDetails.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan detail pemeliharaan");
      } else {
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response =
            await dio.post('${AppConfig.baseUrl}/api/maintenance', data: {
          "maintenance_asset_code": hintTextAssetCode.value.split(" ")[0],
          "maintenance_date": inputMaintenanceDate.text,
          "maintenance_asset_condition": hintTextAssetCondition.value,
          "price_maintenance": inputPrice.text,
          "details_maintenance":
              inputDetails.text.isEmpty ? "" : inputDetails.text
        });
        if (response.statusCode == 201) {
          Get.back(closeOverlays: true, result: true);
          await Future.delayed(const Duration(milliseconds: 100));
          Alert.success("Success", response.data['message']);
        }
      }
    } catch (e) {
      if (e is DioException) {
        if (e.response?.statusCode == 401) {
          Get.offAllNamed("/login");
        }
        if (e.response?.statusCode == 500) {
          Alert.error("Error", e.response?.data['message'] ?? "Error PSX1");
        } else {
          print("ExceptionPS2: $e");
        }
      } else {
        print("ExceptionPS3: $e");
      }
    }
  }

  void loadAssetList() async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.get('${AppConfig.baseUrl}/api/${asset.apiPath}/');
      if (response.statusCode == 200) {
        assetList.assignAll(response.data['data']);
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
