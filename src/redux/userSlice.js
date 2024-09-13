import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/users", {
        params: { username, password },
      });

      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ token: user.token, fullName: user.fullName })
        );
        return user;
      } else {
        return rejectWithValue("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Có lỗi xảy ra");
    }
  }
);

// Kiểm tra localStorage để khôi phục trạng thái đăng nhập
const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  token: savedUser ? savedUser.token : null,
  fullName: savedUser ? savedUser.fullName : null,
  isLoggedIn: !!savedUser, // Kiểm tra xem người dùng có đăng nhập không dựa trên localStorage
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.fullName = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user"); // Xóa dữ liệu khỏi localStorage khi đăng xuất
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.fullName = action.payload.fullName;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
