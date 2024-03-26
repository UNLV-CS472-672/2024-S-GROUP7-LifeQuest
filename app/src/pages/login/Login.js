import styles from "./Login.css"
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendSubmit = (foo) => {
        foo.preventDefault();
        console.log(email);
        console.log(password);
    }

    return (
    <div className="login_container">
        <form onSubmit={sendSubmit} className="login_form">
            <label for="email">Email</label>
            <input value={email} type="email" onChange={(foo) => setEmail(foo.target.value)} placeholder="Email" name="Email" id="Email" />
            <label for="password">Password</label>
            <input value={password} type="password" onChange={(foo) => setPassword(foo.target.value)} placeholder="********" name="password" id="password" />
            <button class="login_button" type="submit">Log In</button>
        </form>
        <button class="register_button">Don't have a LifeQuest account? <br/> Register here.</button>
    </div>
  );
};

export default Login;
