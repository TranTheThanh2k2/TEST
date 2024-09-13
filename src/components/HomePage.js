import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from '@redux/productSlice';
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity } from '@redux/cartSlice'; 
import { logout } from '@redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const fullName = useSelector((state) => state.user.fullName);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formRef = useRef(null);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle' && isLoggedIn) {
      dispatch(fetchProducts());
    }
  }, [status, isLoggedIn, dispatch]);

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ name: '', price: '', description: '', image: '' });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveProduct = () => {
    dispatch(updateProduct(editingProduct));
    setEditingProduct(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="home-wrapper">
      {isLoggedIn ? (
        <div>
          <div className="home-header">
            <div className="cart-icon" onClick={handleCartClick}>
              <ShoppingCart size={32} />
              {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
            </div>
            <button className="btn-logout" onClick={handleLogout}>Đăng xuất</button>
          </div>

          <div ref={formRef} className="product-form">
            <h3 className="form-header">{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="input-box"
              />
              <input
                type="text"
                placeholder="Giá sản phẩm"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, price: e.target.value })
                    : setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="input-box"
              />
              <input
                type="text"
                placeholder="Mô tả sản phẩm"
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, description: e.target.value })
                    : setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="input-box"
              />
              <input
                type="text"
                placeholder="Link ảnh sản phẩm"
                value={editingProduct ? editingProduct.image : newProduct.image}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, image: e.target.value })
                    : setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="input-box"
              />
              <button
                className="btn-primary"
                onClick={editingProduct ? handleSaveProduct : handleAddProduct}
              >
                {editingProduct ? 'Lưu' : 'Thêm sản phẩm'}
              </button>
            </div>
          </div>

          <h2 className="product-title">Danh sách sản phẩm:</h2>
          {status === 'loading' ? (
            <p>Loading sản phẩm...</p>
          ) : (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price} VND</p>
                  <button className="btn-edit" onClick={() => handleEditProduct(product)}>
                    Chỉnh sửa
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>
                    Xóa
                  </button>
                  <button className="btn-add-cart" onClick={() => handleAddToCart(product)}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Modal giỏ hàng */}
          {isModalOpen && (
            <div className="cart-modal">
              <div className="cart-modal-content">
                <h2>Giỏ hàng của bạn</h2>
                {cartItems.length > 0 ? (
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng cộng</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                          </td>
                          <td>{item.name}</td>
                          <td>
                            <button className="cart-quantity-btn" onClick={() => handleDecrementQuantity(item.id)}>-</button>
                            {item.quantity}
                            <button className="cart-quantity-btn" onClick={() => handleIncrementQuantity(item.id)}>+</button>
                          </td>

                          <td>{item.price} VND</td>
                          <td>{item.totalPrice} VND</td>
                          <td>
                          <button className="btn-delete-cart" onClick={() => handleRemoveFromCart(item.id)}>
                            Xóa
                          </button>
                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Giỏ hàng trống</p>
                )}
                <button className="btn-close-modal" onClick={handleCloseModal}>
                  Đóng
                </button>
              </div>
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
