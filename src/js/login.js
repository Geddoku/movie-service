const root = document.getElementById('root');
userData = [];
let username, email, password;

class UI {
    static displayLoginForm() {
        let loginSection = document.createElement('div');
        loginSection.className = 'container';
        loginSection.innerHTML = `
                                    <form class="register-form"> 
                                        <h2>Login</h2>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Username</label>
                                            <input type="name" class="form-control" id="loginUsername" aria-describedby="emailHelp" autocomplete=off>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="loginPassword" autocomplete=off>
                                        </div>
                                        <a href="#"><button type="button" class="btn btn-outline-light" id="login">Log In</button></a>
                                        <a href="./register.html"><button type="button" class="btn btn-outline-light" id="reg-login">Go to Register</button></a>
                                    </form>`;
        root.append(loginSection);
    }
}

class DL {
    static login() {
        UI.displayLoginForm();
        DL.userParse();
    }

    static userParse() {
        userData = JSON.parse(localStorage.getItem(('user')));

        username = userData[0]['username'];
        email = userData[0]['email'];
        password = userData[0]['password'];

        let userDataList = [username, email, password];

        document.getElementById('login').addEventListener('click', function(event) {
            event.preventDefault();

            let inputUsername = document.getElementById('loginUsername').value;
            let inputPassword = document.getElementById('loginPassword').value;
            
            if (inputUsername === userDataList[0] && inputPassword === userDataList[2]) {
                setTimeout(() => {
                    window.location.replace("http://127.0.0.1:5501/src/index.html");
                }, 500);
            }
        });

        console.log(userDataList);
    }
}

DL.login();
