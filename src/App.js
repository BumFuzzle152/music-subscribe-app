import React from 'react';
import LoginForm from './Components/LoginPage';
import RegisterForm from './Components/RegisterPage';
import MainPage from './Components/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const handleLoginSuccess = () =>{
    window.location.href = '/main' //path to main page
  };

  return (
    <Router>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/" element={<LoginForm />} /> {/* Default path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
