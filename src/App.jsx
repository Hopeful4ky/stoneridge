import { useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [language, setLanguage] = useState('English');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div>
            {isLoggedIn ? (
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Login
                    language={language}
                    setLanguage={setLanguage}
                    handleLogin={handleLogin}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}

export default App;