import { createSlice } from '@reduxjs/toolkit';

// Lấy thông tin giỏ hàng từ localStorage hoặc khởi tạo giỏ hàng rỗng
const savedCart = JSON.parse(localStorage.getItem('cart')) || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const initialState = savedCart;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * product.price; // Cập nhật tổng giá của sản phẩm này
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          totalPrice: product.price, // Tổng giá của sản phẩm khi được thêm lần đầu
        });
      }

      state.totalQuantity += 1; 
      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0); // Tính lại tổng tiền
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }

      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0); // Tính lại tổng tiền sau khi xóa
      localStorage.setItem('cart', JSON.stringify(state));
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price; // Cập nhật tổng giá của sản phẩm
        state.totalQuantity += 1;
      }

      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0); // Tính lại tổng tiền
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price; // Cập nhật tổng giá của sản phẩm
        state.totalQuantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= 1;
      }

      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0); // Tính lại tổng tiền
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
