import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutterflow_ui/flutterflow_ui.dart';
import '../controllers/assets_category_controller.dart';

class AssetsCategoryView extends GetView<AssetsCategoryController> {
  const AssetsCategoryView({Key? key}) : super(key: key);

void dialogOption(context, id) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Yakin ingin menghapus data ini?'),
          // content: const Text('What do you want to do?'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                controller.deleteCategory(id);
              },
              style: TextButton.styleFrom(
                backgroundColor: Color.fromARGB(255, 247, 0, 0),
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
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
    final controller = Get.find<AssetsCategoryController>();
    return GestureDetector(
      // onTap: () => _model.unfocusNode.canRequestFocus
      //     ? FocusScope.of(context).requestFocus(_model.unfocusNode)
      //     : FocusScope.of(context).unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: const Color(0xFF0B2EAE),
          automaticallyImplyLeading: true,
          title: Text(
            'Kategori Aset',
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
                        itemCount: controller.categoryList.length,
                        itemBuilder: (context, index) {
                          return Padding(
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
                                      padding:
                                          const EdgeInsetsDirectional.fromSTEB(
                                              10, 0, 0, 0),
                                      child: Text(
                                        controller.categoryList[index]
                                            ['category_name'],
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
                                      padding:
                                          const EdgeInsetsDirectional.fromSTEB(
                                              0, 0, 10, 0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        children: [
                                          FlutterFlowIconButton(
                                            borderColor:
                                                Color.fromARGB(75, 38, 36, 59),
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            buttonSize: 40,
                                            fillColor: const Color(0x4C5E5B81),
                                            icon: const Icon(
                                              Icons.edit,
                                              color: Color(0xFF071952),
                                              size: 24,
                                            ),
                                            onPressed: () async {
                                              await Get.toNamed("/assets-category-add?id=${controller.categoryList[index]['category_id']}&action=edit");
                                              controller.loadCategory();
                                            },
                                          ),
                                          FlutterFlowIconButton(
                                            borderColor:Color.fromARGB(75, 38, 36, 59),
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            buttonSize: 40,
                                            fillColor: const Color(0x4C5E5B81),
                                            icon: const Icon(
                                              Icons.delete,
                                              color: Color(0xFFC80036),
                                              size: 24,
                                            ),
                                            onPressed: () {
                                              dialogOption(context, controller.categoryList[index]['category_id'].toString());
                                            },
                                          ),
                                        ].divide(const SizedBox(width: 10)),
                                      ),
                                    ),
                                  ],
                                ),
                              ));
                        },
                      )),
                ),
              ),
              Align(
                alignment: const AlignmentDirectional(0.92, 0.97),
                child: FlutterFlowIconButton(
                  borderColor: Colors.transparent,
                  borderRadius: 20,
                  borderWidth: 1,
                  buttonSize: 50,
                  fillColor: const Color(0xFF3D77D2),
                  icon: Icon(
                    Icons.add,
                    color: FlutterFlowTheme.of(context).secondaryBackground,
                    size: 30,
                  ),
                  onPressed: () async {
                    await Get.toNamed("/assets-category-add");
                    controller.loadCategory();
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
