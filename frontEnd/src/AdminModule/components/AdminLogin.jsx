import { useState } from 'react';
import api from '../../api';
import styles from './AdminLogin.module.css';

const AdminLogin = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/api/admin/login', { username, password });
            onLoginSuccess();
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className={styles.adminLoginContainer}>
            <form onSubmit={handleLogin} className={styles.adminLoginForm}>
                <h2>Admin Login</h2>
                <div className={styles.formGroup}>
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className={styles.btnPrimary}>Login</button>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;