define(['views/clientes',
        'backbone', 'underscore',
        'text!views/templates/main.html',
        'views/user/login',
        'text!views/templates/login.html',
        'views/ui/ui'
    ],
    function(ClientesView, Backbone, _, mainTpl, LoginView, loginTpl, UI) {

        var Router = Backbone.Router.extend({

            lastView: null,

            routes: {
                '': function() {
                    if (this.checkLogin()) {
                        this.payBack();
                        new ClientesView().render();
                    }
                },
                '!/clientes': 'clientes',
                '!/archivos': 'archivos'
            },

            checkLogin: function() {
                // console.log("Check Login")
                if (sessvars.session != undefined && sessvars.session != null && sessvars.session.user != undefined && sessvars.session.user != null) {
                    console.log("Login Success")
                    new UI().render();
                    return true;
                } else {
                    // console.log("Login Error")
                    new LoginView().render();
                    return false;
                }
            },

            clientes: function() {
                // console.log("Clientes")
                if (this.checkLogin()) {
                    this.payBack();
                    new ClientesView().render();
                }
            },

            archivos: function() {
                // console.log("Archivos")
                this.payBack();
                new ClientesView().render();
            },

            // Backbone does not undelegate events on its own especially when multiple
            // views loading into the same **el**
            payBack: function() {

                if (this.lastView !== null) {
                    this.lastView.undelegateEvents();
                }

                //      alert(window.location.hash);
                $('ul.nav').children('li').removeClass('active');
                $('ul.nav').children('li').find('a[href="' + window.location.hash + '"]').parent().addClass('active');
            }
        });
        return Router;
    });