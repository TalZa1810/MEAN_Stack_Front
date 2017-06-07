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

