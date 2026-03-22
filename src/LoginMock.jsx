import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './Login.css';

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  username: z.string().min(8, "Username must be at least 8 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginMock = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [message, setMessage] = useState(''); 
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isLoginView ? loginSchema : signUpSchema),
    mode: "onChange"    
  });

  useEffect(() => {
    const existingData = localStorage.getItem('sprintSightUser');
    if (!existingData) {
      const fakeDatabaseUser = { username: 'admin123', password: 'password123' };
      localStorage.setItem('sprintSightUser', JSON.stringify(fakeDatabaseUser));
    }
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true); 
    setMessage('');
    setIsError(false);

    // MOCK API DELAY: Simulates a 1-second network request
    setTimeout(() => {
      try {
        if (isLoginView) {
          /* --- COMMENTED OUT REAL API ---
          const response = await fetch('https://sprintsight-back.onrender.com/login', { ... });
          */

          // --- MOCK LOGIN LOGIC ---
          const storedData = localStorage.getItem('sprintSightUser');
          const dbUser = JSON.parse(storedData);

          // Let's just allow any username/password combination for testing the flow easily
          // OR you can strict check: if (data.username === dbUser.username && data.password === dbUser.password)
          if (data.username && data.password) { 
            localStorage.setItem('sprintSightToken', 'fake-mock-jwt-token-12345'); 
            setIsError(false);
            setMessage('Mock Login successful! Redirecting...');
            setTimeout(() => { navigate('/dashboard'); }, 800); 
          } else {
            setIsError(true);
            setMessage('Invalid username or password.'); 
          }

        } else {
          /* --- COMMENTED OUT REAL API ---
          const response = await fetch('http://localhost:5000/api/signup', { ... });
          */

          // --- MOCK SIGNUP LOGIC ---
          const newUser = { username: data.username, password: data.password };
          localStorage.setItem('sprintSightUser', JSON.stringify(newUser));
          
          reset(); 
          setIsError(false);
          setMessage('Mock Account created successfully! Please log in.');
          setIsLoginView(true); 
        }
      } catch (error) {
        console.error("Mock API Error:", error);
        setIsError(true);
        setMessage('Network error.');
      } finally {
        setIsLoading(false); 
      }
    }, 1000); // 1 second fake delay
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setMessage('');
    reset(); 
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="logo-section">
          <img 
            src="/sprint-sight-logo.png" 
            alt="Sprint Sight Logo" 
            className="logo-image" 
            onError={(e) => { e.target.onerror = null; }}
          />
          <h1 className="app-title">Sprint Sight</h1>
          <h3 style={{ color: '#1a2238', marginTop: '1rem', fontWeight: '600' }}>
            {isLoginView ? 'Welcome Back' : 'Create an Account'}
          </h3>
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="text"
              placeholder="username"
              className={`custom-input ${errors.username ? 'input-error' : ''}`}
              {...register("username")} 
            />
            {errors.username && <span className="error-text">{errors.username.message}</span>}
          </div>
          
          <div className="input-group">
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className={`custom-input ${errors.password ? 'input-error' : ''}`}
                {...register("password")} 
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </div>
          
          {message && (
            <p style={{ color: isError ? '#e74c3c' : '#2ecc71', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
              {message}
            </p>
          )}

          <button type="submit" className="btn btn-login" disabled={isLoading}>
            {isLoading 
              ? 'Please wait...' 
              : (isLoginView ? 'Login' : 'Create Account')
            }
          </button>
        </form>

        <div className="signup-section">
          <p>{isLoginView ? "Don't have an account yet?" : "Already have an account?"}</p>
          <button type="button" className="btn btn-signup" onClick={toggleView}>
            {isLoginView ? 'Sign up' : 'Back to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginMock;