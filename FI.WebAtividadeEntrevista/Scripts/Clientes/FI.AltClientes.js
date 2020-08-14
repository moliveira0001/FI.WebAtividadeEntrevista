
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #Cpf').val(obj.Cpf);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var cpfValido = CPFValido($(this).find("#Cpf").val());

        if (cpfValido) {

            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val(),
                    "Cpf": $(this).find("#Cpf").val(),
                    "Beneficiarios": JSON.stringify(tableToJson($("#beneficiarios-table")))
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        ModalDialog("Sucesso!", r)
                        $("#formCadastro")[0].reset();
                        window.location.href = urlRetorno;
                    }
            });
        }
        else {
            $(this).find("#Cpf").val('');
            $(this).find("#Cpf").focus();
        }
    })

});

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
};

function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i)

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }
};

function ValidaCPF(strCPF) {
    var Soma;
    var Resto;

    strCPF = strCPF.replace(/[^\d]+/g, '');

    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
};

function CPFValido(strCPF) {
    if (!ValidaCPF(strCPF)) {
        ModalDialog("Validador C.P.F", "C..P.F Inválido.");
        return false;
    }
    return true;
};

$(function () {
    $("#Beneficiarios").click(function () {
        $("#modal").modal();
        getBeneficiarios();
    });
});

function getBeneficiarios() {
    $.ajax({
        cache: false,
        type: "POST",
        dataType: "json",
        url: urlListabeneficiarios + '/' + obj.Id,
        success:
            function (r) {
                populaBeneficiario(r);
            },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
    });
};

function populaBeneficiario(r) {

    // $("#beneficiarios-table tbody").remove();

    var tr;
    //Append each row to html table
    for (var i = 0; i < r.Records.length; i++) {


        var newRow = $("<tr>");
        var cols = "";
        cols += '<td style="display:none;">' + r.Records[i].Id + '</td>';
        cols += '<td>' + r.Records[i].Nome + '</td>';
        cols += '<td>' + r.Records[i].Cpf + '</td>';
        cols += '<td>';
        cols += '<button class="btn btn-sm btn-danger" value="Delete" onclick="ExcluiBeneficiario(' + r.Records[i].Id + ');deleteRow(this);" type="button">Excluir</button>';
        cols += '</td>';

        cols += '<td>';
        cols += '<button class="btn btn-sm btn-success" onclick="editTableRow(this)" type="button">Editar</button>';
        cols += '</td>';


        newRow.append(cols);
        $("#beneficiarios-table").append(newRow);

    }
};

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
};

function ExcluiBeneficiario(id) {
    $.ajax({
        cache: false,
        type: "DELETE",
        dataType: "json",
        url: urlExcluirBeneficiario + '/' + id,
        success:
            function (r) {


            },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
    });
};

function tableToJson(table) {
    var data = [];
    var headers = [];
    for (var i = 0; i < 3; i++) {
        headers[i] = table[0].rows[0].cells[i].textContent.toLowerCase().replace(".", "").replace(".", "");
    }
    for (var i = 1; i < table[0].rows.length; i++) {

        var tableRow = table[0].rows[i];
        var rowData = {};
        for (var j = 0; j < 3; j++) {
            rowData[headers[j]] = tableRow.cells[j].textContent;
        }
        data.push(rowData);
    }

    return data;
};

$(function () {
    $("#IncluirBeneficiarios").click(function () {

        var table = $("#beneficiarios-table");

        if ($("#NomeBeneficiario").val() == '') {
            return;
        }


        if ($("#CpfBeneficiario").val() == '') {
            return;
        }

        var cpfValido = CPFValido($("#CpfBeneficiario").val());
        if (!cpfValido) {
            $("#CpfBeneficiario").val('');
            $("#NomeBeneficiario").val('');
            $("#NomeBeneficiario").focus();
          
            return false;
        }

        for (var i = 1; i < table[0].rows.length; i++) {

            var tableRow = table[0].rows[i];

            if (tableRow.cells[2].outerText == $("#CpfBeneficiario").val()) {

                $("#CpfBeneficiario").val('');
                $("#NomeBeneficiario").val('');
                $("#NomeBeneficiario").focus();
                alert('CPF já incluído!');
                return false;
            }

        }



        var newRow = $("<tr>");
        var cols = "";

        cols += '<td style="display:none">' +
                     $("#IdBeneficiario").val()
                 +'</td >';

        cols += '<td>'
                    + $("#NomeBeneficiario").val() +
               '</td>';
        cols += '<td>'
                    + $("#CpfBeneficiario").val() +
                '</td>';

        cols += '<td>';
        cols += '<button class="btn btn-sm btn-danger" onclick="deleteRow(this)" type="button">Excluir</button>';
        cols += '</td>';

        cols += '<td>';
        cols += '<button class="btn btn-sm btn-success" onclick="editTableRow(this)" type="button">Editar</button>';
        cols += '</td>';

        newRow.append(cols);

        $("#beneficiarios-table").append(newRow);

        $("#CpfBeneficiario").val('');
        $("#NomeBeneficiario").val('');
        $("#IdBeneficiario").val('');
        $("#NomeBeneficiario").focus();

        return false;
    });
});

function editTableRow(trow) {
    var row = trow.parentNode.parentNode;

    $("#IdBeneficiario").val(row.cells[0].outerText);
    $("#NomeBeneficiario").val(row.cells[1].outerText);
    $("#CpfBeneficiario").val(row.cells[2].outerText);

    row.parentNode.removeChild(row);
};
