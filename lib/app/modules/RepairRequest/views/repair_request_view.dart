import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/repair_request_controller.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import '../../../widgets/sidebar.dart';
import 'package:skeletonizer/skeletonizer.dart';

class RepairRequestView extends GetView<RepairRequestController> {
  const RepairRequestView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<RepairRequestController>();
    return Scaffold(
      backgroundColor: const Color(0xFFF1F4F8), //Color(0xFFF1F4F8)
      drawer: Sidebar(),
      appBar: AppBar(
        backgroundColor: const Color(0xFF163360),
        automaticallyImplyLeading: true,
        title: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.asset(
            'assets/images/logo.png',
            width: 166,
            height: 45,
            fit: BoxFit.cover,
          ),
        ),
        actions: [],
        flexibleSpace: FlexibleSpaceBar(
          background: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.asset(
              'assets/images/bg2.jpg',
              fit: BoxFit.cover,
            ),
          ),
        ),
        centerTitle: true,
        elevation: 4,
      ),
      body: SafeArea(
        top: true,
        child: Padding(
          padding: const EdgeInsetsDirectional.fromSTEB(7, 0, 7, 0),
          child: Container(
            width: double.infinity,
            height: double.infinity,
            decoration: const BoxDecoration(
              color: Color(0xFFFFFFFF),
            ),
            child: Stack(
              children: [
                Container(
                  width: double.infinity,
                  height: double.infinity,
                  decoration: const BoxDecoration(
                    color: Color(0xFFFFFFFF),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      Padding(
                        padding:
                            const EdgeInsetsDirectional.fromSTEB(0, 10, 0, 0),
                        child: Container(
                          width: double.infinity,
                          height: 49,
                          decoration: const BoxDecoration(
                            color: Color(0xFFFFFFFF),
                          ),
                          child: Column(
                            mainAxisSize: MainAxisSize.max,
                            children: [
                              Text(
                                'Permohonan Perbaikan Aset',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Poppins',
                                      color: const Color(0xFF071031),
                                      fontSize: 21,
                                      letterSpacing: 0,
                                      fontWeight: FontWeight.w600,
                                    ),
                              ),
                              Container(
                                width: 160,
                                height: 2,
                                decoration: const BoxDecoration(
                                  color: Color(0xFF060D29),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Obx(() => Visibility(
                          visible: controller.isLoading.value == false,
                          child: Expanded(
                              child: ListView.builder(
                            padding: EdgeInsets.zero,
                            shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            itemCount: controller.dataList.length,
                            itemBuilder: (context, index) {
                              String damageDate = DateFormat('dd MMMM yyyy')
                                  .format(DateTime.parse(controller
                                      .dataList[index]["damage_date"]));
                              return Padding(
                                  padding: const EdgeInsets.only(bottom: 4),
                                  child: GestureDetector(
                                    onTap: () async {
                                      String name =
                                          await controller.getNameByCode(
                                              controller.dataList[index]
                                                      ["request_asset_code"] ??
                                                  '');
                                      int id = controller.dataList[index]
                                          ["request_id"];
                                      await Get.toNamed(
                                          '/repair-request-add?name=$name&id=$id&action=viewDetail');
                                      controller.loadData();
                                    },
                                    child: Container(
                                      width: double.infinity,
                                      height: 144,
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF122778),
                                        borderRadius: BorderRadius.circular(14),
                                        border: Border.all(
                                          color: const Color(0xFF163360),
                                          width: 1,
                                        ),
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(10),
                                        child: Container(
                                          width: 100,
                                          height: 126,
                                          decoration: const BoxDecoration(),
                                          child: Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              Row(
                                                mainAxisSize: MainAxisSize.max,
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Text(
                                                    controller.dataList[index]
                                                        ["request_asset_name"],
                                                    textAlign: TextAlign.start,
                                                    style: FlutterFlowTheme.of(
                                                            context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily: 'Poppins',
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .secondaryBackground,
                                                          fontSize: 17,
                                                          letterSpacing: 0,
                                                          fontWeight:
                                                              FontWeight.w600,
                                                        ),
                                                  ),
                                                ],
                                              ),
                                              Row(
                                                mainAxisSize: MainAxisSize.max,
                                                mainAxisAlignment:
                                                    MainAxisAlignment.start,
                                                children: [
                                                  Padding(
                                                    padding:
                                                        const EdgeInsetsDirectional
                                                            .fromSTEB(
                                                            0, 0, 63, 0),
                                                    child: Text(
                                                      'Kode Aset',
                                                      style:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .bodyMedium
                                                              .override(
                                                                fontFamily:
                                                                    'Montserrat',
                                                                color: FlutterFlowTheme.of(
                                                                        context)
                                                                    .secondaryBackground,
                                                                letterSpacing:
                                                                    0,
                                                              ),
                                                    ),
                                                  ),
                                                  Text(
                                                    ': ${controller.dataList[index]["request_asset_code"] ?? ''}',
                                                    style: FlutterFlowTheme.of(
                                                            context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily:
                                                              'Montserrat',
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .secondaryBackground,
                                                          letterSpacing: 0,
                                                        ),
                                                  ),
                                                ],
                                              ),
                                              Row(
                                                mainAxisSize: MainAxisSize.max,
                                                mainAxisAlignment:
                                                    MainAxisAlignment.start,
                                                children: [
                                                  Padding(
                                                    padding:
                                                        const EdgeInsetsDirectional
                                                            .fromSTEB(
                                                            0, 0, 56, 0),
                                                    child: Text(
                                                      'Nama Aset',
                                                      style:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .bodyMedium
                                                              .override(
                                                                fontFamily:
                                                                    'Montserrat',
                                                                color: FlutterFlowTheme.of(
                                                                        context)
                                                                    .secondaryBackground,
                                                                letterSpacing:
                                                                    0,
                                                              ),
                                                    ),
                                                  ),
                                                  Text(
                                                    ': ${controller.dataList[index]["request_asset_name"] ?? ''}',
                                                    style: FlutterFlowTheme.of(
                                                            context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily:
                                                              'Montserrat',
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .secondaryBackground,
                                                          letterSpacing: 0,
                                                        ),
                                                  ),
                                                ],
                                              ),
                                              Row(
                                                mainAxisSize: MainAxisSize.max,
                                                mainAxisAlignment:
                                                    MainAxisAlignment.start,
                                                children: [
                                                  Padding(
                                                    padding:
                                                        const EdgeInsetsDirectional
                                                            .fromSTEB(
                                                            0, 0, 30, 0),
                                                    child: Text(
                                                      'Tanggal Rusak',
                                                      style:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .bodyMedium
                                                              .override(
                                                                fontFamily:
                                                                    'Montserrat',
                                                                color: FlutterFlowTheme.of(
                                                                        context)
                                                                    .secondaryBackground,
                                                                letterSpacing:
                                                                    0,
                                                              ),
                                                    ),
                                                  ),
                                                  Text(
                                                    ': $damageDate',
                                                    style: FlutterFlowTheme.of(
                                                            context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily:
                                                              'Montserrat',
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .secondaryBackground,
                                                          letterSpacing: 0,
                                                        ),
                                                  ),
                                                ],
                                              ),
                                              Stack(
                                                children: [
                                                  Row(
                                                    mainAxisSize:
                                                        MainAxisSize.max,
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      Padding(
                                                        padding:
                                                            const EdgeInsetsDirectional
                                                                .fromSTEB(
                                                                0, 0, 88, 0),
                                                        child: Text(
                                                          'Status',
                                                          style: FlutterFlowTheme
                                                                  .of(context)
                                                              .bodyMedium
                                                              .override(
                                                                fontFamily:
                                                                    'Montserrat',
                                                                color: FlutterFlowTheme.of(
                                                                        context)
                                                                    .secondaryBackground,
                                                                letterSpacing:
                                                                    0,
                                                              ),
                                                        ),
                                                      ),
                                                      Row(
                                                            children: [
                                                              Text(
                                                                ": ",
                                                                style: FlutterFlowTheme.of(
                                                                        context)
                                                                    .bodyMedium
                                                                    .override(
                                                                      fontFamily:
                                                                          'Montserrat',
                                                                      color: FlutterFlowTheme.of(
                                                                              context)
                                                                          .secondaryBackground,
                                                                      letterSpacing:
                                                                          0,
                                                                    ),
                                                              ),
                                                              Container(
                                                                padding:
                                                                    const EdgeInsets
                                                                        .only(
                                                                        top: 2,
                                                                        bottom:
                                                                            2,
                                                                        left: 5,
                                                                        right:
                                                                            5),
                                                                decoration:
                                                                    BoxDecoration(
                                                                  color: controller.dataList[index]["status_confirmation"] ==
                                                                          "Sedang Dikonfirmasi"
                                                                      ? const Color
                                                                          .fromARGB(
                                                                          255,
                                                                          255,
                                                                          0,
                                                                          0)
                                                                      : const Color.fromARGB(
                                                                          255,
                                                                          32,
                                                                          182,
                                                                          32),
                                                                  borderRadius:
                                                                      BorderRadius
                                                                          .circular(
                                                                              7), // Border radius
                                                                ),
                                                                child: Text(
                                                                  '${controller.dataList[index]["status_confirmation"]}',
                                                                  style: FlutterFlowTheme.of(
                                                                          context)
                                                                      .bodyMedium
                                                                      .override(
                                                                        fontFamily:
                                                                            'Montserrat',
                                                                        color: FlutterFlowTheme.of(context)
                                                                            .secondaryBackground,
                                                                        letterSpacing:
                                                                            0,
                                                                      ),
                                                                ),
                                                              )
                                                            ],
                                                          )
                                                      // Text(
                                                      //   ': ${controller.dataList[index]["status_confirmation"] ?? ''}',
                                                      //   style:
                                                      //       FlutterFlowTheme.of(
                                                      //               context)
                                                      //           .bodyMedium
                                                      //           .override(
                                                      //             fontFamily:
                                                      //                 'Montserrat',
                                                      //             color: FlutterFlowTheme.of(
                                                      //                     context)
                                                      //                 .secondaryBackground,
                                                      //             letterSpacing:
                                                      //                 0,
                                                      //           ),
                                                      // ),
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ].divide(const SizedBox(height: 4)),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ));
                            },
                          )))),
                      Obx(() => Visibility(
                          visible: controller.isLoading.value,
                          child: Expanded(
                            // width: double.infinity, // Atau ukuran tertentu
                            // height: 500.0, // Atau ukuran tertentu
                            child: Skeletonizer(
                              enabled: true,
                              child: ListView.builder(
                                itemCount: 10,
                                itemBuilder: (context, index) {
                                  return Card(
                                    child: ListTile(
                                      title: Text(
                                          'Item number $index as title title',
                                          style: const TextStyle(fontSize: 22)),
                                      subtitle: const Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            SizedBox(height: 5),
                                            Text('Subtitle here xxxxxxxxxxx',
                                                style: TextStyle(fontSize: 15)),
                                            Text('Subtitle here xxxxxx',
                                                style: TextStyle(fontSize: 15)),
                                            Text('Subtitle here xxxxxxxxx',
                                                style: TextStyle(fontSize: 15)),
                                            Text('Subtitle here xxxxxxxxccccc',
                                                style: TextStyle(fontSize: 15)),
                                          ]),
                                      trailing: const Icon(Icons.ac_unit),
                                    ),
                                  );
                                },
                              ),
                            ),
                          )))
                    ],
                  ),
                ),
                Align(
                  alignment: const AlignmentDirectional(0.92, 0.97),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SizedBox(
                        width: 46, // Ukuran button lebih kecil
                        height: 46, // Ukuran button lebih kecil
                        child: ElevatedButton(
                          onPressed: () {
                            controller.saveReport(context);
                          },
                          style: ElevatedButton.styleFrom(
                            primary: const Color(0xFF3D77D2),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15),
                              side: const BorderSide(
                                  color: Colors.white, width: 1),
                            ),
                            padding: EdgeInsets
                                .zero, // Menghilangkan padding default
                          ),
                          child: const Icon(
                            Icons.print,
                            color: Color(0xFFFFFFFF),
                            size: 24, // Ukuran icon lebih kecil
                          ),
                        ),
                      ),
                      Visibility(
                          visible: controller.userRole != "administrator",
                          child: SizedBox(width: 7)),
                      Visibility(
                        visible: controller.userRole != "administrator",
                        child: SizedBox(
                          width: 46, // Ukuran button lebih kecil
                          height: 46, // Ukuran button lebih kecil
                          child: ElevatedButton(
                            onPressed: () async {
                              await Get.toNamed(
                                  "/page-list?next=repair-request-add");
                              controller.loadData();
                            },
                            style: ElevatedButton.styleFrom(
                              primary: const Color(0xFF3D77D2),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(15),
                                side: const BorderSide(
                                    color: Colors.white, width: 1),
                              ),
                              padding: EdgeInsets
                                  .zero, // Menghilangkan padding default
                            ),
                            child: const Icon(
                              Icons.add,
                              color: Color(0xFFFFFFFF),
                              size: 24, // Ukuran icon lebih kecil
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
