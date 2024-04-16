import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import '../index.css';
import NavBar from './NavBar';
import QueryForm from './QueryForm';
import SubscriptionArea from './SubscribptionArea';

function MainPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentView, setCurrentView] = useState('USER'); // Default view
    const { email = "", username = "Guest" } = location.state || {};

    const handleLogout = () => {
        // Handle logout logic here
        navigate('/login');
    };

    const switchView = (view) => {
        setCurrentView(view);
    };

    return (
        <div className="app-container">
            <NavBar onSwitchView = {switchView} />
            <div className="content-container">
                {currentView === 'USER' && (
                    <div>
                        <h2>Welcome, {username}</h2>
                    </div>
                )}
                {currentView === 'QUERY' && <QueryForm email={email}/>}
                {currentView === 'SUBSCRIPTION' && <SubscriptionArea email={email}/>}
            </div>
        </div>
    );
}

export default MainPage;
