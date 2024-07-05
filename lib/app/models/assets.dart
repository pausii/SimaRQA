class AssetsModel {
  late String name;
  late String apiPath;

  AssetsModel() {
    name = "";
    apiPath = "";
  }
}

class AssetsMushollaModel extends AssetsModel {
  static String code = "MUS";
  AssetsMushollaModel() {
    name = "musholla";
    apiPath = "musholla";
  }
}

class AssetsAuditoriumModel extends AssetsModel {
  static String code = "AUD";
  AssetsAuditoriumModel() {
    name = "auditorium";
    apiPath = "auditorium";
  }
}

class AssetsPerpustakaanModel extends AssetsModel {
  static String code = "LIB";
  AssetsPerpustakaanModel() {
    name = "perpustakaan";
    apiPath = "perpustakaan";
  }
}

class AssetsUtilitasModel extends AssetsModel {
  static String code = "UTI";
  AssetsUtilitasModel() {
    name = "utilitas";
    apiPath = "utilitas";
  }
}