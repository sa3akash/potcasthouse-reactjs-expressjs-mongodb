import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  avater: ''
}

export const ActivateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvater: (state, action) => {
      state.avater = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName, setAvater } = ActivateSlice.actions;

export default ActivateSlice.reducer;