import 'package:get/get.dart';

class PageListController extends GetxController {
  var assetList = <dynamic>[
    {
      "text": "Perpustakaan",
      "name": "perpustakaan",
    }, {
      "text": "Auditorium",
      "name": "auditorium",
    }, {
      "text": "Musholla",
      "name": "musholla",
    }, {
      "text": "Utilitas",
      "name": "utilitas",
    }
  ].obs;
  var next = "";

  @override
  onInit() {
    super.onInit();
    var parameters = Get.parameters;
    next = parameters['next'] ?? 'unknown';
  }
}
