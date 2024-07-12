import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../widgets/sidebar.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import '../controllers/borrowing_controller.dart';
import 'package:skeletonizer/skeletonizer.dart';

class BorrowingView extends GetView<BorrowingController> {
  const BorrowingView({Key? key}) : super(key: key);
  void dialogOption(context, id, title, status) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('${title ?? "-"}'),
          // content: const Text('What do you want to do?'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                Get.toNamed('/borrowing-add?id=$id&action=viewDetail');
              },
              style: TextButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 33, 243, 96),
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              ),
              child: const Text('Detail'),
            ),
            Visibility(
              visible: status == "Dipinjam" ? true : false,
              child: TextButton(
                onPressed: () async {
                  Navigator.of(context).pop();
                  await Get.toNamed('/returns?id=$id');
                  controller.loadDataList();
                },
                style: TextButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16.0, vertical: 8.0),
                ),
                child: const Text('Kembalikan'),
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              style: TextButton.styleFrom(
                backgroundColor: Colors.grey,
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              ),
              child: const Text('Batal'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<BorrowingController>();
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
                                'Data Peminjaman',
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
                                return Padding(
                                    padding: const EdgeInsets.only(bottom: 4),
                                    child: Container(
                                      width: double.infinity,
                                      height: 150,
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
                                                    "${controller.dataList[index]["borrowed_asset_name"] ?? "pdddx"} #${controller.dataList[index]["borrowed_asset_code"] ?? "xyzx"}",
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
                                                  FlutterFlowIconButton(
                                                    borderRadius: 20,
                                                    borderWidth: 1,
                                                    buttonSize: 35,
                                                    icon: Icon(
                                                      Icons.keyboard_control,
                                                      color: FlutterFlowTheme
                                                              .of(context)
                                                          .secondaryBackground,
                                                      size: 24,
                                                    ),
                                                    onPressed: () {
                                                      print(
                                                          'IconButton pressed ...');
                                                      dialogOption(
                                                          context,
                                                          controller.dataList[
                                                                      index][
                                                                  "borrowed_id"] ??
                                                              "uid",
                                                          "${controller.dataList[index]["borrowed_asset_name"] ?? "name"} #${controller.dataList[index]["borrowed_asset_code"] ?? "code"}",
                                                          controller.dataList[
                                                                      index]
                                                                  ["status"] ??
                                                              "");
                                                    },
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
                                                            0, 0, 61, 0),
                                                    child: Text(
                                                      'Peminjam',
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
                                                    ': ${controller.dataList[index]["borrowed_name"]}',
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
                                                            0, 0, 73, 0),
                                                    child: Text(
                                                      'Program',
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
                                                    ': ${controller.dataList[index]["used_by_program"]}',
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
                                                            0, 0, 10, 0),
                                                    child: Text(
                                                      'Tanggal dipinjam',
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
                                                    ': ${DateFormat('dd MMMM yyyy').format(DateTime.parse(controller.dataList[index]["borrowed_date"]))}',
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
                                                                0, 0, 89, 0),
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
                                                          Container(
                                                            padding:
                                                                const EdgeInsets
                                                                    .only(
                                                                    top: 2,
                                                                    bottom: 2,
                                                                    left: 5,
                                                                    right: 5),
                                                            decoration:
                                                                BoxDecoration(
                                                              color: controller.dataList[
                                                                              index]
                                                                          [
                                                                          "status"] ==
                                                                      "Dipinjam"
                                                                  ? const Color
                                                                      .fromARGB(
                                                                      255,
                                                                      255,
                                                                      0,
                                                                      0)
                                                                  : Color
                                                                      .fromARGB(
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
                                                              '${controller.dataList[index]["status"]}',
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
                                                          )
                                                        ],
                                                      )
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ].divide(const SizedBox(height: 4)),
                                          ),
                                        ),
                                      ),
                                    ));
                              },
                            ),
                          ))),
                      Obx(() => Visibility(
                          visible: controller.isLoading.value,
                          child: SizedBox(
                            width: double.infinity, // Atau ukuran tertentu
                            height: 500.0, // Atau ukuran tertentu
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
                    child: GestureDetector(
                      onTap: () async {
                        await Get.toNamed("/page-list?next=borrowing-add");
                        controller.loadDataList();
                      },
                      child: SizedBox(
                        width: 40,
                        height: 40,
                        child: Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: const Color(0xFF3D77D2),
                            borderRadius:
                                BorderRadius.circular(15), // Sudut tumpul
                            border: Border.all(
                              color: Colors.white,
                              width: 1,
                            ),
                          ),
                          child: const Center(
                            child: Icon(
                              Icons.add,
                              color: Color(0xFFFFFFFF),
                              size: 30,
                            ),
                          ),
                        ),
                      ),
                    )),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
