import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../controllers/dashboard_controller.dart';
import '../../../widgets/sidebar.dart';

class DashboardView extends GetView<DashboardController> {
  // late MenuDrawerModel _drawerModel;

  const DashboardView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      // key: scaffoldKey,
      backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
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
          padding: const EdgeInsetsDirectional.fromSTEB(10, 10, 10, 10),
          child: ListView(
            padding: EdgeInsets.zero,
            scrollDirection: Axis.vertical,
            children: [
              Container(
                  width: 339,
                  height: 215,
                  decoration: BoxDecoration(
                    color: const Color(0xFF3D77D2),
                    image: DecorationImage(
                      fit: BoxFit.fill,
                      image: Image.asset(
                        'assets/images/bg-home.jpg',
                      ).image,
                    ),
                    borderRadius: BorderRadius.circular(10),
                    shape: BoxShape.rectangle,
                  ),
                  child: Obx(
                    () => Column(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          width: 351,
                          height: 37,
                          decoration: const BoxDecoration(
                            color: Color(0x003D77D2),
                          ),
                          child: Column(
                            // mainAxisSize: MainAxisSize.max,
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment
                                .center, // Menyusun secara vertikal di tengah
                            crossAxisAlignment: CrossAxisAlignment
                                .center, // Menyusun secara horizontal di tengah
                            children: [
                              Padding(
                                padding: const EdgeInsetsDirectional.fromSTEB(
                                    0, 0, 0, 5),
                                child: Text(
                                  'Statistik Aset',
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        fontFamily: 'Readex Pro',
                                        color: Colors.white,
                                        fontSize: 20,
                                        letterSpacing: 0,
                                      ),
                                ),
                              ),
                              Container(
                                width: double.infinity,
                                height: 2,
                                decoration: BoxDecoration(
                                  color: FlutterFlowTheme.of(context).accent4,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Center(
                          child: Wrap(
                            spacing: 10.0, // Jarak horizontal antara kolom
                            runSpacing: 10.0, // Jarak vertikal antara baris
                            alignment: WrapAlignment.center,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  _buildColumn(context, 'Musholla',
                                      controller.musholla.value.toString()),
                                  _buildColumn(context, 'Auditorium',
                                      controller.auditorium.value.toString()),
                                ],
                              ),
                              const SizedBox(height: 3),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  _buildColumn(context, 'Perpustakaan',
                                      controller.perpustakaan.value.toString()),
                                  _buildColumn(context, 'Utilitas',
                                      controller.utilitas.value.toString()),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  )),
              Padding(
                padding: const EdgeInsetsDirectional.fromSTEB(0, 15, 0, 0),
                child: Container(
                  width: 100,
                  height: 281,
                  decoration: BoxDecoration(
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      Padding(
                        padding:
                            const EdgeInsetsDirectional.fromSTEB(0, 10, 0, 0),
                        child: Container(
                          width: double.infinity,
                          height: 21,
                          decoration: BoxDecoration(
                            color: FlutterFlowTheme.of(context)
                                .secondaryBackground,
                          ),
                          child: Text(
                            'Transaksi',
                            textAlign: TextAlign.start,
                            style:
                                FlutterFlowTheme.of(context).bodyLarge.override(
                                      fontFamily: 'Poppins',
                                      letterSpacing: 0,
                                      fontWeight: FontWeight.w600,
                                    ),
                          ),
                        ),
                      ),
                      FFButtonWidget(
                        onPressed: () {
                          Get.offNamed('/maintenance');
                        },
                        text: 'Pemeliharaan Aset',
                        icon: const FaIcon(
                          FontAwesomeIcons.hourglassStart,
                        ),
                        options: FFButtonOptions(
                          width: double.infinity,
                          height: 60,
                          padding: const EdgeInsetsDirectional.fromSTEB(
                              24, 0, 24, 0),
                          iconPadding:
                              const EdgeInsetsDirectional.fromSTEB(0, 0, 0, 0),
                          color: const Color(0xFF072289),
                          textStyle:
                              FlutterFlowTheme.of(context).titleSmall.override(
                                    fontFamily: 'Readex Pro',
                                    color: Colors.white,
                                    fontSize: 17,
                                    letterSpacing: 0,
                                  ),
                          elevation: 3,
                          borderSide: const BorderSide(
                            color: Colors.transparent,
                            width: 1,
                          ),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      FFButtonWidget(
                        onPressed: () {
                          Get.offNamed('/borrowing');
                        },
                        text: 'Peminjaman Aset',
                        icon: const FaIcon(
                          FontAwesomeIcons.box,
                        ),
                        options: FFButtonOptions(
                          width: double.infinity,
                          height: 60,
                          padding: const EdgeInsetsDirectional.fromSTEB(
                              24, 0, 24, 0),
                          iconPadding:
                              const EdgeInsetsDirectional.fromSTEB(0, 0, 0, 0),
                          color: const Color(0xFF072289),
                          textStyle:
                              FlutterFlowTheme.of(context).titleSmall.override(
                                    fontFamily: 'Readex Pro',
                                    color: Colors.white,
                                    fontSize: 17,
                                    letterSpacing: 0,
                                  ),
                          elevation: 3,
                          borderSide: const BorderSide(
                            color: Colors.transparent,
                            width: 1,
                          ),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      // FFButtonWidget(
                      //   onPressed: () {
                      //     print('Button pressed ...');
                      //   },
                      //   text: 'Pengembalian Aset',
                      //   icon: const FaIcon(
                      //     FontAwesomeIcons.hive,
                      //   ),
                      //   options: FFButtonOptions(
                      //     width: double.infinity,
                      //     height: 60,
                      //     padding: const EdgeInsetsDirectional.fromSTEB(24, 0, 24, 0),
                      //     iconPadding:
                      //         const EdgeInsetsDirectional.fromSTEB(0, 0, 0, 0),
                      //     color: const Color(0xFF072289),
                      //     textStyle:
                      //         FlutterFlowTheme.of(context).titleSmall.override(
                      //               fontFamily: 'Readex Pro',
                      //               color: Colors.white,
                      //               fontSize: 17,
                      //               letterSpacing: 0,
                      //             ),
                      //     elevation: 3,
                      //     borderSide: const BorderSide(
                      //       color: Colors.transparent,
                      //       width: 1,
                      //     ),
                      //     borderRadius: BorderRadius.circular(8),
                      //   ),
                      // ),
                    ].divide(const SizedBox(height: 3)),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildColumn(context, String text, String number) {
    return Container(
      width: 140.0, // Lebar setiap kolom
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            text,
            style: FlutterFlowTheme.of(context).bodyMedium.override(
                  fontFamily: 'Readex Pro',
                  color: Colors.white,
                  fontSize: 16,
                  letterSpacing: 0,
                ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 8.0), // Jarak antara teks dan angka
          Text(
            number,
            style: FlutterFlowTheme.of(context).bodyMedium.override(
                  fontFamily: 'Readex Pro',
                  color: Colors.white,
                  fontSize: 25,
                  letterSpacing: 0,
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
