
showWarning = function (message, control) {
    if (control == null) control = 'message';
    $("." + control).children().remove();
    $("." + control).append('<div class="alert alert-warning"><button class="close"> × </button><i class="icon-fa-fw icon-fa icon-fa-warning"></i> <strong>AVISO:</strong> <label class="alert-message">' + message + '</label></div>');
};

showSuccess = function (message, control) {
    if (control == null) control = 'message';
    $("." + control).children().remove();
    $("." + control).append('<div class="alert alert-success"> <button class="close"> × </button> <i class="icon-fa-fw icon-fa icon-fa-check-square-o"></i> <strong>SUCESSO:</strong> <label class="alert-message">' + message + '</label></div>');
};

showError = function (message, control) {
    if (control == null) control = 'message';
    $("." + control).children().remove();
    $("." + control).append('<div class="alert alert-danger"> <button class="close"> × </button> <i class="icon-fa-fw icon-fa icon-fa-times-circle"></i> <strong>ERRO:</strong> <label class="alert-message">' + message + '</label></div>');
};