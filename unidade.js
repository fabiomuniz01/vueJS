



var vm = new Vue({
    el: "#form",
    data: {
        UnidadeInfraEstruturaDto: {
            Dependencia: {}
        },
        params: {
            sigla:""
        },
        loading: false
    },
    mounted: function () {
        var self = this;
        (function ($) {

            'use strict';

            $('#DtIniVigencia').datepicker({
                format: "dd/mm/yyyy",
                language: "pt-BR"
            });
            $('#DtFimVigencia').datepicker({
                format: "dd/mm/yyyy",
                language: "pt-BR"
            });

            $("#form").validate({
                highlight: function (label) {
                    $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                success: function (label) {
                    $(label).closest('.form-group').removeClass('has-error');
                    label.remove();
                },
                errorPlacement: function (error, element) {
                    var placement = element.closest('.input-group');
                    if (!placement.get(0)) {
                        placement = element;
                    }
                    if (error.text() !== '') {
                        placement.after(error);
                    }
                }
            });

        }).apply(this, [jQuery]);
    },
    methods: {
        ShowLoad: function (flag, el) {
            var self = this;

            self.isLoading = flag;
            $("#" + el).loadingOverlay({
                "startShowing": flag
            });
            self.loading = flag;

            if (!flag) {
                self.isLoading = flag;
                $("#" + el).removeClass("loading-overlay-showing");
                self.loading = flag;
            } else {
                self.isLoading = flag;
                $("#" + el).addClass("loading-overlay-showing");
                self.loading = flag;
            }
        },
        GetUnidadeBySigla: function (event) {
            var self = this;
            self.ShowLoad(true, "vUnidade");

            axios.get("GetUnidadeBySigla/?sigla=" + self.params.sigla).then(result => {

                if (result.data.dep_codigo === undefined) {
                    new PNotify({
                        title: 'Unidade de Infraestrutura',
                        text: result.data,
                        type: 'error'
                    });
                } else {
                    self.UnidadeInfraEstruturaDto.Dependencia = result.data;
                }
                self.ShowLoad(false, "vUnidade");

            }).catch(error => {
                Site.Notification("Erro ao buscar e analisar dados", error.response.data, "error", 1);
                    self.ShowLoad(false, "vUnidade");

                    //    new PNotify({
                //        title: 'Regular Notice',
                //        text: 'Check me out! I\'m a notice.',
                //        type: 'custom',
                //        addclass: 'notification-primary',
                //        icon: 'fa fa-twitter'
                //    });

                //    new PNotify({
                //        title: 'Regular Notice',
                //        text: 'Check me out! I\'m a notice.'
                //    });

                //    new PNotify({
                //        title: 'Regular Notice',
                //        text: 'Check me out! I\'m a notice.',
                //        type: 'success'
                //    });

                //    new PNotify({
                //        title: 'Regular Notice',
                //        text: 'Check me out! I\'m a notice.',
                //        type: 'info'
                //    });

                //    new PNotify({
                //        title: 'Regular Notice',
                //        text: 'Check me out! I\'m a notice.',
                //        type: 'error'
                //    });

                //    new PNotify({
                //        title: 'Regular Notice',
                //        text: 'Check me out! I\'m a notice.',
                //        addclass: 'notification-dark',
                //        icon: 'fa fa-user'
                //});
            });
        }
    }
});