import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Role = 'developer' | 'manager';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  role: Role | null | string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  role: null,
};

// Hardcoded users
const users = [
  { username: 'khushboo', password: 'khush@123', role: 'developer' },
  { username: 'fealty', password: 'feal@123', role: 'manager' },
];

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      const foundUser = users.find(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );

      if (foundUser) {
        state.isAuthenticated = true;
        state.username = foundUser.username;
        state.role = foundUser.role;
      } else {
        throw new Error('Invalid credentials');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
