import 'package:dio/dio.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:flutter/material.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class RepairRequestAddController extends GetxController {
 late AssetsModel asset;
  final inputDamageDate = TextEditingController();
  final inputDetails = TextEditingController();
  var hintTextAssetCode = "Pilih Aset".obs;
  var hintTextStatus = "Status Perbaikan".obs;
  var assetList = <dynamic>[].obs;
  String id = "";
  var readonly = false.obs;
  String action = "";
  String userRole = "";
  var title = "".obs;

  @override
  void onInit() {
    super.onInit();
    userRole = Storage.read("role");
    
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
    inputDamageDate.text = DateFormat('yyyy-MM-dd').format(DateTime.now());

    action = parameters['action'] ?? '';
    if (action == 'viewDetail') {
      readonly.value = true;
    } else if (action == 'edit') {}
  }

  @override
  void onReady() {
    super.onReady();
    var parameters = Get.parameters;
    id = parameters['id'] ?? '';
    if (action == 'viewDetail') {
      title.value = 'Permintaan Perbaikan Aset ${asset.name.capitalize}';
      loadDataById(id);
    } else if (action == 'edit') {
      title.value =  'Edit Permintaan Perbaikan Aset ${asset.name.capitalize}';
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
      var response = await dio.get('${AppConfig.baseUrl}/api/request-repair/$id');
      if (response.statusCode == 200) {
        inputDetails.text = response.data['data']['notes'];
        hintTextAssetCode.value =
            "${response.data['data']['request_asset_code']} - ${response.data['data']['request_asset_name']}";
        inputDamageDate.text = DateFormat('yyyy-MM-dd')
            .format(DateTime.parse(response.data['data']['damage_date']));
        
        assetList.assignAll([{
          "asset_code": response.data['data']['request_asset_code'],
          "asset_name": response.data['data']['request_asset_name'],
        }]);

        hintTextStatus.value = response.data['data']['status_confirmation'];
      }
    } catch (e) {
      if (e is DioException) {
        if (e.response?.statusCode == 401) {
          Get.offAllNamed("/login");
        } else {
          print("ExceptionPS2: $e");
        }
      } else {
        print("ExceptionPS31: $e");
      }
    }
  }

  void updateForm() async {
    if (hintTextAssetCode.value == "Pilih Aset") {
      Alert.error("Error", "Anda harus memilih asset");
    } else if (inputDamageDate.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan tanggal kerusakan");
    } else if (hintTextStatus.value == "Status Perbaikan") {
      Alert.error("Error", "Anda harus memilih status perbaikan");
    } else if (inputDetails.text.isEmpty) {
      Alert.error("Error", "Anda belum memasukan detail kerusakan");
    } else {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.put('${AppConfig.baseUrl}/api/request-repair/$id', data: {
        "request_asset_code": hintTextAssetCode.value.split(" ")[0],
        "request_date": inputDamageDate.text,
        "status_confirmation": hintTextStatus.value,
        "notes": inputDetails.text
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
      } else if (inputDamageDate.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan tanggal kerusakan");
      } else if (inputDetails.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan detail kerusakan");
      } else {
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response =
            await dio.post('${AppConfig.baseUrl}/api/request-repair/', data: {
          "request_asset_code": hintTextAssetCode.value.split(" ")[0],
          "damage_date": inputDamageDate.text,
          "status_confirmation": "Sedang Dikonfirmasi", // TODO: status may change
          "notes":
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
        print("ExceptionPS32: $e");
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
        print("ExceptionPS33: $e");
      }
    }
  }
}
