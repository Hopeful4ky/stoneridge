import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex space-x-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={viteLogo} className="logo h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={reactLogo} className="logo react h-24 w-24" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Vite + React</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-600 dark:text-gray-300">
          Edit <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mt-8 text-center">
        Click on the Vite and React logos to learn more
      </p>
      <div className="mt-4 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
        🎉 Tailwind CSS v4 is now working!
      </div>
    </div>
  )
}

export default App
