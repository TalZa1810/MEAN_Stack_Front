function validateInput() {
    let name = $('#name').val();
    let username = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();

    let data = { name : name, username: username, email: email, password: password};

    let promise = new Promise((fulfill, reject)=> {
        fulfill($.post( '/users/register' ,data));
        reject(new Error('Error Happened with inserting user'));
    });

    promise.then(onSuccess, onReject);
}

function onReject(error) {
    $("#input-msg").append($("<p></p>").text('Error registered'));
    console.log(error.message);
}

function onSuccess() {
    $("#input-msg").append($("<p></p>").text("User registered"));
    console.log('User registered');
}


function validateEmail(email) {

    let atPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");

    if (atPos < 1 || ( dotPos - atPos < 2 ))
    {
        alert("Please enter correct email ID")
        document.myForm.EMail.focus() ;
        return false;
    }
    return true ;
}


/*
 function checkForm(name, username, email, password) {
 if(username.value == "") {
 alert("Error: Username cannot be blank!");
 username.focus();
 return false;
 }
 let re = /^\w+$/;
 if(!re.test(username.value)) {
 alert("Error: Username must contain only letters, numbers and underscores!");
 username.focus();
 return false;
 }

 if(form.pwd1.value != "" && form.pwd1.value == form.pwd2.value) {
 if(form.pwd1.value.length < 6) {
 alert("Error: Password must contain at least six characters!");
 form.pwd1.focus();
 return false;
 }
 if(form.pwd1.value == form.username.value) {
 alert("Error: Password must be different from Username!");
 form.pwd1.focus();
 return false;
 }
 re = /[0-9]/;
 if(!re.test(form.pwd1.value)) {
 alert("Error: password must contain at least one number (0-9)!");
 form.pwd1.focus();
 return false;
 }
 re = /[a-z]/;
 if(!re.test(form.pwd1.value)) {
 alert("Error: password must contain at least one lowercase letter (a-z)!");
 form.pwd1.focus();
 return false;
 }
 re = /[A-Z]/;
 if(!re.test(form.pwd1.value)) {
 alert("Error: password must contain at least one uppercase letter (A-Z)!");
 form.pwd1.focus();
 return false;
 }
 } else {
 alert("Error: Please check that you've entered and confirmed your password!");
 form.pwd1.focus();
 return false;
 }

 alert("You entered a valid password: " + form.pwd1.value);
 return true;
 }

*/