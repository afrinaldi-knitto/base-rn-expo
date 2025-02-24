import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetAuth: state => {
      state.username = '';
      state.password = '';
    },
  },
});

export const {setUsername, setPassword, resetAuth} = loginSlice.actions;

export default loginSlice.reducer;
