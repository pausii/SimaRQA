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
              Get.toNamed('/users');
            },
            child: const Text('Go to users Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/assets-category');
            },
            child: const Text('Go to assets category Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/maintenance?name=musholla');
            },
            child: const Text('Go to maintenance Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/maintenance-add?name=musholla');
            },
            child: const Text('Go to mainntenance add Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/borrowing');
            },
            child: const Text('Go to borrowing Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/report?name=musholla');
            },
            child: const Text('Go to report Page'),
          ),
          ElevatedButton(
            onPressed: () {
              Get.toNamed('/repair-request');
            },
            child: const Text('Repair Asset Request'),
          ),
        ],
      ),
    );
  }
}
