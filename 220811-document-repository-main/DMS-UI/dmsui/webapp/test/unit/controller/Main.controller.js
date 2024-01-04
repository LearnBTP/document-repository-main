/*global QUnit*/

sap.ui.define([
    "dmsui/controller/Main.controller",
    "sap/ui/core/mvc/View",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit",
    "sap/ui/table/Table"
], function (Controller, View, JSONModel, Component, sinon,Table) {
    "use strict";

    QUnit.module("Main  Controller", {
        beforeEach: function () {
            this.oController = new Controller();
        },
        afterEach: function () {
            this.oController.destroy();
        }
    });

    QUnit.test("I should test the Main controller Save Success", function (assert) {
        var oViewStub = new View();
        var oModelStub = new JSONModel();
        var oOwnerStub = new Component();
       // var oTableStub = new Table();
       var oTableStub = new sap.ui.table.Table("idProductsTable");
        sinon.stub(this.oController, "getOwnerComponent").returns(oOwnerStub);
        sinon.stub(this.oController, "getView").returns(oViewStub);
        sinon.stub(oViewStub, "getModel").returns(oModelStub);
        sinon.stub(oViewStub, "byId").returns(oTableStub);

       
        var respose = {
            repoAndConnectionInfos: {
    
                repository : { 
                    "name": "testing",
                    "description": "testing",
                    "cmisRepositoryId": "testingUI"
                   
                       
                   } 
    
            }
                
                  
                
            
        };
          

        
        
     
        this.oController.getOwnerComponent().setModel(new JSONModel(),"localJsonModel");
     

        var succresponse = this.oController.setTableData(respose);
      
     
     
        assert.ok(this.oController);

    


    });

    QUnit.test("I should test the Main controller Save Success for", function (assert) {
        var oViewStub = new View();
        var oModelStub = new JSONModel();
        var oOwnerStub = new Component();
        sinon.stub(this.oController, "getOwnerComponent").returns(oOwnerStub);
        sinon.stub(this.oController, "getView").returns(oViewStub);
        sinon.stub(oViewStub, "getModel").returns(oModelStub);

       
        var respose = {
            repoAndConnectionInfos: 
    
                [{  repository : { 
                    "name": "testing",
                    "description": "testing",
                    "cmisRepositoryId": "testingUI"
                   
                       
                   }
                   
                       
                   },
                   { 
                    repository : { 
                        "name": "testing2",
                    "description": "testing2",
                    "cmisRepositoryId": "testingUI2"
                       
                           
                       } 
                   
                       
                   }
    
    
                ]
    
            
                
                  
                
            
        };
      

        this.oController.getOwnerComponent().setModel(new JSONModel(),"localJsonModel");
        var succresponse = this.oController.setTableData(respose);
        assert.ok(this.oController);

    


    });

    
    

     
})