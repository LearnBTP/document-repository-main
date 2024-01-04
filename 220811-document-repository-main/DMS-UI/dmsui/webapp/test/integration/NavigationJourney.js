/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
    "sap/ui/test/Opa5",
	"./pages/App",
	"./pages/Main"
], function (opaTest,Opa5) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });

        // Then.onTheAppPage.iShouldSeeTheApp();
   //     Then.onTheViewPage.iShouldSeeThePageView();
        
  //    Then.onTheViewPage.iShouldSeeTheTable();
        
  //When.onTheViewPage.iShouldClickonButton("btnStartProcess");
       
   
        
      //  Then.iTeardownMyAppFrame();
         
		
	});

    // Click on create button
   opaTest("Should create the repository",function(Given, When, Then){

   // Then.onTheAppPage.iShouldSeeTheApp();
   //     Then.onTheViewPage.iShouldSeeThePageView();
        
  //    Then.onTheViewPage.iShouldSeeTheTable();
        
        When.onTheViewPage.iShouldClickonButton("btnStartProcess");
        When.onTheViewPage.iShouldClickButtonInFragment("Cancel");
        When.onTheViewPage.iShouldClickonButton("btnStartProcess");
        
        When.onTheViewPage.iShouldFillDatainInputNegative("iDdisplayName-inner","TestUI Repo","sap.m.Input");
        When.onTheViewPage.iShouldClickButtonInFragment("OK"); 
        When.onTheViewPage.iShouldClickButtonInFragment("Cancel");
        When.onTheViewPage.iShouldClickonButton("btnStartProcess");
      
   
        When.onTheViewPage.iShouldFillDatainInput("iDdisplayName-inner","TestUI Repo","sap.m.Input");
        When.onTheViewPage.iShouldClickButtonInFragment("OK"); 

         When.onTheViewPage.iShouldFillTable("idProductsTable");
         When.onTheViewPage.iShouldClickonButton("container-dmsui---Main--columnlistitem-container-dmsui---Main--idProductsTable-0");
      



   });
    
});
