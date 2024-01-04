sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Component"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,UIComponent,Component) {
        "use strict";

        return Controller.extend("dmsui.controller.Dms", {
            
            handleRouteMatched: function(oEvent) {
               
                 var oJsonModel = this.getOwnerComponent().getModel("localJsonModel");
                 var repoName =  oJsonModel.getProperty("/RepoName");
                 var repoId = oJsonModel.getProperty("/cmisRepositoryId");
             
              Component.create({
                    name: "com.sap.ecm.reuse.documentTable",   
                    usage: "documentTable",
                 
                    settings: {"destinationPath": "/comsapecmreuse.comsapecmreusedocumentTable/api",
                    "repositoryId": repoName,
                    "objectId":  repoId }
                    
                  }).then(
                    function(DmsComponent) {
                      this.getView()
                        .byId("_IDGenComponentContainer1")
                        .setComponent(DmsComponent);
                    }.bind(this)
                  );
    
       
               
              

            },
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getTarget("TargetView1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

       
            },
             
            

        });
    });
