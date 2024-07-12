import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import '../controllers/assets_add_controller.dart';
import 'package:printing/printing.dart';
import 'dart:ui' as ui;
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:pdf/widgets.dart' as pw;

class AssetsAddView extends GetView<AssetsAddController> {
  const AssetsAddView({Key? key}) : super(key: key);
  Future<String> generateQrImageData(String data) async {
    try {
      final qrPainter = await QrPainter(
        data: data,
        version: QrVersions.auto,
        gapless: true,
        color: const Color(0xFF000000),
        emptyColor: Colors.white,
      );

      // Convert to image with specified size
      final picData =
          await qrPainter.toImageData(100, format: ui.ImageByteFormat.png);
      if (picData != null) {
        final buffer = picData.buffer.asUint8List();
        return await saveImage(buffer, "qr_code");
      } else {
        print('Failed to generate QR code image data');
        return "";
      }
    } catch (e) {
      print('Error generating QR code image data: $e');
      return "";
    }
  }

  Future<String> saveImage(Uint8List bytes, String name) async {
    final directory = await getApplicationDocumentsDirectory();
    final path = '${directory.path}/$name.png';
    final file = File(path);
    await file.writeAsBytes(bytes);
    print('Image saved to $path');
    return path;
  }

  Future<pw.Document> printAset(String urlQr) async {
    try {
      final pdf = await pw.Document();
      final image = await imageFromAssetBundle(urlQr);
      pdf.addPage(
        pw.Page(
          build: (pw.Context context) => pw.Container(
            height: 100,
            child: pw.Row(
              crossAxisAlignment: pw.CrossAxisAlignment.start,
              children: [
                // Left Column
                pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.start,
                    children: [
                      _buildInfoRow('ID           ', 'PSX912'),
                      _buildInfoRow('Nama     ', 'Air Conditioner 1'),
                      _buildInfoRow('Kategori ', 'Xyzz'),
                      _buildInfoRow('Tanggal  ', '01-01-2021'),
                    ]),
                pw.SizedBox(width: 20), // Jarak antara children
                // Right Column (QR Code)
                pw.Container(
                  alignment: pw.Alignment.centerRight,
                  child: pw.Image(
                    image,
                  ),
                ),
              ],
            ),
          ),
        ),
      );

      // String body = asetPrintTemplate(inputName.text, assetCode.text, hintTextCategory.value, inputPurchaseDate.text);
      // final widgets = await HTMLToPdf().convert(body);
      // pdf.addPage(await pw.MultiPage(build: (context) => widgets));

      return pdf;
    } catch (e) {
      print("ExceptionPS3: $e");
      return pw.Document();
    }
  }

  pw.Widget _buildInfoRow(String label, String value) {
    return pw.Row(
      children: [
        pw.Text('$label:', style: const pw.TextStyle(fontSize: 17)),
        pw.SizedBox(width: 10),
        pw.Text(value, style: const pw.TextStyle(fontSize: 17)),
      ],
    );
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (pickedDate != null) {
      controller.inputPurchaseDate.text =
          DateFormat('yyyy-MM-dd').format(pickedDate);
    }
  }

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<AssetsAddController>();
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B2EAE),
        automaticallyImplyLeading: true,
        title: Text(
          controller.title,
          style: FlutterFlowTheme.of(context).bodyMedium.override(
                fontFamily: 'Poppins',
                color: FlutterFlowTheme.of(context).secondaryBackground,
                fontSize: 19,
                letterSpacing: 0,
              ),
        ),
        actions: [
          Visibility(
            visible: controller.readonly == true,
            child:   IconButton(
              onPressed: () async {
                try {
                  Map<String, dynamic> data = {
                    'code': controller.assetCode.text,
                    'path': controller.asset.name,
                  };

                  String jsonEncoded = jsonEncode(data);
                  String urlQr =
                      await generateQrImageData(jsonEncoded);
                  if (urlQr != "") {
                    final pdf = await printAset(urlQr);
                    await Printing.layoutPdf(
                        onLayout: (format) async => pdf.save());
                    // controller.generateQrImageData();
                  }
                } catch (e) {
                  print("ExceptionPS4: $e");
                }
              },
              icon: const Icon(
                Icons.print,
                color: Colors.white,
              ))
          )
        ],
        centerTitle: true,
        elevation: 4,
      ),
      body: SafeArea(
        top: true,
        child: Padding(
          padding: const EdgeInsetsDirectional.fromSTEB(10, 10, 10, 0),
          child: Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              color: FlutterFlowTheme.of(context).secondaryBackground,
            ),
            child: ListView(
              // mainAxisSize: MainAxisSize.max,
              padding: const EdgeInsets.only(top: 30),
              children: [
                Visibility(
                    visible: controller.codeAsetVisible,
                    child: Padding(
                      padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                      child: TextFormField(
                        controller: controller.assetCode,
                        // focusNode: _model.textFieldFocusNode2,
                        obscureText: false,
                        readOnly: true,
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                          labelText: 'Kode Aset',
                          labelStyle:
                              FlutterFlowTheme.of(context).labelMedium.override(
                                    fontFamily: 'Readex Pro',
                                    letterSpacing: 0,
                                  ),
                          hintStyle:
                              FlutterFlowTheme.of(context).labelMedium.override(
                                    fontFamily: 'Readex Pro',
                                    letterSpacing: 0,
                                  ),
                          enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                              color: Color(0xFF163360),
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                              color: Color(0xFF3D77D2),
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          errorBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: FlutterFlowTheme.of(context).error,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          focusedErrorBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: FlutterFlowTheme.of(context).error,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          filled: true,
                        ),
                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                              fontFamily: 'Readex Pro',
                              letterSpacing: 0,
                            ),
                        // validator:
                        //     _model.textController2Validator.asValidator(context),
                      ),
                    )),
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                  child: TextFormField(
                    controller: controller.inputName,
                    // focusNode: _model.textFieldFocusNode1,
                    autofocus: true,
                    obscureText: false,
                    readOnly: controller.readonly,
                    decoration: InputDecoration(
                      labelText: 'Nama Aset',
                      labelStyle:
                          FlutterFlowTheme.of(context).labelMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      hintStyle:
                          FlutterFlowTheme.of(context).labelMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color.fromARGB(255, 16, 49, 97),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFF3D77D2),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: FlutterFlowTheme.of(context).error,
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: FlutterFlowTheme.of(context).error,
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      filled: true,
                    ),
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          letterSpacing: 0,
                        ),
                    // validator:
                    //     _model.textController1Validator.asValidator(context),
                  ),
                ),
                Padding(
                    padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                    child: Obx(
                      () => FlutterFlowDropDown(
                        options: controller.categoryList
                            .map((category) =>
                                category['category_name'] as String)
                            .toList(),
                        onChanged: (val) {
                          // print(val);
                          if (controller.readonly == true) {
                            return;
                          }
                          controller.hintTextCategory.value = val ?? '';
                        },
                        width: 407,
                        height: 56,
                        textStyle:
                            FlutterFlowTheme.of(context).bodyMedium.override(
                                  fontFamily: 'Readex Pro',
                                  letterSpacing: 0,
                                ),
                        hintText: controller.hintTextCategory.value,
                        icon: Icon(
                          Icons.keyboard_arrow_down_rounded,
                          color: FlutterFlowTheme.of(context).secondaryText,
                          size: 24,
                        ),
                        fillColor:
                            FlutterFlowTheme.of(context).secondaryBackground,
                        elevation: 2,
                        borderColor: const Color(0xFF163360),
                        borderWidth: 2,
                        borderRadius: 8,
                        margin:
                            const EdgeInsetsDirectional.fromSTEB(16, 4, 16, 4),
                        hidesUnderline: true,
                        // isOverButton: true,
                        // isSearchable: false,
                        // isMultiSelect: false,
                      ),
                    )),
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                  child: TextFormField(
                    controller: controller.inputPrice,
                    // focusNode: _model.textFieldFocusNode1,
                    autofocus: true,
                    obscureText: false,
                    readOnly: controller.readonly,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Harga Aset',
                      labelStyle:
                          FlutterFlowTheme.of(context).labelMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      hintStyle:
                          FlutterFlowTheme.of(context).labelMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color.fromARGB(255, 16, 49, 97),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFF3D77D2),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: FlutterFlowTheme.of(context).error,
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: FlutterFlowTheme.of(context).error,
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      filled: true,
                    ),
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          letterSpacing: 0,
                        ),
                    // validator:
                    //     _model.textController1Validator.asValidator(context),
                  ),
                ),
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                  child: TextFormField(
                    controller: controller.inputPurchaseDate,
                    // focusNode: _model.textFieldFocusNode3,
                    autofocus: true,
                    obscureText: false,
                    readOnly: true,
                    keyboardType: TextInputType.datetime,
                    onTap: () {
                      if (controller.readonly == true) {
                        return;
                      }
                      _selectDate(context);
                    },
                    decoration: InputDecoration(
                      labelText: 'Tanggal Pembelian',
                      labelStyle:
                          FlutterFlowTheme.of(context).labelMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      hintStyle:
                          FlutterFlowTheme.of(context).labelMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFF163360),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFF3D77D2),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: FlutterFlowTheme.of(context).error,
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: FlutterFlowTheme.of(context).error,
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      filled: true,
                    ),
                    style: FlutterFlowTheme.of(context).bodyMedium.override(
                          fontFamily: 'Readex Pro',
                          letterSpacing: 0,
                        ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                  child: Obx(
                    () => FlutterFlowDropDown(
                      // controller: _model.dropDownValueController2 ??=
                      //     FormFieldController<String>(null),
                      options: const [
                        'Baru',
                        'Berfungsi Baik',
                        'Perlu Pemeliharaan',
                        'Rusak',
                        'Tidak Berfungsi'
                      ],
                      onChanged: (val) {
                        if (controller.readonly == true) {
                          return;
                        }
                        controller.hintTextAssetCondition.value =
                            val.toString();
                      },
                      width: 407,
                      height: 56,
                      textStyle:
                          FlutterFlowTheme.of(context).bodyMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      hintText: controller.hintTextAssetCondition.value,
                      icon: Icon(
                        Icons.keyboard_arrow_down_rounded,
                        color: FlutterFlowTheme.of(context).secondaryText,
                        size: 24,
                      ),
                      fillColor:
                          FlutterFlowTheme.of(context).secondaryBackground,
                      elevation: 2,
                      borderColor: const Color(0xFF163360),
                      borderWidth: 2,
                      borderRadius: 8,
                      margin:
                          const EdgeInsetsDirectional.fromSTEB(16, 4, 16, 4),
                      hidesUnderline: true,
                      // isOverButton: true,
                      // isSearchable: false,
                      // isMultiSelect: false,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                  child: Obx(
                    () => FlutterFlowDropDown(
                      // controller: _model.dropDownValueController2 ??=
                      //     FormFieldController<String>(null),
                      options: const [
                        'Dapat Dipindahkan',
                        'Tidak Dapat Dipindahkan'
                      ],
                      onChanged: (val) {
                        if (controller.readonly == true) {
                          return;
                        }
                        controller.hintTextAssetType.value = val.toString();
                      },
                      width: 407,
                      height: 56,
                      textStyle:
                          FlutterFlowTheme.of(context).bodyMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      hintText: controller.hintTextAssetType.value,
                      icon: Icon(
                        Icons.keyboard_arrow_down_rounded,
                        color: FlutterFlowTheme.of(context).secondaryText,
                        size: 24,
                      ),
                      fillColor:
                          FlutterFlowTheme.of(context).secondaryBackground,
                      elevation: 2,
                      borderColor: const Color(0xFF163360),
                      borderWidth: 2,
                      borderRadius: 8,
                      margin:
                          const EdgeInsetsDirectional.fromSTEB(16, 4, 16, 4),
                      hidesUnderline: true,
                      // isOverButton: true,
                      // isSearchable: false,
                      // isMultiSelect: false,
                    ),
                  ),
                ),
                Visibility(
                    visible: controller.readonly == false ? false : true,
                    child: Padding(
                      padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                      child: TextFormField(
                        controller: controller.lastMaintenanceDate,
                        // focusNode: _model.textFieldFocusNode2,
                        autofocus: true,
                        obscureText: false,
                        readOnly: controller.readonly,
                        decoration: InputDecoration(
                          labelText: 'Tanggal terkhir maintenance',
                          labelStyle:
                              FlutterFlowTheme.of(context).labelMedium.override(
                                    fontFamily: 'Readex Pro',
                                    letterSpacing: 0,
                                  ),
                          hintStyle:
                              FlutterFlowTheme.of(context).labelMedium.override(
                                    fontFamily: 'Readex Pro',
                                    letterSpacing: 0,
                                  ),
                          enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                              color: Color(0xFF163360),
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                              color: Color(0xFF3D77D2),
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          errorBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: FlutterFlowTheme.of(context).error,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          focusedErrorBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: FlutterFlowTheme.of(context).error,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          filled: true,
                        ),
                        style: FlutterFlowTheme.of(context).bodyMedium.override(
                              fontFamily: 'Readex Pro',
                              letterSpacing: 0,
                            ),
                        // validator:
                        //     _model.textController2Validator.asValidator(context),
                      ),
                    )),
                Container(
                  width: double.infinity,
                  height: 100,
                  decoration: BoxDecoration(
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                  ),
                  child: Visibility(
                      visible: controller.readonly == true ? false : true,
                      child: Padding(
                        padding:
                            const EdgeInsetsDirectional.fromSTEB(9, 0, 9, 0),
                        child: Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            FFButtonWidget(
                              onPressed: () {
                                Get.back();
                              },
                              text: 'Batal',
                              options: FFButtonOptions(
                                height: 40,
                                padding: const EdgeInsetsDirectional.fromSTEB(
                                    24, 0, 24, 0),
                                iconPadding:
                                    const EdgeInsetsDirectional.fromSTEB(
                                        0, 0, 0, 0),
                                color:
                                    FlutterFlowTheme.of(context).secondaryText,
                                textStyle: FlutterFlowTheme.of(context)
                                    .titleSmall
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: Colors.white,
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
                            const SizedBox(width: 5),
                            Expanded(
                              child: FFButtonWidget(
                                onPressed: () {
                                  print('Button pressed ...');
                                  if (controller.action == "edit") {
                                    controller.updateForm();
                                  } else {
                                    controller.submitForm();
                                  }
                                },
                                text: controller.action == "edit"
                                    ? "Simpan Perubahan"
                                    : "Tambah Aset",
                                options: FFButtonOptions(
                                  height: 40,
                                  padding: const EdgeInsetsDirectional.fromSTEB(
                                      24, 0, 24, 0),
                                  iconPadding:
                                      const EdgeInsetsDirectional.fromSTEB(
                                          0, 0, 0, 0),
                                  color: const Color(0xFF1B5DC3),
                                  textStyle: FlutterFlowTheme.of(context)
                                      .titleSmall
                                      .override(
                                        fontFamily: 'Readex Pro',
                                        color: Colors.white,
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
                          ],
                        ),
                      )),
                ),
              ].divide(const SizedBox(height: 10)),
            ),
          ),
        ),
      ),
    );
  }
}
