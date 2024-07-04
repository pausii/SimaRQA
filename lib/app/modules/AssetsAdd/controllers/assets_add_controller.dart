import 'package:dio/dio.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:flutter/material.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class AssetsAddController extends GetxController {
  late AssetsModel asset;
  late List<dynamic> inputController;
  final inputName = TextEditingController();
  final inputPrice = TextEditingController();
  final inputPurchaseDate = TextEditingController();
  final assetCode = TextEditingController();
  final lastMaintenanceDate = TextEditingController();
  var hintTextCategory = "Kategori Aset".obs;
  var categoryList = <dynamic>[].obs;
  var hintTextAssetCondition = "Kondisi Aset".obs;
  var hintTextAssetType = "Tipe Aset".obs;
  bool readonly = false;
  bool codeAsetVisible = false;
  String action = "";
  String last_maintenance_date = "";
  String assetId = "";

  @override
  void onInit() {
    super.onInit();
    var parameters = Get.parameters;
    String? name = parameters['name'];
    // print('Asset found: $name');
    if (name == 'musholla') {
      asset = AssetsMushollaModel();
    }

    action = parameters['action'] ?? '';
    if (action == 'viewDetail') {
      readonly = true;
      codeAsetVisible = true;
    } else if (action == 'edit') {
      codeAsetVisible = true;
    }
  }

  void loadAsset(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.get('${AppConfig.baseUrl}/api/${asset.apiPath}/$id');
      if (response.statusCode == 200) {
        inputName.text = response.data['data']['asset_name'];
        inputPrice.text = response.data['data']['asset_price'].toString();
        // inputPurchaseDate.text = response.data['data']['purchase_date'];
        hintTextCategory.value =
            response.data['data']['asset_category']['category_name'];
        hintTextAssetCondition.value = response.data['data']['asset_condition'];
        hintTextAssetType.value = response.data['data']['asset_type'];
        assetCode.text = response.data['data']['asset_code'];
        last_maintenance_date =
            response.data['data']['last_maintenance_date'] ?? "";

        DateTime purchaseDate =
            DateTime.parse(response.data['data']['purchase_date']);
        if (action == 'edit') {
          String formattedDate = DateFormat('yyyy-MM-dd').format(purchaseDate);
          inputPurchaseDate.text = formattedDate;
        } else {
          String formattedDate =
              DateFormat('dd MMMM yyyy').format(purchaseDate);
          inputPurchaseDate.text = formattedDate;
        }

        DateTime lastMaintenanceDateObj =
            DateTime.parse(response.data['data']['last_maintenance_date']);
        String formattedDate2 =
            DateFormat('dd MMMM yyyy').format(lastMaintenanceDateObj);
        lastMaintenanceDate.text = formattedDate2;
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

  @override
  void onReady() {
    super.onReady();
    loadCategory();
    var parameters = Get.parameters;
    assetId = parameters['id'] ?? '';
    if (action == 'viewDetail') {
      loadAsset(assetId);
    } else if (action == 'edit') {
      loadAsset(assetId);
    }
  }

  void updateForm() async {
    try {
      // check if all of form is ok
      if (inputName.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan nama aset");
      } else if (inputPrice.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan harga aset");
      } else if (inputPurchaseDate.text.isEmpty) {
        Alert.error("Error", "Anda belum memilih tanggal beli aset");
      } else if (hintTextCategory.value == "Kategori Aset") {
        Alert.error("Error", "Anda belum memilih kategori aset");
      } else if (hintTextAssetCondition.value == "Kondisi Aset") {
        Alert.error("Error", "Anda belum memilih kondisi aset");
      } else if (hintTextAssetType.value == "Tipe Aset") {
        Alert.error("Error", "Anda belum memilih tipe aset");
      } else {
        String categoryId = "";
        // loop over category list
        for (var i = 0; i < categoryList.length; i++) {
          if (categoryList[i]['category_name'] == hintTextCategory.value) {
            categoryId = categoryList[i]['category_id'].toString();
            break;
          }
        }
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        print("222");
        // print('${AppConfig.baseUrl}/api/${asset.apiPath}/$assetId');
        var response = await dio
            .put('${AppConfig.baseUrl}/api/${asset.apiPath}/$assetId', data: {
          "asset_name": inputName.text,
          "category_id": categoryId,
          "asset_price": inputPrice.text,
          "purchase_date": inputPurchaseDate.text,
          "asset_condition": hintTextAssetCondition.value,
          "asset_type": hintTextAssetType.value,
          "last_maintenance_date": last_maintenance_date
        });
        if (response.statusCode == 200) {
          Get.back(closeOverlays: true, result: true);
          await Future.delayed(const Duration(milliseconds: 100));
          Alert.success("Success", response.data['message']);
        }
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

  void submitForm() async {
    try {
      // check if all of form is ok
      if (inputName.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan nama aset");
      } else if (inputPrice.text.isEmpty) {
        Alert.error("Error", "Anda belum memasukan harga aset");
      } else if (inputPurchaseDate.text.isEmpty) {
        Alert.error("Error", "Anda belum memilih tanggal beli aset");
      } else if (hintTextCategory.value == "Kategori Aset") {
        Alert.error("Error", "Anda belum memilih kategori aset");
      } else if (hintTextAssetCondition.value == "Kondisi Aset") {
        Alert.error("Error", "Anda belum memilih kondisi aset");
      } else if (hintTextAssetType.value == "Tipe Aset") {
        Alert.error("Error", "Anda belum memilih tipe aset");
      } else {
        String categoryId = "";
        // loop over category list
        for (var i = 0; i < categoryList.length; i++) {
          if (categoryList[i]['category_name'] == hintTextCategory.value) {
            categoryId = categoryList[i]['category_id'].toString();
            break;
          }
        }
        Dio dio = Dio();
        dio.options.headers['Authorization'] =
            'Bearer ${Storage.read("authToken")}';
        var response =
            await dio.post('${AppConfig.baseUrl}/api/${asset.apiPath}/', data: {
          "asset_name": inputName.text,
          "category_id": categoryId,
          "asset_price": inputPrice.text,
          "purchase_date": inputPurchaseDate.text,
          "asset_condition": hintTextAssetCondition.value,
          "asset_type": hintTextAssetType.value,
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
        } else {
          print("ExceptionPS2: $e");
        }
      } else {
        print("ExceptionPS3: $e");
      }
    }
  }

  void loadCategory() async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/category/');
      if (response.statusCode == 200) {
        categoryList.assignAll(response.data['data']);
        // print(categoryList);
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
