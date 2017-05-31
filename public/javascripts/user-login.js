function userLogin() {

    let username = $('#username').val();
    let password = $('#password').val();

    const user = { username, password};

    let promise = new Promise((fulfill, reject)=> {
        fulfill($.post( '/users/authenticate' ,user));
        reject(new Error('Error Happened with inserting user'));
    });

    promise.then(onSuccess, onReject);
}


function onReject(error) {
    $("#input-msg").append($("<p></p>").text(error.message));
    console.log(error.message);
}

function onSuccess() {
    $("#input-msg").append($("<p></p>").text("User Login"));
    console.log('User registered');
}