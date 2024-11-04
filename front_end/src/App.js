import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UserForm from './components/UserForm';
import ItemForm from './components/ItemForm';
import HeroSection from './components/HeroSection';
import ResultPage from './components/ResultPage';
import Reports from './components/Reports';
// import Report from './components/Report';

function App() {
    const location = useLocation();

    return (
        <div className="flex">
            {/* Conditionally render Sidebar */}
            {location.pathname !== '/' && location.pathname !== '/result' && <Sidebar />}
            
            {/* Main content occupies remaining space */}
            <div className="flex-1 p-6">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user" element={<UserForm />} />
                    <Route path="/items" element={<ItemForm />} />
                    <Route path="/" element={<HeroSection />} /> {/* Default home route */}
                    <Route path="/report" element={<Reports />} />
                    <Route path="/result" element={<ResultPage />} /> {/* Result route */}
                </Routes>
            </div>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
