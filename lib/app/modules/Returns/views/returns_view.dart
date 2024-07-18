import 'package:flutter/material.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import '../controllers/returns_controller.dart';

class ReturnsView extends GetView<ReturnsController> {
  const ReturnsView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final controller = Get.find<ReturnsController>();
    return GestureDetector(
      // onTap: () => _model.unfocusNode.canRequestFocus
      //     ? FocusScope.of(context).requestFocus(_model.unfocusNode)
      //     : FocusScope.of(context).unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: const Color(0xFF0B2EAE),
          automaticallyImplyLeading: true,
          title: Obx(
            () => Text(
              'Pengembalian Aset #${controller.data["borrowed_asset_code"] ?? ""}',
              style: FlutterFlowTheme.of(context).bodyMedium.override(
                    fontFamily: 'Poppins',
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                    fontSize: 16,
                    letterSpacing: 0,
                  ),
            ),
          ),
          actions: [],
          centerTitle: true,
          elevation: 4,
        ),
        body: SafeArea(
          top: true,
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Padding(
                padding: const EdgeInsetsDirectional.fromSTEB(10, 10, 10, 0),
                child: Container(
                  width: double.infinity,
                  height: 268,
                  decoration: BoxDecoration(
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                    boxShadow: const [
                      BoxShadow(
                        blurRadius: 5,
                        color: Color(0x33000000),
                        offset: Offset(
                          0,
                          10,
                        ),
                      )
                    ],
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(
                      color: const Color(0xFF163360),
                      width: 2,
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsetsDirectional.fromSTEB(7, 10, 7, 0),
                    child: Obx(() => Column(
                            mainAxisSize: MainAxisSize.max,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Kode Aset: ${controller.data['borrowed_asset_code'] ?? ""}',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: const Color(0xFF174D76),
                                      fontSize: 15,
                                      letterSpacing: 0,
                                    ),
                              ),
                              Text(
                                'Nama Aset: ${controller.data['borrowed_asset_name'] ?? ""}',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: const Color(0xFF174D76),
                                      fontSize: 15,
                                      letterSpacing: 0,
                                    ),
                              ),
                              Text(
                                'Nama Peminjam: ${controller.data['borrowed_name'] ?? ""}',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: const Color(0xFF174D76),
                                      fontSize: 15,
                                      letterSpacing: 0,
                                    ),
                              ),
                              Text(
                                'Program: ${controller.data['used_by_program'] ?? ""}',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: const Color(0xFF174D76),
                                      fontSize: 15,
                                      letterSpacing: 0,
                                    ),
                              ),
                              Text(
                                'Tanggal Pinjam: ${DateFormat('yyyy-MM-dd').format(DateTime.parse(controller.data['borrowed_date'] ?? DateTime.now().toString()))}',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: const Color(0xFF174D76),
                                      fontSize: 15,
                                      letterSpacing: 0,
                                    ),
                              ),
                              Text(
                                'Tanggal Pengembalian: ${DateFormat('yyyy-MM-dd').format(DateTime.parse(controller.data['due_date'] ?? DateTime.now().toString()))}',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: const Color(0xFF174D76),
                                      fontSize: 15,
                                      letterSpacing: 0,
                                    ),
                              ),
                              Text(
                                'Catatan: ${controller.data['notes'] ?? ""}',
                                style: FlutterFlowTheme.of(context)
                                    .bodyMedium
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: const Color(0xFF174D76),
                                      fontSize: 15,
                                      letterSpacing: 0,
                                    ),
                              ),
                            ])),
                  ),
                ),
              ),
              Container(
                width: 143,
                height: 60,
                decoration: const BoxDecoration(),
                child: Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(0, 20, 0, 0),
                  child: FFButtonWidget(
                    onPressed: () {
                      controller.returns();
                    },
                    text: 'Kembalikan',
                    options: FFButtonOptions(
                      height: 2,
                      padding:
                          const EdgeInsetsDirectional.fromSTEB(24, 0, 24, 0),
                      iconPadding:
                          const EdgeInsetsDirectional.fromSTEB(0, 0, 0, 0),
                      color: const Color(0xFFE5F05F),
                      textStyle:
                          FlutterFlowTheme.of(context).titleSmall.override(
                                fontFamily: 'Readex Pro',
                                color: FlutterFlowTheme.of(context).primaryText,
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
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
