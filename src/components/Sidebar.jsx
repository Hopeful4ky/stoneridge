import {
    HomeIcon,
    UserGroupIcon,
    CalendarIcon,
    ClipboardIcon,
    ChartBarIcon,
    ChatBubbleLeftIcon,
    CogIcon,
} from '@heroicons/react/24/outline';
import crest from '../assets/crest.png';

function Sidebar({ isOpen, toggleSidebar, setIsLoggedIn }) {
    const navItems = [
        { name: 'Dashboard', icon: HomeIcon },
        { name: 'Horses', icon: UserGroupIcon },
        { name: 'Schedule', icon: CalendarIcon },
        { name: 'Tasks', icon: ClipboardIcon },
        { name: 'Staff', icon: UserGroupIcon },
        { name: 'Reports', icon: ChartBarIcon },
        { name: 'Messages', icon: ChatBubbleLeftIcon },
        { name: 'Settings', icon: CogIcon },
    ];

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-navy text-white p-4 transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 z-20 shadow-lg`}
        >
            <div className="flex items-center mb-6">
                <img src={crest} alt="StoneRidge Crest" className="w-10 mr-2" />
                <h2 className="text-xl font-playfair tracking-wide">STONE RIDGE SADDLEBREDS</h2>
            </div>
            <ul>
                {navItems.map((item) => (
                    <li
                        key={item.name}
                        className="p-3 sidebar-item rounded cursor-pointer flex items-center transition-all duration-200"
                    >
                        <item.icon className="h-6 w-6 mr-2 text-silver" />
                        {item.name}
                    </li>
                ))}
            </ul>
            <div className="absolute bottom-4">
                <p className="text-silver font-semibold">John Manager</p>
                <button
                    className="text-silver hover:text-white btn-hover mt-2"
                    onClick={() => setIsLoggedIn(false)}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;