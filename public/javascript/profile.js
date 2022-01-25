// page change password
$("#btn-cancel").click(function() {
  clearInput();
});

function clearInput() {
  $("#current-password").val("");
  console.log($("#current-password").val(""))
  $("#new-password").val("");
  $("#re-type-password").val("");

  $('#current-password-check').hide();
  $('#new-password-check').hide();
  $('#re-type-password-check').hide();
}

//validation lenght password and confirm password
let inputCurrentPassword = document.getElementById("current-password");
let inputNewPassword = document.getElementById("new-password");
let inputReTypePassword = document.getElementById("re-type-password");

$('#current-password-check').hide();
inputCurrentPassword.onkeyup = function() {
  let currentPassword = $('#current-password').val();

  if((currentPassword.length < 8)) {
      $('#current-password-check').show();
      $('#current-password-check').html("* Length of password must be 8 ");
  } else {
      $('#current-password-check').hide();
  }
}

$('#new-password-check').hide();
inputNewPassword.onkeyup = function() {
  let newPassword = $('#new-password').val();

  if((newPassword.length < 8)) {
      $('#new-password-check').show();
      $('#new-password-check').html("* Length of password must be 8 ");
  } else {
      $('#new-password-check').hide();
  }
}

//validation confirm password
$('#re-type-password-check').hide();
inputReTypePassword.onkeyup = (function () {
  validateConfirmPasswrd();
});

function validateConfirmPasswrd() {
  let confirmPasswordValue = $('#re-type-password').val();
  let passwrdValue = $('#new-password').val();
  if (passwrdValue !== confirmPasswordValue) {
      $('#re-type-password-check').show();
      $('#re-type-password-check').html("* Password didn't match");
      $('#re-type-password-check');
  } else {
      $('#re-type-password-check').hide();
  }
}