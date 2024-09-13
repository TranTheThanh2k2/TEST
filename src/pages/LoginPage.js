import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@redux/userSlice';
import { User, Lock, ArrowRight } from 'lucide-react';
import './LoginPage.css';  

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);  

    try {
      const resultAction = await dispatch(loginUser({ username, password }));
      setIsLoading(false); 
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/home');  
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setError('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Đăng nhập</h1>
        
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              autoComplete="username"
              required 
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              autoComplete="current-password"  
              required 
            />
          </div>
          <button
            type="submit"
            className={`login-button ${isLoading ? 'login-button-disabled' : ''}`}
            disabled={isLoading} 
          >
            {isLoading ? (
              <span>Đang đăng nhập...</span>
            ) : (
              <>
                <span>Đăng nhập</span>
                <ArrowRight className="button-icon" size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
