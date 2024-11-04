import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
    const [winners, setWinners] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch winner data from the API
    const handleGetWinner = () => {
        axios.get("http://localhost:5000/api/items")
            .then((res) => {
                const data = res.data.map(winner => ({
                    ...winner,
                    number: parseInt(winner.number, 10) || 0, // Ensure number field is converted to an integer
                }));
                setWinners(data);
            })
            .catch((error) => {
                console.error("Error fetching winners:", error);
            });
    };

    // Fetch user data from the API
    const handleGetUsers = () => {
        axios.get("http://localhost:5000/api/users")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    useEffect(() => {
        handleGetWinner();
        handleGetUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex space-x-5">
                <i className="fas fa-envelope text-2xl"></i>
                <i className="fas fa-bell text-2xl"></i>
            </div>
            <div className="flex justify-center mt-10">
                <div className="w-[850px] ml-[16em] bg-white shadow-lg rounded-lg overflow-hidden">
                    <h2 className="text-3xl font-semibold text-center text-blue-600 py-4 border-b border-gray-200">Reports</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-100 border-b text-left text-gray-600 font-bold uppercase">User Name</th>
                                <th className="px-6 py-3 bg-gray-100 border-b text-left text-gray-600 font-bold uppercase">User Phone</th>
                                <th className="px-6 py-3 bg-gray-100 border-b text-left text-gray-600 font-bold uppercase">Item Name</th>
                                <th className="px-6 py-3 bg-gray-100 border-b text-left text-gray-600 font-bold uppercase">Item Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors">
                                    <td className="px-6 py-4 border-b text-gray-700">{user.name}</td>
                                    <td className="px-6 py-4 border-b text-gray-700">{user.phone}</td>
                                    <td className="px-6 py-4 border-b text-gray-700">{winners[index]?.itemName || "N/A"}</td>
                                    <td className="px-6 py-4 border-b text-gray-700">{winners[index]?.number || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Reports;
