import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/assets_controller.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import '../../../widgets/sidebar.dart';

class AssetsView extends GetView<AssetsController> {
  const AssetsView({Key? key}) : super(key: key);

  void dialogOption(context, id, assetName) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('${assetName??"-"}'),
          // content: const Text('What do you want to do?'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                Get.toNamed('/assets-add?name=${controller.asset.name}&id=$id&action=viewDetail');
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
              onPressed: () {
                Navigator.of(context).pop();
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: const Text('Konfirmasi'),
                      content: const Text('Apakah anda yakin ingin menghapus?'),
                      actions: <Widget>[
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop(); // Tutup dialog kedua
                            controller.deleteAsset(id.toString());
                          },
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.red,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 16.0, vertical: 8.0),
                          ),
                          child: const Text('Hapus'),
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.grey,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 16.0, vertical: 8.0),
                          ),
                          child: const Text('Batal'),
                        ),
                      ],
                    );
                  },
                );
              },
              style: TextButton.styleFrom(
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              ),
              child: const Text('Hapus'),
            ),
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();
                await Get.toNamed('/assets-add?name=${controller.asset.name}&id=$id&action=edit');
                controller.loadAssets(controller.asset.apiPath);
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

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<AssetsController>();
    return Scaffold(
      backgroundColor: const Color(0xFFF1F4F8), //Color(0xFFF1F4F8)
      drawer: const Sidebar(),
      appBar: AppBar(
        backgroundColor: const Color(0xFF163360),
        automaticallyImplyLeading: true,
        title: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.asset(
            'images/logo.png',
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
              'images/bg2.jpg',
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
                                'Data Aset ${controller.asset.name.capitalize}',
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
                                itemCount: controller.assetsList.length,
                                itemBuilder: (context, index) {
                                  DateTime purchaseDate = DateTime.parse(controller.assetsList[index]["purchase_date"]);
                                  String formattedDate = DateFormat('dd MMMM yyyy').format(purchaseDate);

                                  NumberFormat priceFormat = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp', decimalDigits: 0);
                                  String formattedPrice = priceFormat.format(controller.assetsList[index]["asset_price"]);
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
                                                      controller
                                                              .assetsList[index]
                                                          ["asset_name"],
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
                                                            controller.assetsList[
                                                                    index]
                                                                ["asset_id"],
                                                                controller.assetsList[
                                                                    index]
                                                                ["asset_name"]??'-');
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
                                                              0, 0, 93, 0),
                                                      child: Text(
                                                        'Kategori',
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
                                                      ': ${controller.assetsList[index]["asset_category"]["category_name"]}',
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
                                                              0, 0, 110, 0),
                                                      child: Text(
                                                        'Harga',
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
                                                              0, 0, 16, 0),
                                                      child: Text(
                                                        'Tanggal Pembelian',
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
                                                      ': $formattedDate',
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
                                                                  0, 0, 101, 0),
                                                          child: Text(
                                                            'Kondisi',
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
                                                          ': ${controller.assetsList[index]["asset_condition"]}',
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
                              ))
                          // ListView(
                          // padding: EdgeInsets.zero,
                          // shrinkWrap: true,
                          // scrollDirection: Axis.vertical,
                          //   children: [
                          //     Container(
                          //       width: double.infinity,
                          //       height: 144,
                          //       decoration: BoxDecoration(
                          //         color: const Color(0xFF122778),
                          //         borderRadius: BorderRadius.circular(14),
                          //         border: Border.all(
                          //           color: const Color(0xFF163360),
                          //           width: 1,
                          //         ),
                          //       ),
                          //       child: Padding(
                          //         padding: const EdgeInsets.all(10),
                          //         child: Container(
                          //           width: 100,
                          //           height: 126,
                          //           decoration: const BoxDecoration(),
                          //           child: Column(
                          //             mainAxisSize: MainAxisSize.max,
                          //             children: [
                          //               Row(
                          //                 mainAxisSize: MainAxisSize.max,
                          //                 mainAxisAlignment:
                          //                     MainAxisAlignment.spaceBetween,
                          //                 children: [
                          //                   Text(
                          //                     'Nama Aset tauu',
                          //                     textAlign: TextAlign.start,
                          //                     style: FlutterFlowTheme.of(context)
                          //                         .bodyMedium
                          //                         .override(
                          //                           fontFamily: 'Poppins',
                          //                           color: FlutterFlowTheme.of(
                          //                                   context)
                          //                               .secondaryBackground,
                          //                           fontSize: 17,
                          //                           letterSpacing: 0,
                          //                           fontWeight: FontWeight.w600,
                          //                         ),
                          //                   ),
                          //                   FlutterFlowIconButton(
                          //                     borderRadius: 20,
                          //                     borderWidth: 1,
                          //                     buttonSize: 35,
                          //                     icon: Icon(
                          //                       Icons.keyboard_control,
                          //                       color:
                          //                           FlutterFlowTheme.of(context)
                          //                               .secondaryBackground,
                          //                       size: 24,
                          //                     ),
                          //                     onPressed: () {
                          //                       print('IconButton pressed ...');
                          //                     },
                          //                   ),
                          //                 ],
                          //               ),
                          //               Row(
                          //                 mainAxisSize: MainAxisSize.max,
                          //                 mainAxisAlignment:
                          //                     MainAxisAlignment.start,
                          //                 children: [
                          //                   Padding(
                          //                     padding: const EdgeInsetsDirectional
                          //                         .fromSTEB(0, 0, 93, 0),
                          //                     child: Text(
                          //                       'Kategori',
                          //                       style: FlutterFlowTheme.of(
                          //                               context)
                          //                           .bodyMedium
                          //                           .override(
                          //                             fontFamily: 'Montserrat',
                          //                             color: FlutterFlowTheme.of(
                          //                                     context)
                          //                                 .secondaryBackground,
                          //                             letterSpacing: 0,
                          //                           ),
                          //                     ),
                          //                   ),
                          //                   Text(
                          //                     ': Alat',
                          //                     style: FlutterFlowTheme.of(context)
                          //                         .bodyMedium
                          //                         .override(
                          //                           fontFamily: 'Montserrat',
                          //                           color: FlutterFlowTheme.of(
                          //                                   context)
                          //                               .secondaryBackground,
                          //                           letterSpacing: 0,
                          //                         ),
                          //                   ),
                          //                 ],
                          //               ),
                          //               Row(
                          //                 mainAxisSize: MainAxisSize.max,
                          //                 mainAxisAlignment:
                          //                     MainAxisAlignment.start,
                          //                 children: [
                          //                   Padding(
                          //                     padding: const EdgeInsetsDirectional
                          //                         .fromSTEB(0, 0, 110, 0),
                          //                     child: Text(
                          //                       'Harga',
                          //                       style: FlutterFlowTheme.of(
                          //                               context)
                          //                           .bodyMedium
                          //                           .override(
                          //                             fontFamily: 'Montserrat',
                          //                             color: FlutterFlowTheme.of(
                          //                                     context)
                          //                                 .secondaryBackground,
                          //                             letterSpacing: 0,
                          //                           ),
                          //                     ),
                          //                   ),
                          //                   Text(
                          //                     ': Rp70.000.00',
                          //                     style: FlutterFlowTheme.of(context)
                          //                         .bodyMedium
                          //                         .override(
                          //                           fontFamily: 'Montserrat',
                          //                           color: FlutterFlowTheme.of(
                          //                                   context)
                          //                               .secondaryBackground,
                          //                           letterSpacing: 0,
                          //                         ),
                          //                   ),
                          //                 ],
                          //               ),
                          //               Row(
                          //                 mainAxisSize: MainAxisSize.max,
                          //                 mainAxisAlignment:
                          //                     MainAxisAlignment.start,
                          //                 children: [
                          //                   Padding(
                          //                     padding: const EdgeInsetsDirectional
                          //                         .fromSTEB(0, 0, 16, 0),
                          //                     child: Text(
                          //                       'Tanggal Pembelian',
                          //                       style: FlutterFlowTheme.of(
                          //                               context)
                          //                           .bodyMedium
                          //                           .override(
                          //                             fontFamily: 'Montserrat',
                          //                             color: FlutterFlowTheme.of(
                          //                                     context)
                          //                                 .secondaryBackground,
                          //                             letterSpacing: 0,
                          //                           ),
                          //                     ),
                          //                   ),
                          //                   Text(
                          //                     ': 20 June 2024',
                          //                     style: FlutterFlowTheme.of(context)
                          //                         .bodyMedium
                          //                         .override(
                          //                           fontFamily: 'Montserrat',
                          //                           color: FlutterFlowTheme.of(
                          //                                   context)
                          //                               .secondaryBackground,
                          //                           letterSpacing: 0,
                          //                         ),
                          //                   ),
                          //                 ],
                          //               ),

                          //               Stack(
                          //                 children: [
                          //                   Row(
                          //                     mainAxisSize: MainAxisSize.max,
                          //                     mainAxisAlignment:
                          //                         MainAxisAlignment.start,
                          //                     children: [
                          //                       Padding(
                          //                         padding:
                          //                             const EdgeInsetsDirectional
                          //                                 .fromSTEB(0, 0, 101, 0),
                          //                         child: Text(
                          //                           'Kondisi',
                          //                           style: FlutterFlowTheme.of(
                          //                                   context)
                          //                               .bodyMedium
                          //                               .override(
                          //                                 fontFamily:
                          //                                     'Montserrat',
                          //                                 color: FlutterFlowTheme
                          //                                         .of(context)
                          //                                     .secondaryBackground,
                          //                                 letterSpacing: 0,
                          //                               ),
                          //                         ),
                          //                       ),
                          //                       Text(
                          //                         ': Baik',
                          //                         style:
                          //                             FlutterFlowTheme.of(context)
                          //                                 .bodyMedium
                          //                                 .override(
                          //                                   fontFamily:
                          //                                       'Montserrat',
                          //                                   color: FlutterFlowTheme
                          //                                           .of(context)
                          //                                       .secondaryBackground,
                          //                                   letterSpacing: 0,
                          //                                 ),
                          //                       ),
                          //                     ],
                          //                   ),
                          //                 ],
                          //               ),
                          //             ].divide(const SizedBox(height: 4)),
                          //           ),
                          //         ),
                          //       ),
                          //     ),
                          //   ].divide(const SizedBox(height: 5)),
                          // ),

                          ),
                    ],
                  ),
                ),
                Align(
                  alignment: const AlignmentDirectional(0.92, 0.97),
                  child: SizedBox(
                    width: 60,
                    height: 60,
                    child: PopupMenuButton<int>(
                      offset: const Offset(0,
                          -60), // Atur offset untuk menampilkan dropdown ke atas
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      ),
                      icon: Container(
                        width: 60,
                        height: 60,
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
                            Icons.menu_sharp,
                            color: Color(0xFFFFFFFF),
                            size: 30,
                          ),
                        ),
                      ),
                      onSelected: (value) async{
                        print('Selected menu item: $value');
                        if (value == 1) {
                          await Get.toNamed('/assets-add?name=${controller.asset.name}');
                          controller.loadAssets(controller.asset.apiPath);
                        }
                      },
                      itemBuilder: (BuildContext context) =>
                          <PopupMenuEntry<int>>[
                        const PopupMenuItem<int>(
                          value: 1,
                          child: Row(children: [
                            Icon(
                              Icons.add,
                              size: 24,
                            ),
                            SizedBox(height: 1, width: 8),
                            Text('Tambah data aset'),
                          ]),
                        ),
                        const PopupMenuItem<int>(
                          value: 2,
                          child: Row(children: [
                            Icon(
                              Icons.search,
                              size: 24,
                            ),
                            SizedBox(height: 1, width: 8),
                            Text('Pencarian'),
                          ]),
                        ),
                        const PopupMenuItem<int>(
                          value: 2,
                          child: Row(children: [
                            Icon(
                              Icons.qr_code_scanner,
                              size: 24,
                            ),
                            SizedBox(height: 1, width: 8),
                            Text('Scan QR Code'),
                          ]),
                        ),
                        const PopupMenuItem<int>(
                          value: 3,
                          child: Row(children: [
                            Icon(
                              Icons.download,
                              size: 24,
                            ),
                            SizedBox(height: 1, width: 8),
                            Text('Export ke Excel'),
                          ]),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
