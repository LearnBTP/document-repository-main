sap.ui.define([
	"sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText"
], function (Opa5,Press,EnterText) {
	"use strict";
	var sViewName = "Main";
	
	Opa5.createPageObjects({
		onTheViewPage: {
           
			actions: {
                iShouldClickonButton: function (sid) {
                    return this.waitFor({
                        id: sid,
                        viewName: sViewName,
                        actions: new Press(),
                      
                        
                        success: function (oBtn) {
                            debugger;
                         
                            
                            Opa5.assert.ok(true, "Button with id" + sid + "pressed");
                        },
                        errorMessage: "Was unable to press the button with id" + sid
                    })
                },
                iShouldFillDatainInput: function (sid, value, control) {
                    return this.waitFor({
                        viewName : "Main",
                        controlType: control,
                        searchOpenDialogs: true,
                        check: function (oInput) {
                            if (oInput.length > 0) {
                                return true
                            } else {
                                return false;
                            }
                        },
                        
                        success: function (oInput) {
                            oInput[0].setValue(value);
                            oInput[1].setValue(value);
                            oInput[2].setValue(value);
                            oInput[4].setValue(value);
                            
                            Opa5.assert.ok(true, "Data Entered in Input with id" + sid);
                        },
                        errorMessage: "Was not able to enter data in input with id" + sid
                    });
                },
                iShouldFillDatainInputNegative: function (sid, value, control) {
                    return this.waitFor({
                        viewName : "Main",
                        controlType: control,
                        searchOpenDialogs: true,
                        check: function (oInput) {
                            if (oInput.length > 0) {
                                return true
                            } else {
                                return false;
                            }
                        },
                        
                        success: function (oInput) {
                         
                            oInput[1].setValue(value);
                            oInput[2].setValue(value);
                            oInput[4].setValue(value);
                            
                            Opa5.assert.ok(true, "Data Entered in Input with id" + sid);
                        },
                        errorMessage: "Was not able to enter data in input with id" + sid
                    });
                },
                iShouldClickButtonInFragment: function(text){
                    return this.waitFor({
                        viewName : "Main",
                        controlType: "sap.m.Button",
                        searchOpenDialogs: true,
                        check: function (oButton) {
                            
                            if (oButton.length > 0) {
                                return true
                            } else {
                                return false;
                            }
                        },
                        
                        success: function (oButton) {
                            debugger;
                            
                            oButton.forEach(function(oItem){
                                if(oItem.getText() === text){
                                    oItem.firePress();
                                }
                            });
                        },
                        errorMessage: "Was not able to press button with text"+ text
                    })
                },

                iShouldFillTable: function(sid){
                    return this.waitFor({
                        id: sid,
                        viewName: sViewName,
                        success: function(oTable){
                            debugger;
                            var data = [{

                                "name": "testing",
                                "description": "testing",
                                "cmisRepositoryId": "testingUI"
                            }];

                            oTable.getModel("localJsonModel").setProperty("/results/",[{

                                "name": "testing",
                                "description": "testing",
                                "cmisRepositoryId": "testingUI"
                            }]);
                           // oTable.firePress();
                            // oTable.bindAggregation("items",data,new sap.m.ColumnListItem({
                            //     cells : [
                            //          new sap.m.Text({
                            //               text : "{name}"
                            //          })
                            //     ]
                            // })
                            // )
                        
                            // return this.waitFor({
                            //     id: "columnlistitem",
                            //     viewName: sViewName,
                            //     success: function(oColumnItem){
                            //         oTable.bindItems(data,{template: oColumnItem});
                            //     },
                            //     errorMessage: "Not able to find column list item"
                            // })
                            
                        },
                        errorMessage: "Not able to find Table with id "+ sid
                    });
                }
            },
      

			assertions: {

				iShouldSeeThePageView: function () {
					return this.waitFor({
						id: "main",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
						},
						errorMessage: "Did not find the " + sViewName + " view"
					});
				},
                iShouldSeeTheTable: function () {
                    return this.waitFor({
                        id: "idProductsTable",
                        viewName: sViewName,
                        success: function () {
                            Opa5.assert.ok(true, "The " + sViewName + " Table is displayed");
                        },
                        errorMessage: "Did not find the " + sViewName + " Table"
                    });
                }


			}
		}
	});

});
