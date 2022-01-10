// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

var myInput = document.getElementById("exampleInputPassword1");
var inputUsername = document.getElementById("exampleInputUsername1");
var inputPassword = document.getElementById("exampleInputPassword1");
var inputConfirmPassword = document.getElementById("exampleInputPassword2");

//validation username
$('#usercheck').hide();
inputUsername.onkeyup = function() {
  var usernameValue = $('#exampleInputUsername1').val();

  if((usernameValue.length < 6)||
        (usernameValue.length > 15)) {
      $('#usercheck').show();
      $('#usercheck').html("* Length of username must be between 6 and 15");
      usernameError = false;
      return false;
    }
    else {
      $('#usercheck').hide();
    }
}

//Password
$('#usercheck-password').hide();
inputPassword.onkeyup = function() {
  var usernameValue = $('#exampleInputPassword1').val();

  if((usernameValue.length < 8)) {
      $('#usercheck-password').show();
      $('#usercheck-password').html("* Length of password must be 8");
      usernameError = false;
      return false;
    }
    else {
      $('#usercheck-password').hide();
    }
}

//validation confirm password
$('#usercheck-confirm-password').hide();
inputConfirmPassword.onkeyup = (function () {
  validateConfirmPasswrd();
});

function validateConfirmPasswrd() {
  let confirmPasswordValue =
    $('#exampleInputPassword2').val();
  let passwrdValue =
    $('#exampleInputPassword1').val();
  if (passwrdValue != confirmPasswordValue) {
    $('#usercheck-confirm-password').show();
    $('#usercheck-confirm-password').html("* Password didn't Match");
    $('#usercheck-confirm-password');
    confirmPasswordError = false;
    return false;
  } else {
    $('#usercheck-confirm-password').hide();
  }
}

const email = document.getElementById('email');
email.addEventListener('blur', ()=>{
  let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  let s = email.value;
  if(regex.test(s)){
    email.classList.remove(
        'is-invalid');
    emailError = true;
    }
    else{
      email.classList.add(
        'is-invalid');
      emailError = false;
    }
});
