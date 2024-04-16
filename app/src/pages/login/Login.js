import styles from "./Login.css"
import axios from "axios"
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function sendSubmit(foo) {
        
        foo.preventDefault();

        try{
            axios.defaults.baseURL = 'http://localhost:9000';

            await axios.get('/login')
            .then(function (response) {
            // handle success
            console.log(response);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
        }
        catch(foo){
            console.log(foo)
        }
        
    }

    return (
    <div className="login_container">
        {/* Our logo */}
        <img className="image" src="/logo.png" alt="Logo"></img>
            <h1>LifeQuest</h1>
            {/* The login form which is tied to function sendSubmit() */}
            <form onSubmit={sendSubmit} className="login_form">
                <input className="oval" value={email} type="email" onChange={(foo) => setEmail(foo.target.value)} placeholder="Email" name="Email" id="Email" />
                <input className="oval" value={password} type="password" onChange={(foo) => setPassword(foo.target.value)} placeholder="Password" name="Password" id="Password" />
                {/* The forgot password link */}
                <a className="forgot_password" href="url">Forgot password?</a>
                {/* The login button */}
                <button className="btn" type="submit">Login</button>
            </form>
            {/* The signup button */}
            <button className="btn">Signup</button>
    </div>
  );
};

export default Login;
