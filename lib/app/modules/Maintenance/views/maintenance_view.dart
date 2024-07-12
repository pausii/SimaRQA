import 'package:flutter/material.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import '../controllers/maintenance_controller.dart';
import '../../../widgets/sidebar.dart';

class MaintenanceView extends GetView<MaintenanceController> {
  void dialogOption(context, id, assetName, title) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('${assetName ?? "-"} - $title'),
          // content: const Text('What do you want to do?'),
          actions: <Widget>[
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();
                String name =
                    await controller.getNameByCode(assetName.toString());
                Get.toNamed(
                    '/maintenance-add?name=$name&id=$id&action=viewDetail');
              },
              style: TextButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 33, 243, 96),
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              ),
              child: const Text('Detail'),
            ),
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();
                String name =
                    await controller.getNameByCode(assetName.toString());
                await Get.toNamed(
                    '/maintenance-add?name=$name&id=$id&action=edit');
                controller.loadAssets();
              },
              style: TextButton.styleFrom(
                backgroundColor: Colors.blue,
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              ),
              child: const Text('Ubah'),
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

  const MaintenanceView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final controller = Get.find<MaintenanceController>();
    return Scaffold(
      backgroundColor: const Color(0xFFF1F4F8), //Color(0xFFF1F4F8)
      drawer: const Sidebar(),
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
                                'Data Pemeliharaan Aset',
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
                      Expanded(
                          child: Obx(() => ListView.builder(
                                padding: EdgeInsets.zero,
                                shrinkWrap: true,
                                scrollDirection: Axis.vertical,
                                itemCount: controller.dataList.length,
                                itemBuilder: (context, index) {
                                  DateTime maintenanceDate = DateTime.parse(
                                      controller.dataList[index]
                                          ["maintenance_date"]);
                                  String formattedDate =
                                      DateFormat('dd MMMM yyyy')
                                          .format(maintenanceDate);

                                  NumberFormat priceFormat =
                                      NumberFormat.currency(
                                          locale: 'id_ID',
                                          symbol: 'Rp',
                                          decimalDigits: 0);
                                  String formattedPrice = priceFormat.format(
                                      controller.dataList[index]
                                          ["price_maintenance"]);
                                  return Padding(
                                      padding: const EdgeInsets.only(bottom: 4),
                                      child: Container(
                                        width: double.infinity,
                                        height: 144,
                                        decoration: BoxDecoration(
                                          color: const Color(0xFF122778),
                                          borderRadius:
                                              BorderRadius.circular(14),
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
                                                  mainAxisSize:
                                                      MainAxisSize.max,
                                                  mainAxisAlignment:
                                                      MainAxisAlignment
                                                          .spaceBetween,
                                                  children: [
                                                    Text(
                                                      controller.dataList[index]
                                                          [
                                                          "maintenance_asset_name"],
                                                      textAlign:
                                                          TextAlign.start,
                                                      style: FlutterFlowTheme
                                                              .of(context)
                                                          .bodyMedium
                                                          .override(
                                                            fontFamily:
                                                                'Poppins',
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
                                                                "maintenance_id"],
                                                            controller.dataList[
                                                                        index][
                                                                    "maintenance_asset_code"] ??
                                                                '-', controller.dataList[
                                                                        index][
                                                                    "maintenance_asset_name"] ?? '-');
                                                      },
                                                    ),
                                                  ],
                                                ),
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
                                                              0, 0, 100, 0),
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
                                                      ': ${controller.dataList[index]["maintenance_asset_code"] ?? ''}',
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
                                                  ],
                                                ),
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
                                                              0, 0, 93, 0),
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
                                                      ': ${controller.dataList[index]["maintenance_asset_name"] ?? ''}',
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
                                                  ],
                                                ),
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
                                                              0, 0, 30, 0),
                                                      child: Text(
                                                        'Biaya Pemeliharaan',
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
                                                      ': $formattedPrice',
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
                                                  ],
                                                ),
                                                Stack(
                                                  children: [
                                                    Row(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .start,
                                                      children: [
                                                        Padding(
                                                          padding:
                                                              const EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                  0, 0, 11, 0),
                                                          child: Text(
                                                            'Tanggal Pemeliharaan',
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
                                                        Text(
                                                          ': $formattedDate',
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
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                              ].divide(
                                                  const SizedBox(height: 4)),
                                            ),
                                          ),
                                        ),
                                      ));
                                },
                              ))),
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
                            // Tambahkan aksi untuk tombol menu di sini
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
                      const SizedBox(width: 7), // Jarak antara dua tombol
                      SizedBox(
                        width: 46, // Ukuran button lebih kecil
                        height: 46, // Ukuran button lebih kecil
                        child: ElevatedButton(
                          onPressed: () {
                            Get.toNamed("/page-list?next=maintenance-add");
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
