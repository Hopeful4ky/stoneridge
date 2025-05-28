import crest from '../assets/crest.png';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

function Login({ language, setLanguage, handleLogin, isLoading }) {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md card-hover">
                <img src={crest} alt="StoneRidge Crest" className="mx-auto mb-6 w-28 animate-fade-in" />
                <h1 className="text-4xl text-center text-navy mb-8 font-playfair tracking-wide">
                    STONE RIDGE SADDLEBREDS
                </h1>
                <div className="flex justify-center mb-6 gap-3">
                    <button
                        className={`px-5 py-2 rounded-full ${
                            language === 'English' ? 'bg-burgundy text-white' : 'bg-gray-200'
                        } btn-hover shadow-md transition-all duration-300`}
                        style={{ backgroundImage: language === 'English' ? 'linear-gradient(to bottom, #800020, #a0002a)' : 'none' }}
                        onClick={() => setLanguage('English')}
                    >
                        English
                    </button>
                    <button
                        className={`px-5 py-2 rounded-full ${
                            language === 'Español' ? 'bg-burgundy text-white' : 'bg-gray-200'
                        } btn-hover shadow-md transition-all duration-300`}
                        style={{ backgroundImage: language === 'Español' ? 'linear-gradient(to bottom, #800020, #a0002a)' : 'none' }}
                        onClick={() => setLanguage('Español')}
                    >
                        Español
                    </button>
                </div>
                <div className="relative mb-4">
                    <UserIcon className="absolute top-3 left-3 h-5 w-5 text-silver" />
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full pl-10 pr-4 py-3 rounded-full border border-silver input-focus focus:shadow-md transition-all duration-300"
                    />
                </div>
                <div className="relative mb-6">
                    <LockClosedIcon className="absolute top-3 left-3 h-5 w-5 text-silver" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-3 rounded-full border border-silver input-focus focus:shadow-md transition-all duration-300"
                    />
                </div>
                <button
                    className="w-full bg-burgundy text-white py-3 rounded-full btn-hover shadow-md flex justify-center items-center disabled:opacity-50"
                    style={{ backgroundImage: 'linear-gradient(to bottom, #800020, #a0002a)' }}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        'Log In'
                    )}
                </button>
            </div>
        </div>
    );
}

export default Login;