import styles from "./Login.css"
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

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

            //Login, needs to be tested
            /*
            await axios.post("http//localhost:9000/login",{
                email, password
            })
            .then(result => {
                console.log(result)
                if(result.data === "Success") {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
            */
        }
        catch(foo){
            console.log(foo)
        }
        
    }

    return (
    <div className="login_container">
        <form onSubmit={sendSubmit} className="login_form">
            <label htmlFor ="email">Email</label>
            <input value={email} type="email" onChange={(foo) => setEmail(foo.target.value)} placeholder="Email" name="Email" id="Email" />
            <label htmlFor ="password">Password</label>
            <input value={password} type="password" onChange={(foo) => setPassword(foo.target.value)} placeholder="********" name="password" id="password" />
            <button className="login_button" type="submit">Log In</button>
        </form>
        <button className="register_button">Don't have a LifeQuest account? <br/> Register here.</button>
    </div>
  );
};

export default Login;
