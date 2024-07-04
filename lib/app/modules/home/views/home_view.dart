import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HomeView'),
        centerTitle: true,
      ),
      body: Column(
        children: [
          const Center(
            child: Text(
              'HomeView is working',
              style: TextStyle(fontSize: 20),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/login');
            },
            child: const Text('Go to Login Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/dashboard');
            },
            child: const Text('Go to dashboard Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/onboarding-screen');
            },
            child: const Text('Go to asset Onboarding Screen Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/assets?name=musholla');
            },
            child: const Text('Go to assets Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/assets-add');
            },
            child: const Text('Go to assets add Page'),
          ),
        ],
      ),
    );
  }
}
