import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import '../controllers/page_list_controller.dart';

class PageListView extends GetView<PageListController> {
  const PageListView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final controller = Get.find<PageListController>();
    return GestureDetector(
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: const Color(0xFF0B2EAE),
          automaticallyImplyLeading: true,
          title: Text(
            'Daftar Aset',
            style: FlutterFlowTheme.of(context).bodyMedium.override(
                  fontFamily: 'Poppins',
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                  fontSize: 19,
                  letterSpacing: 0,
                ),
          ),
          actions: [],
          centerTitle: true,
          elevation: 4,
        ),
        body: SafeArea(
          top: true,
          child: Stack(
            children: [
              Padding(
                padding: const EdgeInsetsDirectional.fromSTEB(10, 30, 10, 0),
                child: Container(
                  width: double.infinity,
                  height: double.infinity,
                  decoration: BoxDecoration(
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                  ),
                  child: Obx(() => ListView.builder(
                        padding: EdgeInsets.zero,
                        shrinkWrap: true,
                        scrollDirection: Axis.vertical,
                        itemCount: controller.assetList.length,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                            onTap: () async {
                              var result = await Get.toNamed(
                                  "/${controller.next}?name=${controller.assetList[index]['name']}");
                              if (result != null) {
                                Get.back();
                              }
                            },
                            child: Padding(
                                padding: EdgeInsets.only(bottom: 10),
                                child: Container(
                                  width: double.infinity,
                                  height: 58,
                                  decoration: BoxDecoration(
                                    color: FlutterFlowTheme.of(context)
                                        .secondaryBackground,
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(
                                      color: const Color(0xFF163360),
                                    ),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Padding(
                                        padding: const EdgeInsetsDirectional
                                            .fromSTEB(10, 0, 0, 0),
                                        child: Text(
                                          controller.assetList[index]['text'],
                                          style: FlutterFlowTheme.of(context)
                                              .bodyMedium
                                              .override(
                                                fontFamily: 'Readex Pro',
                                                fontSize: 16,
                                                letterSpacing: 0,
                                              ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsetsDirectional
                                            .fromSTEB(0, 0, 10, 0),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.max,
                                          children: [
                                            FlutterFlowIconButton(
                                              borderColor: const Color.fromARGB(
                                                  0, 38, 36, 59),
                                              borderRadius: 20,
                                              borderWidth: 1,
                                              buttonSize: 40,
                                              fillColor:
                                                  const Color(0x4C5E5B81),
                                              icon: const Icon(
                                                Icons.navigate_next,
                                                color: const Color(0xFF163360),
                                                size: 24,
                                              ),
                                              onPressed: () async {
                                                var result = await Get.toNamed(
                                                    "/${controller.next}?name=${controller.assetList[index]['name']}");
                                                if (result != null) {
                                                  Get.back();
                                                }
                                              },
                                            ),
                                          ].divide(const SizedBox(width: 10)),
                                        ),
                                      ),
                                    ],
                                  ),
                                )),
                          );
                        },
                      )),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
