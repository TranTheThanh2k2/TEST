import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import HomePage from '@components/HomePage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
