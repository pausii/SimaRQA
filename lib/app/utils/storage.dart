import 'package:get_storage/get_storage.dart';

class Storage{
  static void write(String name, String value){
    GetStorage().write(name, value);
  }

  static String read(String name){
    return GetStorage().read(name) ?? "";
  }
}