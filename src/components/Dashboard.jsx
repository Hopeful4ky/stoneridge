import { useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import {
    UserGroupIcon,
    ClipboardIcon,
    CalendarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';

function Dashboard({ setIsLoggedIn }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const metrics = [
        { title: 'Total Horses', value: 24, icon: UserGroupIcon },
        { title: 'Pending Tasks', value: 8, icon: ClipboardIcon },
        { title: 'Today’s Events', value: 12, icon: CalendarIcon },
        { title: 'Active Staff', value: 6, icon: UsersIcon },
    ];

    const schedule = [
        { time: '06:00', task: 'Morning Feed', details: 'All Horses • Maria Rodriguez', color: 'bg-silver' },
        { time: '08:00', task: 'Training Session', details: 'Thunder Bay • John Thompson', color: 'bg-navy' },
        { time: '10:00', task: 'Lesson - Beginner', details: 'Midnight Star • Sarah Wilson', color: 'bg-burgundy' },
        { time: '14:00', task: 'Veterinary Check', details: 'Golden Dawn • Dr. Smith', color: 'bg-navy' },
    ];

    const tasks = [
        { task: 'Clean Stalls', assigned: 'Maria • Today', priority: 'High', color: 'bg-burgundy' },
        { task: 'Order Feed Supplies', assigned: 'John • Yesterday', priority: 'Overdue', color: 'bg-red-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsLoggedIn={setIsLoggedIn} />
            <div className="md:ml-64 p-6 max-w-7xl mx-auto">
                <h2 className="text-3xl text-navy mb-6 font-playfair tracking-wide">Dashboard Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {metrics.map((item) => (
                        <div
                            key={item.title}
                            className="bg-white p-6 rounded-2xl shadow-md card-hover flex items-center transition-all duration-300"
                            style={{ backgroundImage: 'linear-gradient(to bottom, #f5f5f5, #e5e5e5)' }}
                        >
                            <item.icon className="h-10 w-10 text-navy mr-4" />
                            <div>
                                <h3 className="text-lg text-navy font-playfair">{item.title}</h3>
                                <p className="text-2xl font-semibold">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-xl text-navy mb-4 font-playfair">Today’s Schedule</h3>
                        {schedule.map((item) => (
                            <div key={item.time} className="flex items-center p-3 border-b transition-all duration-200 hover:bg-gray-50">
                                <div className={`w-2 h-8 ${item.color} rounded mr-3`}></div>
                                <div>
                                    <p className="font-semibold">{item.time} - {item.task}</p>
                                    <p className="text-sm text-gray-600">{item.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-xl text-navy mb-4 font-playfair">Urgent Tasks</h3>
                        {tasks.map((item) => (
                            <div key={item.task} className="flex items-center p-3 border-b transition-all duration-200 hover:bg-gray-50">
                                <input
                                    type="checkbox"
                                    className="mr-3 checkbox-anim h-5 w-5 text-burgundy rounded focus:ring-burgundy"
                                />
                                <div className={`w-2 h-8 ${item.color} rounded mr-3`}></div>
                                <div>
                                    <p className="font-semibold">{item.task}</p>
                                    <p className="text-sm text-gray-600">{item.assigned} • {item.priority}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;