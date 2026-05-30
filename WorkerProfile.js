import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkerProfile from './pages/WorkerProfile';
import RegisterWorker from './pages/RegisterWorker';
import './styles.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('helpzo_token');
  if (!token) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center card p-10 max-w-sm w-full">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="font-display font-bold text-xl text-stone-900 mb-2">Login Required</h2>
          <p className="text-stone-500 text-sm mb-6">You need to be logged in to access this page.</p>
          <a href="/login" className="btn-primary inline-block">Go to Login</a>
        </div>
      </div>
    );
  }
  return children;
};

// Footer component
const Footer = () => (
  <footer className="border-t border-stone-100 bg-white mt-auto">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="font-display font-bold text-stone-800">Help<span className="text-brand-600">zo</span></span>
      </div>
      <p className="text-stone-400 text-sm">© 2024 Helpzo. Connecting people with local pros.</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f8fffe]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/worker/:id" element={<WorkerProfile />} />
            <Route
              path="/register-worker"
              element={
                <ProtectedRoute>
                  <RegisterWorker />
                </ProtectedRoute>
              }
            />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
                  <div className="text-center">
                    <div className="text-7xl font-display font-extrabold text-stone-200 mb-4">404</div>
                    <h2 className="font-display font-bold text-2xl text-stone-800 mb-2">Page Not Found</h2>
                    <p className="text-stone-500 mb-6">The page you're looking for doesn't exist.</p>
                    <a href="/" className="btn-primary inline-block">← Back to Home</a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
