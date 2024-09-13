import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from '@redux/productSlice';
import './HomePage.css';

const HomePage = () => {
  const fullName = useSelector((state) => state.user.fullName);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null); // Lưu trữ sản phẩm đang chỉnh sửa

  useEffect(() => {
    if (status === 'idle' && isLoggedIn) {
      dispatch(fetchProducts());
    }
  }, [status, isLoggedIn, dispatch]);

  // Thêm sản phẩm mới
  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ name: '', price: '', description: '', image: '' });
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  // Bắt đầu chỉnh sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Lưu sản phẩm sau khi chỉnh sửa
  const handleSaveProduct = () => {
    dispatch(updateProduct(editingProduct));
    setEditingProduct(null); // Reset form chỉnh sửa
  };

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <div>
          <h1 className="welcome-message">Chào mừng, {fullName}!</h1>

          {/* Form thêm và sửa sản phẩm */}
          <div className="form-container">
            <h3 className="form-title">{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
            <div className="form-fields">
              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
              />
              <button
                className="submit-button"
                onClick={editingProduct ? handleSaveProduct : handleAddProduct}
              >
                {editingProduct ? 'Lưu' : 'Thêm sản phẩm'}
              </button>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <h2 className="product-list-title">Danh sách sản phẩm:</h2>
          {status === 'loading' ? (
            <p>Loading sản phẩm...</p>
          ) : (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price} VND</p>
                  <button className="edit-button" onClick={() => handleEditProduct(product)}>
                    Chỉnh sửa
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                    Xóa
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
