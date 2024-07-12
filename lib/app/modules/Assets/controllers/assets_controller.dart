import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sima_rqa/app/config/app_config.dart';
import 'package:sima_rqa/app/models/assets.dart';
import 'package:sima_rqa/app/utils/alert.dart';
import 'package:sima_rqa/app/utils/storage.dart';

class AssetsController extends GetxController {
  late AssetsModel asset;
  final searchQuery = "".obs;
  final searchController = TextEditingController();
  var assetsList = <dynamic>[].obs;

  void loadAssets(String name) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response = await dio.get('${AppConfig.baseUrl}/api/$name');
      if (searchQuery.value != "") {
        // Filter data yang sesuai dengan kriteria pencarian
        var filteredData = response.data['data'].where((element) {
          return element['asset_name']
              .toString()
              .toLowerCase()
              .contains(searchQuery.value.toLowerCase());
        }).toList();

        // Ganti isi list asli dengan hasil filter
        response.data['data'] = filteredData;
      }

      if (response.statusCode == 200) {
        assetsList.assignAll(response.data['data']);
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

  void deleteAsset(String id) async {
    try {
      Dio dio = Dio();
      dio.options.headers['Authorization'] =
          'Bearer ${Storage.read("authToken")}';
      var response =
          await dio.delete('${AppConfig.baseUrl}/api/${asset.apiPath}/$id');
      if (response.statusCode == 204) {
        Alert.success("Success", "Asset berhasil dihapus");
        loadAssets(asset.apiPath);
      }
    } catch (e) {
      print("ExceptionPS3: $e");
    }
  }

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

  void searchDialog() {
    Get.dialog(
      AlertDialog(
        // title: Text('Pencarian'),
        content: TextField(
          controller: searchController,
          decoration: const InputDecoration(hintText: "Masukkan pencarian..."),
        ),
        actions: [
          TextButton(
            onPressed: () {
              // Ambil nilai dari input
              String inputValue = searchController.text;
              // Tutup dialog
              Get.back();
              searchQuery(inputValue);
              loadAssets(asset.apiPath);
            },
            child: const Text('Cari'),
          ),
        ],
      ),
    );
  }
}
