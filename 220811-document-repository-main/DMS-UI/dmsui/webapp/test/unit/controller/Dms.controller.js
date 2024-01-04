/*global QUnit*/

sap.ui.define([
	"dmsui/controller/Dms.controller",
    "sap/ui/core/mvc/View",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit"
], function (Controller, View, JSONModel, Component, sinon) {
    "use strict";

    QUnit.module("DMS  Controller", {
        beforeEach: function () {
            this.oController = new Controller();
        },
        afterEach: function () {
            this.oController.destroy();
        }
    });
})
