sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
   
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function(Controller, MessageBox, Fragment) {
    "use strict";

    return Controller.extend("dmsui.controller.Main", {
        onInit: function() {
            this.getDocData();
            
        },
        getDocData: function() {
            var that = this;
            var url = "/dms-repo-get/rest/v2/repositories";
            $.ajax({
                url: url,
                method: "GET",
                headers: {
                    "appid": that.getOwnerComponent().getModel("device").getProperty("/appid")
                },
                success: function(response) {
                    that.setTableData(response);
                },
                error: function(err) {
                    sap.m.MessageToast.show(err.responseText);
                }
            });
        },
        setTableData: function(response) {
            var oJsonModel = this.getOwnerComponent().getModel("localJsonModel");
            var oAppData = {
                "results": []
            };
            var data = {};
            if (response.repoAndConnectionInfos.length !== 0 && response.repoAndConnectionInfos.length !== undefined) {
                var responseData = response.repoAndConnectionInfos;
                for (var k of responseData) {
                    data = {};
                    
                    data.name = k.repository.name;
                    data.description = k.repository.description;
                    // below Repository Id is imp to pass to the document service to fetch the repo details
                    data.cmisRepositoryId = k.repository.cmisRepositoryId;
                    (oAppData.results).push(data);
                    
                }
                    oJsonModel.setData(oAppData);
                    oJsonModel.refresh();
            }
            // in case there is only single repository below code would be executed
            else {
                data.name = response.repoAndConnectionInfos.repository.name;
                data.description = response.repoAndConnectionInfos.repository.description;
                // below Repository Id is imp to pass to the document service to fetch the repo details
                data.cmisRepositoryId = response.repoAndConnectionInfos.repository.cmisRepositoryId;
                (oAppData.results).push(data);
                oJsonModel.setData(oAppData);
                oJsonModel.refresh();
            }
        },
        fnCreateRepo: function() {
            var that = this;
            if (!this._oCreateRepoDialog) {
                this._oCreateRepoDialog = sap.ui.xmlfragment("dmsui.Fragments.Popover.CreateRepo", that);
                that.getView().byId("main").addDependent(this._oCreateRepoDialog);
            }
            this._oCreateRepoDialog.open();
        },
        fnOnCreatePress: function() {
            var that = this;
            var displayName = sap.ui.getCore().byId("iDdisplayName").getValue().toString().trim();
            var description = sap.ui.getCore().byId("iDdescription").getValue().toString().trim();
            var repositoryType = sap.ui.getCore().byId("idrepositoryType").getValue().toString().trim();
            var versionVal = sap.ui.getCore().byId("idIsVerEnb").getState();
            var IsVirusScanEnabled = sap.ui.getCore().byId("idIsVirusScanEnb").getState();
            var SkipVirusScanForLargeFile = sap.ui.getCore().byId("idSkipVirusScanLFile").getState();
            var isContentBridgeEnabled = sap.ui.getCore().byId("idContentBridgeEnabled").getState();
            var ExternalID = sap.ui.getCore().byId("idExtID").getValue().toString().trim();
            if (displayName == "" || description == "" || repositoryType == "" || ExternalID == "") {
                sap.m.MessageToast.show("All Fields are Mandatory");
                return;
            }
            var url = "/dms-destination-service/rest/v2/repositories";
            var data = {
                "repository": {
                    "displayName": displayName,
                    "description": description,
                    "repositoryType": repositoryType,
                    "isVersionEnabled": versionVal,
                    "isVirusScanEnabled": IsVirusScanEnabled,
                    "skipVirusScanForLargeFile": SkipVirusScanForLargeFile,
                    "hashAlgorithms": "SHA-256",
                    "isContentBridgeEnabled": isContentBridgeEnabled,
                    "externalId": ExternalID
                }
            }
            jQuery.ajax({
                url: url,

                method: "POST",
                data: JSON.stringify(data),
                async: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "appid": that.getOwnerComponent().getModel("device").getProperty("/appid")
                },
                success: function(response) {
                    MessageBox.success("Repository is created  Successfully");

                    that.getDocData();
                    that.onCreateDialogClse();
                },
                error: function(err) {
                    sap.m.MessageToast.show(err.responseText);
                    that.onCreateDialogClse();
                }
            });
        },
        // Below function will be called on click of Cancel button on Upload Dialog 
        onCreateDialogClse: function(oEvent) {
            this._oCreateRepoDialog.close();
            this._oCreateRepoDialog.destroy();
            this._oCreateRepoDialog = undefined;
        },
        // Below function is used to navigate from the first view to second 
        onRepoTableItemPress: function(oEvent) {
            var oJsonModel = this.getOwnerComponent().getModel("localJsonModel");
            var oBindingContext = oEvent.getSource().getBindingContext("localJsonModel");
            var Path = oBindingContext.sPath.substring(oBindingContext.sPath.lastIndexOf('/') + 1);
            var selData = oBindingContext.oModel.oData.results[Path];
            var RepoName = selData.name;
            var cmisRepositoryId = selData.cmisRepositoryId;
            oJsonModel.setProperty("/RepoName", RepoName);
            oJsonModel.setProperty("/cmisRepositoryId", cmisRepositoryId);
            this.getOwnerComponent().getRouter().navTo("TargetView1", {
            }, false);
        }
    });
});