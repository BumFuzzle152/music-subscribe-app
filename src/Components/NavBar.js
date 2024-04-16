import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

function NavBar({ onSwitchView }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout operations
        navigate('/login');
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand">Auralux</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item" onClick={() => onSwitchView('USER')}>
                        <a className="nav-link">Home</a>
                    </li>
                    <li className="nav-item" onClick={() => onSwitchView('QUERY')}>
                        <a className="nav-link">Query</a>
                    </li>
                    <li className="nav-item" onClick={() => onSwitchView('SUBSCRIPTION')}>
                        <a className="nav-link">Subscription</a>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <button className="btn btn-outline-danger" onClick={handleLogout} type="submit">Logout</button>
                </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
