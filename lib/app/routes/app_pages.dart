import 'package:get/get.dart';
import 'package:flutter/foundation.dart';

import '../modules/Assets/bindings/assets_binding.dart';
import '../modules/Assets/views/assets_view.dart';
import '../modules/AssetsAdd/bindings/assets_add_binding.dart';
import '../modules/AssetsAdd/views/assets_add_view.dart';
import '../modules/AssetsCategory/bindings/assets_category_binding.dart';
import '../modules/AssetsCategory/views/assets_category_view.dart';
import '../modules/AssetsCategoryAdd/bindings/assets_category_add_binding.dart';
import '../modules/AssetsCategoryAdd/views/assets_category_add_view.dart';
import '../modules/Borrowing/bindings/borrowing_binding.dart';
import '../modules/Borrowing/views/borrowing_view.dart';
import '../modules/BorrowingAdd/bindings/borrowing_add_binding.dart';
import '../modules/BorrowingAdd/views/borrowing_add_view.dart';
import '../modules/Dashboard/bindings/dashboard_binding.dart';
import '../modules/Dashboard/views/dashboard_view.dart';
import '../modules/Login/bindings/login_binding.dart';
import '../modules/Login/views/login_view.dart';
import '../modules/Maintenance/bindings/maintenance_binding.dart';
import '../modules/Maintenance/views/maintenance_view.dart';
import '../modules/MaintenanceAdd/bindings/maintenance_add_binding.dart';
import '../modules/MaintenanceAdd/views/maintenance_add_view.dart';
import '../modules/OnboardingScreen/bindings/onboarding_screen_binding.dart';
import '../modules/OnboardingScreen/views/onboarding_screen_view.dart';
import '../modules/PageList/bindings/page_list_binding.dart';
import '../modules/PageList/views/page_list_view.dart';
import '../modules/Report/bindings/report_binding.dart';
import '../modules/Report/views/report_view.dart';
import '../modules/Returns/bindings/returns_binding.dart';
import '../modules/Returns/views/returns_view.dart';
import '../modules/Users/bindings/users_binding.dart';
import '../modules/Users/views/users_view.dart';
import '../modules/UsersAdd/bindings/users_add_binding.dart';
import '../modules/UsersAdd/views/users_add_view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static const INITIAL = kReleaseMode ? Routes.DASHBOARD : Routes.HOME;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => const HomeView(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.LOGIN,
      page: () => const LoginView(),
      binding: LoginBinding(),
    ),
    GetPage(
      name: _Paths.DASHBOARD,
      page: () => const DashboardView(),
      binding: DashboardBinding(),
    ),
    GetPage(
      name: _Paths.ONBOARDING_SCREEN,
      page: () => const OnboardingScreenView(),
      binding: OnboardingScreenBinding(),
    ),
    GetPage(
      name: _Paths.ASSETS,
      page: () => const AssetsView(),
      binding: AssetsBinding(),
    ),
    GetPage(
      name: _Paths.ASSETS_ADD,
      page: () => const AssetsAddView(),
      binding: AssetsAddBinding(),
    ),
    GetPage(
      name: _Paths.USERS,
      page: () => const UsersView(),
      binding: UsersBinding(),
    ),
    GetPage(
      name: _Paths.USERS_ADD,
      page: () => const UsersAddView(),
      binding: UsersAddBinding(),
    ),
    GetPage(
      name: _Paths.ASSETS_CATEGORY,
      page: () => const AssetsCategoryView(),
      binding: AssetsCategoryBinding(),
    ),
    GetPage(
      name: _Paths.ASSETS_CATEGORY_ADD,
      page: () => const AssetsCategoryAddView(),
      binding: AssetsCategoryAddBinding(),
    ),
    GetPage(
      name: _Paths.MAINTENANCE,
      page: () => const MaintenanceView(),
      binding: MaintenanceBinding(),
    ),
    GetPage(
      name: _Paths.MAINTENANCE_ADD,
      page: () => const MaintenanceAddView(),
      binding: MaintenanceAddBinding(),
    ),
    GetPage(
      name: _Paths.PAGE_LIST,
      page: () => const PageListView(),
      binding: PageListBinding(),
    ),
    GetPage(
      name: _Paths.BORROWING,
      page: () => const BorrowingView(),
      binding: BorrowingBinding(),
    ),
    GetPage(
      name: _Paths.BORROWING_ADD,
      page: () => const BorrowingAddView(),
      binding: BorrowingAddBinding(),
    ),
    GetPage(
      name: _Paths.RETURNS,
      page: () => const ReturnsView(),
      binding: ReturnsBinding(),
    ),
    GetPage(
      name: _Paths.REPORT,
      page: () => const ReportView(),
      binding: ReportBinding(),
    ),
  ];
}
