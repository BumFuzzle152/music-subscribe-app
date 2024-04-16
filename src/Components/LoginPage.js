import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Import the styles
import { toast } from 'react-toastify';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url_login = "https://7kctph3cm2.execute-api.us-east-1.amazonaws.com/Production/login-user";

        try{            
            const response = await fetch(url_login, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                
                body: JSON.stringify({"email":email, "password":password})
            });
            const data = await response.json();
            if (data.statusCode == 200){
                setError(false); 
                const username = data.body.username;
                toast.success(data.body.reply,
                {
                    position: "top-center",
                    autoClose: 2000,
                    onClose:() => navigate('/main', { state:{ email, username } })
                });

            }else
            {
                setError(true);
                const err = await response.json();
                throw new Error(err.message || 'Failed to register!');
            }
        }catch(error){
            toast.error("Log in unsuccesful, Try Again!",
            {
                position: "top-center",
                autoClose: 3000
            });
            console.error("Error while registering user:-", error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
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
            <form onSubmit={handleSubmit} className="container">
                <div className="logo-background">
                    <img src="/images/Logo.png" alt="Auralux Logo" className="logo mb-4" />
                </div>
                <h2 className="text-center mb-4">Welcome to Auralux</h2>             
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="alert alert-danger">Email or Password is invalid</div>}
                <div className="mb-3 d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-secondary" onClick={handleRegister}>Register</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
