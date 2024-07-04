class AssetsModel {
  late String name;
  late String apiPath;

  AssetsModel() {
    name = "";
    apiPath = "";
  }
}

class AssetsMushollaModel extends AssetsModel {
  AssetsMushollaModel() {
    name = "musholla";
    apiPath = "musholla";
  }
}

class AssetsAuditoriumModel extends AssetsModel {
  AssetsAuditoriumModel() {
    name = "auditorium";
    apiPath = "auditorium";
  }
}

class AssetsPerpustakaanModel extends AssetsModel {
  AssetsPerpustakaanModel() {
    name = "perpustakaan";
    apiPath = "perpustakaan";
  }
}

class AssetsUtilitasModel extends AssetsModel {
  AssetsUtilitasModel() {
    name = "utilitas";
    apiPath = "utilitas";
  }
}