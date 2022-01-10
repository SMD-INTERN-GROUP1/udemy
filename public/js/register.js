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

var myInput = document.getElementById("password");
var inputUsername = document.getElementById("username");
var inputPassword = document.getElementById("password");
var inputConfirmPassword = document.getElementById("confirm-password");

//validation username
$('#usercheck').hide();
inputUsername.onkeyup = function() {
  var usernameValue = $('#username').val();

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

//validation password
$('#usercheck-password').hide();
inputPassword.onkeyup = function() {
  var usernameValue = $('#password').val();

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
    $('#confirm-password').val();
  let passwrdValue =
    $('#password').val();
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

//validation email
const email = document.getElementById('email');
email.addEventListener('blur', ()=>{
  // let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let valueEmail = email.value;
  if(regex.test(valueEmail)){
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