sap.ui.define([

    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "dmsui/model/models",
    "sap/base/util/UriParameters",
    "sap/m/MessageBox",
],
    function (UIComponent, Device, models, UriParameters, MessageBox) {
        "use strict";

        return UIComponent.extend("dmsui.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: async function () {
                // call the base component's init function

                UIComponent.prototype.init.apply(this, arguments);
                var myPromises = [];

                var isMockServer = UriParameters.fromURL(window.location.href).get("responderOn");
                if (isMockServer) {

                    this.initializeApp();

                } else {

                    //App Variables
                    myPromises.push(new Promise((res, rej) => {

                        fetch("/getAppVariables")
                            .then(lres => lres.json())
                            .then(val => {
                                res(val);
                            })
                            .catch((error) => {
                                this.showError('Failed to Fetch Variables');
                            });
                    }));



                    await Promise.all(myPromises).then((values) => {


                        this.validatePromiseAndInitApp(values);

                    }).catch(error => {
                        this.showError(error.message);
                    });





                }





            },

            validatePromiseAndInitApp: function (values) {

                if (values[0] && values[0] !== "") {

                    this.appid = values[0];
                    this.initializeApp();



                }
                else {
                    this.showError("Error in fetching appID");
                }
            },
            initializeApp: function () {
                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                // set appid to device to use in controllers
                this.getModel("device").setProperty("/appid", this.appid);

                this.getRouter().initialize();




            },
            showError: function (msgText) {
                MessageBox.show(
                    "Error", {
                    icon: MessageBox.Icon.ERROR,
                    title: msgText,
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK
                });
            }

        });
    }
);