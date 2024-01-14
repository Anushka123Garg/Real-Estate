import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    currentUser: 0,
    loading: false,
    error: null,
  };

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload; //data we get
            state.loading = false;
            state.error =null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
  });

  export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;
  export default userSlice.reducer;