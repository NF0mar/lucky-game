import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaBox, FaInfoCircle, FaChartLine, FaFileAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, route: '/dashboard' },
        { name: 'User', icon: <FaUser />, route: '/user' },
        { name: 'Items', icon: <FaBox />, route: '/items' },
        // { name: 'About Us', icon: <FaInfoCircle />, route: '/about-us' },
        { name: 'Report', icon: <FaChartLine />, route: '/report' },
        // { name: 'Report Type', icon: <FaFileAlt />, route: '/report-type' },
        { name: 'Log Out', icon: <FaCog />, route: '/settings' }, // Settings added here
    ];

    return (
        <aside className="w-64 h-screen bg-gray-900 text-gray-200 p-5 flex flex-col shadow-lg">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-blue-400">Admin</h2>
                <img
                    src="https://i.pravatar.cc/150?img=5"
                    alt="User"
                    className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
                />
                <h3 className="mt-3 text-xl font-semibold">Sam ayr</h3>
                <p className="text-sm text-gray-400">Active</p>
            </div>
            
            <div className="space-y-6">
                <h4 className="text-gray-400 uppercase text-xs font-semibold tracking-wider">Menu</h4>
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.route}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition duration-200 ${
                                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-blue-500 hover:text-white'
                            }`
                        }
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
