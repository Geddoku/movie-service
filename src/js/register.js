const root = document.getElementById('root');
userData = [];

class UI {
    static displayRegisterForm() {
        let registerSection = document.createElement('div');
        registerSection.className = 'container';
        registerSection.innerHTML = `
                                    <form class="register-form"> 
                                        <h2>Register</h2>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Username</label>
                                            <input type="name" class="form-control" id="inputUserName" aria-describedby="emailHelp" autocomplete=off>
                                            <small id="emailHelp" class="form-text text-muted">Type valid and unique username</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" autocomplete=off>
                                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="inputPassword" autocomplete=off>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                            <label class="form-check-label" for="exampleCheck1">Subscribe for mail's about new movies</label>
                                        </div>
                                        <a><button type="button" class="btn btn-outline-light" id="register">Register</button></a>
                                        <a href="./authorization.html"><button type="button" class="btn btn-outline-light" id="reg-login">Log In</button></a>
                                    </form>`;
        root.append(registerSection);
    }
}

class DL {
    static register() {
        DL.createUser();
    }

    static createUser() {
        UI.displayRegisterForm();
        DL.userRegistered();
    }

    static userRegistered() {
        document.getElementById('register').addEventListener('click', function(event) {
            event.preventDefault();
            let userName = document.getElementById('inputUserName').value;
            let userEmail = document.getElementById('inputEmail').value;
            let userPassword = document.getElementById('inputPassword').value;

            let USER = new User(userName, userEmail, userPassword);
            userData = [USER];
            localStorage.setItem('user', JSON.stringify(userData));
        });
    }
}

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

DL.register();
