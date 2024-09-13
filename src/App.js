import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '@pages/LoginPage';
import HomePage from '@components/HomePage';

const AppRoutes = () => {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
