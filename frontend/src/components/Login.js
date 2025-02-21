import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        const data = await response.json();
        if (response.ok) {
            onLoginSuccess();
            navigate('/main');
        } else {
            console.error('Login failed:', data.error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;