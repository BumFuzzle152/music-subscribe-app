import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { toast } from 'react-toastify';

function RegisterForm() {
    const navigate = useNavigate();  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const api_url='https://qhxxpekmo4.execute-api.us-east-1.amazonaws.com/Production/register-user';
        
        try{
            const response = await fetch(api_url, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"email":email, "username":username, "password":password})
            });
            const data = await response.json();
            if (data.statusCode != 500){
                toast.success("Registration successful! Redirecting to Login...",
                {
                    position: "top-center",
                    autoClose: 5000,
                    onClose:() => navigate('/login')
                });
            }else{
                const err = await response.json();
                throw new Error(err.message || 'Failed to register!');
            }
        }catch(error){
            toast.error("Registration unsuccessful! Email already exists...",
            {
                position: "top-center",
                autoClose: 5000
            });
            console.error("Error while registering user:-", error);
        }

        };

    return (
        <div style={{
            backgroundImage: 'url("/images/backgroundLoginPage.jpg")',
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh', 
            width: '220vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form onSubmit={handleRegister} className="container">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3 d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Register</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/login')}>Back to Login</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;

