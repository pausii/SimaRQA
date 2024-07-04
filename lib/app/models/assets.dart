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
