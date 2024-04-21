import styles from "./Login.css"
import axios from "axios"
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function sendSubmit(foo) {
        
        //No empty values allowed for login.
        foo.preventDefault();

        axios.defaults.baseURL = 'http://localhost:9000';

        /*
        Axios makes a post request to the address, feeding in the user inputed
        credentials. Await for a response.
        */
        const response = await axios.post('/login/submit', {
            email: email,
            password: password
        },
        { withCredentials: true //Required for cookies.
        })

        //Got a response, now let's handle it

        .then(function (response) {
            // Login successful! Let's go to the home page.
            window.location.href = '/home'
            console.log(response);

        })
        .catch(function (error) {
            // Uh oh, bad login! Let's see what went wrong.
            console.log(error);
        })
        
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
                <a className="forgot_password" href="/signup">Forgot password?</a>
                {/* The login button */}
                <button className="btn" type="submit">Login</button>
            </form>
            {/* The signup button */}
            <a className="signup_link" href="/register"><button className="btn">Signup</button></a>
    </div>
  );
};

export default Login;
