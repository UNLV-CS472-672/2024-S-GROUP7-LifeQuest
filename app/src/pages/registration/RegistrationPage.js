import axios from "axios";
import { useState } from 'react';
import styles from "./RegistrationPage.module.css";  // Importing the CSS for styling

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            axios.defaults.baseURL = 'http://localhost:9000';
            const response = await axios.post('/users', {
                email: email,
                password: password
            },
            { withCredentials: true })

            //Got a response, now let's handle it

            .then(function (response) {
                // Registration successful! Let's go to the login page.
                window.location.href = '/login'
                console.log(response);

            })
            .catch(function (error) {
                // Uh oh, bad registration! Let's see what went wrong.
                console.log(error);
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.login_container}>
		<img className="image" src="/logo.png" alt="Logo"></img>
            <h1>LifeQuest</h1>
            <form onSubmit={handleSubmit} className={styles.login_form}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className={styles.oval} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={styles.oval} />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className={styles.oval} />
                <button type="submit" className={styles.btn}>Register</button>
            </form>
            <button onClick={() => window.location.href = '/login'} className={styles.btn}>Return</button>
        </div>
    );
};

export default RegistrationPage;