import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@redux/productSlice";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { logout } from "@redux/userSlice";

const HomePage = () => {
  const fullName = useSelector((state) => state.user.fullName);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle" && isLoggedIn) {
      dispatch(fetchProducts());
    }
  }, [status, isLoggedIn, dispatch]);

  const handleBuyProduct = (productName) => {
    alert(`Bạn đã mua thành công sản phẩm: ${productName}`);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };
  return (
    <div className="home-container">
      {isLoggedIn ? (
        <div>
          <h1>Chào mừng, {fullName}!</h1>
          <button className="logout-button" onClick={handleLogout}>
              Đăng xuất
            </button>
          <h2>Danh sách sản phẩm:</h2>

          {status === "loading" ? (
            <p>Loading sản phẩm...</p>
          ) : (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price} VND</p>
                  <button
                    className="buy-button"
                    onClick={() => handleBuyProduct(product.name)}
                  >
                    Mua ngay
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1>Bạn chưa đăng nhập!</h1>
      )}
    </div>
  );
};

export default HomePage;
