import crest from '../assets/crest.png';
import { Bars3Icon } from '@heroicons/react/24/outline';

function Header({ toggleSidebar }) {
    return (
        <header className="sticky top-0 bg-gradient-to-b from-navy to-[#1a4971] text-white p-4 shadow-md z-10">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center">
                    <img src={crest} alt="StoneRidge Crest" className="w-10 mr-3" />
                    <h1 className="text-2xl font-playfair tracking-wide">STONE RIDGE SADDLEBREDS</h1>
                </div>
                <button className="md:hidden btn-hover" onClick={toggleSidebar}>
                    <Bars3Icon className="h-8 w-8" />
                </button>
            </div>
        </header>
    );
}

export default Header;