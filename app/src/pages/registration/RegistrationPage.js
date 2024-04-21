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
            const response = await axios.post('/register', {
                email: email,
                password: password
            },
            { withCredentials: true });

            console.log(response);
            // window.location.href = '/login';  // Redirect to login after registration
			navigateTo('/login'); // Use the injected navigation function
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