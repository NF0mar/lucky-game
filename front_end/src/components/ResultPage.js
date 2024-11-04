import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const backToLuckygame = () => {
        navigate('/');
    };

    const message = location.state?.message || "No result available";
    const item = location.state?.item;
    const isWin = !!item?.itemName; // Check if the user won by seeing if itemName exists

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-indigo-950 text-white">
            <h1 className={`text-5xl mt-10 font-extrabold mb-4 ${isWin ? 'text-yellow-300' : 'text-red-400'}`}>
                {isWin ? "🎉 Congratulations 🎉" : "😢 Sorry 😢"}
            </h1>
            <div
                className={`p-8 rounded-lg shadow-2xl text-center border-4 transform hover:scale-105 transition duration-300 ${
                    isWin ? 'bg-yellow-500 border-yellow-300' : 'bg-red-500 border-red-400'
                }`}
            >
                <p className="text-3xl font-semibold mb-4">{message}</p>
                
                {isWin && item?.image && (
                    <div>
                        <img
                            src={item.image}
                            alt={item.itemName ? `You won ${item.itemName}` : "Winning item"}
                            className="mt-4 rounded-lg shadow-lg border-4 border-yellow-300  ml-9"
                            style={{ width: '480px', height: 'auto' }}
                        />
                    </div>
                )}
            </div>
            <div>
                <button
                    type="button"
                    onClick={backToLuckygame}
                    className="w-full bg-gray-300 mt-20 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200 transform hover:scale-105 shadow-md"
                >
                    Back to Lucky Game
                </button>
            </div>
        </div>
    );
};

export default ResultPage;
