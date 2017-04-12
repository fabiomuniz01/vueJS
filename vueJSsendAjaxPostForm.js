var form = new Vue({

    el: '#form',
    data: {
        params: {
            Nome: '',
            Descricao: '',
            Status: '0'
        }
    },
    methods: {
        send: function (event) {
            $.ajax({
                url: URL_ROOT + "api/perfilapi/Post",
                type: "post",
                dataType: "json",
                data: JSON.stringify(this.params),
                async: false,
                statusCode: {
                    //201 /*Created*/: function (data) {
                    //    //$('#list').trigger('reloadGrid');
                    //    alert('201');
                    //},
                    409 /*Conflict*/: function (result) {
                        alert('409');
                    },
                    303: function (result) {
                        alert('303');
                    }
                },
                success: function (data) {
                    Site.NotificationSuccess("Cadastrado realizado com sucesso!");
                },
                fail: (this.showError)
                });
        },
        showError: function (jqXHR) {
            Site.Error(jqXHR, URL_ROOT + 'Cadastros/Aeroporto');
        }
    }
});

$('#form').validate({ // initialize the plugin
    rules: {
        nome: {
            required: true
        },
        descricao: {
            required: true
        }
    }
}
);





//$(document).ready(function () {

//    $('.button').each(function () {
//        $(this).on('click', function () {
//            var action;
//            if ($(this).attr('id') == "test") {
//                action = 'test.php';
//            } else {
//                action = 'create.php';
//            }
//            $('#form').submit();
//        });
//    });

//    $('#form').validate({ // initialize the plugin
//        rules: {
//            senha: {
//                required: true,
//                minlength: 3
//            },
//            matricula: {
//                required: true
//            }
//        },
//        messages: {
//            senha: {
//                required: "Favor informar a senha",
//                minlength: "Sua senha não pode ser menor que 3 caracteres"
//            },
//            matricula:
//            {
//                required: "Favor informar sua matrícula"
//            }
//        },
//        submitHandler: function (form) {

//            var data = $(form).serialize();
//            console.log(data);
//            window.location.href = 'Home/Index';
//            event.preventDefault();
//            self.salvar();
//            $.ajax({
//                url: "add",
//                type: 'POST',
//                datatype: 'json',
//                data: data,
//                success: function (data) {
//                    alert(data);
//                }
//            });
//            return false;
//        }
//    });
//    var self = this;

//    self.Salvar = function () {


//        var cods = $('#ddlModulo').select2("val");

//        var obj = {
//            NomePerfil: $('#nome').val(),
//            DescPerfil: $('#desc').val(),
//            CodModulos: cods.toString()
//        };

//        $.ajax({
//            type: 'POST',
//            url: URL_ROOT + 'api/perfilapi/PostPerfil',
//            data: obj
//        }).done(function (data) {
//            Site.MessageBoxSuccess('Cadastro Usuário Perfil', 'Perfil cadastrado com sucesso!', URL_ROOT + 'Cadastro/Perfil');

//        }).fail(showError);
//    },

//    self.Editar = function () {

//        var cods = $('#eddlModulo').select2("val");
//        var obj = {
//            NomePerfil: $('#enome').val(),
//            DescPerfil: $('#edesc').val(),
//            CodModulos: cods.toString()
//        };
//        $.ajax({
//            type: 'PUT',
//            url: URL_ROOT + 'api/perfilapi/PutPerfil/?idPerfil=' + $('#id').val(),
//            data: obj,
//            statusCode: {
//                204 /*NoContent*/: function (data) {
//                    Site.MessageBoxSuccess('Cadastro Perfil', 'Perfil alterado com sucesso!', URL_ROOT + 'Cadastro/Perfil');
//                }
//            },
//        }).done(function (data) {
//        }).fail(showError);
//    },

//    self.delete = function (id) {
//        $.ajax({
//            type: 'DELETE',
//            url: URL_ROOT + 'api/perfilapi/DeletePerfil/?idPerfil=' + $('#id').val(),
//            contentType: 'application/json; charset=utf-8'
//        }).done(function (data) {
//            window.location.href = URL_ROOT + 'Cadastro/Perfil';
//        }).fail(showError);
//    }

//    function showError(jqXHR) {
//        Site.Error(jqXHR, URL_ROOT + 'Cadastro/Perfil');
//    }



//    $('#simdel').click(function () {
//        self.delete($('#id').val());
//    });

//    $('#naodel').click(function () {
//        $('#myModalDelete').modal('hide');
//    });
//});


//var crud = {
//    editModal: function (id) {

//        $('#id').val(id);
//        $('#myModalEdit').modal('show');
//        //crud.find(id);
//    },

//    deleteModal: function (id) {
//        if (id == 1) {
//            Site.MessageBoxWarning('Cadastros', 'Não é possível <b>excluir</b> este registro.', URL_ROOT + 'Cadastros/Aeroporto');
//        } else {
//            $('#id').val(id);
//            Site.MessageBoxDelete('Exclusão', 'Tem certeza que deseja <b>excluir</b> o registro selecionado?');
//        }
//    },

//    find: function (id) {
//        $.ajax({
//            type: 'GET',
//            url: URL_ROOT + 'api/perfilapi/Get/?id=' + id,
//            contentType: 'application/json; charset=utf-8'
//        }).done(function (data) {
//            $('#enome').val(data.NomePerfil);
//            $('#edesc').val(data.DescPerfil);
//            var selectedValues = data.CodModulos.split(",");

//            var $eddlModulo = $('#eddlModulo').select2();

//            $eddlModulo.val(selectedValues).trigger("change");

//            //$("#eddlModulo").val(selectedValues);
//            //$("#eddlModulo").select2('val', selectedValues);
//            $('#id').val(id);

//        }).fail(crud.showError);
//    },

//    showError: function (jqXHR) {

//        Site.Error(jqXHR, URL_ROOT + 'Cadastros/Aeroporto');
//    }
//};