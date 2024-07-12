import 'package:flutter/material.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import 'package:get/get.dart';
import '../controllers/report_controller.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

class ReportView extends GetView<ReportController> {
  const ReportView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: const Color(0xFF0B2EAE),
          automaticallyImplyLeading: true,
          title: Text(
            'Laporan Aset ${controller.asset.name.capitalize}',
            style: FlutterFlowTheme.of(context).bodyMedium.override(
                  fontFamily: 'Poppins',
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                  fontSize: 19,
                  letterSpacing: 0,
                ),
          ),
          actions: const [],
          centerTitle: true,
          elevation: 4,
        ),
        body: SafeArea(
          top: true,
          child: Stack(
            children: [
              Align(
                alignment: const AlignmentDirectional(0, 0),
                child: Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(5, 5, 5, 0),
                  child: Container(
                    width: double.infinity,
                    height: double.infinity,
                    decoration: BoxDecoration(
                      color: FlutterFlowTheme.of(context).secondaryBackground,
                    ),
                    child: SingleChildScrollView(
                      scrollDirection: Axis.vertical,
                      child: SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Obx(
                          () => Visibility(
                            visible: controller.isLoading.value == false,
                            child: DataTable(
                              headingRowColor: MaterialStateColor.resolveWith(
                                  (states) => const Color(0xFF60AAE7)),
                              columnSpacing: 14,
                              // border: TableBorder.all(color: Colors.black, width: 1),
                              dataRowMaxHeight: 30.0,
                              dataRowMinHeight: 30.0,
                              headingRowHeight: 30.0,
                              columns: const [
                                DataColumn(
                                    label: Text('Kode',
                                        style: TextStyle(color: Colors.white))),
                                DataColumn(
                                    label: Text('Nama',
                                        style: TextStyle(color: Colors.white))),
                                DataColumn(
                                    label: Text('Kategori',
                                        style: TextStyle(color: Colors.white))),
                                DataColumn(
                                    label: Text('Harga',
                                        style: TextStyle(color: Colors.white))),
                                DataColumn(
                                    label: Text('Tgl Dibeli',
                                        style: TextStyle(color: Colors.white))),
                              ],
                              rows: controller.dataList
                                  .map((data) => DataRow(
                                        cells: [
                                          DataCell(Text(
                                            data['asset_code'].toString(),
                                          )),
                                          DataCell(Text(data['asset_name'])),
                                          DataCell(Text(data['asset_category']
                                                  ['category_name']
                                              .toString())),
                                          DataCell(Text(
                                              controller.currencyFormat(
                                                  data['asset_price']
                                                      .toString()))),
                                          DataCell(Text(controller.formatDate(
                                              data['purchase_date'].toString(),
                                              'dd MMMM yyyy'))),
                                        ],
                                      ))
                                  .toList(),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Align(
                alignment: const AlignmentDirectional(0.85, 0.98),
                child: Visibility(
                  visible: controller.isLoading.value == false,
                  child: FlutterFlowIconButton(
                    borderColor: const Color(0xFF242426),
                    borderRadius: 15,
                    borderWidth: 1,
                    buttonSize: 45,
                    fillColor: const Color(0x4C7D7C81),
                    icon: const Icon(
                      Icons.save,
                      color: Color(0xFF383489),
                      size: 28,
                    ),
                    onPressed: () {
                      // controller.saveReport();
                      controller.saveReport(context);
                    },
                  ),
                ),
              ),
              Obx(() => Align(
                  alignment: AlignmentDirectional(0, 0),
                  child: Visibility(
                      visible: controller.isLoading.value,
                      child: Container(
                        width: 100,
                        height: 100,
                        child: Center(
                          child: LoadingAnimationWidget.staggeredDotsWave(
                            color: Color.fromARGB(255, 36, 88, 167),
                            size: 70,
                          ),
                        ),
                      ))))
            ],
          ),
        ),
      ),
    );
  }
}
