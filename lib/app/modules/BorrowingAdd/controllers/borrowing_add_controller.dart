import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class BorrowingAddController extends GetxController {
  late AssetsModel asset;
  bool readonly = false;
  String action = '';
  String id = "";

  // Borrower Input variable
  final inputName = TextEditingController();
  final inputDate = TextEditingController();
  final inputDateReturned = TextEditingController();
  final inputNotes = TextEditingController();
  var assetList = <dynamic>[].obs;
  var hintTextAssetCode = "Pilih Aset".obs;
  var hintTextPrograms = "Pilih Program".obs;

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
    inputDate.text = DateFormat('yyyy-MM-dd').format(DateTime.now());

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

  void updateForm() async {}

  void submitForm() async {
    try {
      if (hintTextAssetCode.value == "Pilih Aset") {
        Alert.error("Error", "Anda harus memilih asset");
      } else if (inputName.text.isEmpty) {
        Alert.error("Error", "Anda harus memasukan nama peminjam");
      } else if (hintTextPrograms.value == "Pilih Program") {
        Alert.error("Error", "Anda harus memilih program");
      } else if (inputDate.text.isEmpty) {
        Alert.error("Error", "Anda harus memasukan tanggal pinjam");
      } else if (inputDateReturned.text.isEmpty) {
        Alert.error("Error", "Anda harus memasukan tanggal kembali");
      } else if (inputNotes.text.isEmpty) {
        Alert.error("Error", "Anda harus memasukan catatan");
      } else {
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response =
            await dio.post('${AppConfig.baseUrl}/api/borrowed-return/', data: {
          "borrowed_asset_code": hintTextAssetCode.value.split(" ")[0],
          "borrowed_name": inputName.text,
          "used_by_program": hintTextPrograms.value,
          "borrowed_date": inputDate.text,
          "due_date": inputDateReturned.text,
          "status": "Dipinjam",
          "notes": inputNotes.text
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
        if (e.response?.statusCode == 500 || e.response?.statusCode == 400) {
          Alert.error("Error", e.response?.data['message'] ?? "Error PSX1");
        } else {
          print("ExceptionPS2: $e");
        }
      } else {
        print("ExceptionPS3: $e");
      }
    }
  }

  void loadDataById(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.get('${AppConfig.baseUrl}/api/borrowed-return/$id');
      if (response.statusCode == 200) {
        inputName.text = response.data['data']['borrowed_name'];
        inputDate.text = DateFormat('yyyy-MM-dd')
            .format(DateTime.parse(response.data['data']['borrowed_date']));
        inputDateReturned.text = DateFormat('yyyy-MM-dd')
            .format(DateTime.parse(response.data['data']['due_date']));
        inputNotes.text = response.data['data']['notes'];
        hintTextPrograms.value = response.data['data']['used_by_program'];
        assetList.assignAll([
          {
            "asset_code": response.data['data']['borrowed_asset_code'],
            "asset_name": response.data['data']['borrowed_asset_name'],
          }
        ]);
        hintTextAssetCode.value =
            "${response.data['data']['borrowed_asset_code']} - ${response.data['data']['borrowed_asset_name']}";
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
