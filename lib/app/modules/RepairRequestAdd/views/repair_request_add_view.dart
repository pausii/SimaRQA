import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import '../controllers/repair_request_add_controller.dart';

class RepairRequestAddView extends GetView<RepairRequestAddController> {
  const RepairRequestAddView({Key? key}) : super(key: key);

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (pickedDate != null) {
      controller.inputDamageDate.text =
          DateFormat('yyyy-MM-dd').format(pickedDate);
    }
  }

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<RepairRequestAddController>();
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B2EAE),
        automaticallyImplyLeading: true,
        title: Obx(() => Text(
              controller.title.value,
              style: FlutterFlowTheme.of(context).bodyMedium.override(
                    fontFamily: 'Poppins',
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                    fontSize: 14,
                    letterSpacing: 0,
                  ),
            )),
        actions: [
          Obx(() => Visibility(
              visible: controller.readonly.value==true && controller.userRole == "administrator",
              child: IconButton(
                  onPressed: () async {
                    Get.parameters['action'] = 'edit';
                    controller.onInit();
                    controller.onReady();
                    controller.readonly.value = false;
                  },
                  icon: const Icon(
                    Icons.edit_document,
                    color: Colors.white,
                  ))))
        ],
        centerTitle: true,
        elevation: 4,
      ),
      body: SafeArea(
        top: true,
        child: Padding(
          padding: const EdgeInsetsDirectional.fromSTEB(10, 30, 10, 0),
          child: Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              color: FlutterFlowTheme.of(context).secondaryBackground,
            ),
            child: ListView(
              // mainAxisSize: MainAxisSize.max,
              children: [
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                  child: Obx(
                    () => FlutterFlowDropDown(
                      options: controller.assetList
                          .map((asset) =>
                              "${asset['asset_code']} - ${asset['asset_name']}")
                          .toList(),
                      onChanged: (val) {
                        if (controller.readonly == true) {
                          return;
                        }
                        controller.hintTextAssetCode.value = val.toString();
                      },
                      width: 407,
                      height: 56,
                      textStyle:
                          FlutterFlowTheme.of(context).bodyMedium.override(
                                fontFamily: 'Readex Pro',
                                letterSpacing: 0,
                              ),
                      hintText: controller.hintTextAssetCode.value,
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
                  child: TextFormField(
                    controller: controller.inputDamageDate,
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
                      labelText: 'Tanggal Kerusakan',
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
                Obx(
                  () => Visibility(
                    visible: controller.action == 'edit' ||
                        controller.action == 'viewDetail',
                    child: Padding(
                      padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                      child: FlutterFlowDropDown(
                        options: controller.statusList
                            .map((category) =>
                                category as String)
                            .toList(),
                        onChanged: (val) {
                          // if (controller.readonly == true) {
                          //   return;
                          // }
                          controller.hintTextStatus.value = val.toString();
                        },
                        width: 407,
                        height: 56,
                        textStyle:
                            FlutterFlowTheme.of(context).bodyMedium.override(
                                  fontFamily: 'Readex Pro',
                                  letterSpacing: 0,
                                ),
                        hintText: controller.hintTextStatus.value,
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
                ),
                Obx(
                  () => Padding(
                    padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 0),
                    child: TextFormField(
                      controller: controller.inputDetails,
                      // focusNode: _model.textFieldFocusNode1,
                      maxLines: 3,
                      autofocus: true,
                      obscureText: false,
                      readOnly: controller.readonly.value,
                      decoration: InputDecoration(
                        labelText: 'Detail Kerusakan',
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
                ),
              Obx(() =>   Container(
                  width: double.infinity,
                  height: 100,
                  decoration: BoxDecoration(
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                  ),
                  child: Visibility(
                      visible: controller.readonly.value == true ? 
                                  controller.edit.value == true ? true : false 
                              : true,
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
                                    print("submitForm");
                                    controller.submitForm();
                                  }
                                },
                                text: controller.action == "edit"
                                    ? "Simpan Perubahan"
                                    : "Simpan Data",
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
              )
              ].divide(const SizedBox(height: 10)),
            ),
          ),
        ),
      ),
    );
  }
}
