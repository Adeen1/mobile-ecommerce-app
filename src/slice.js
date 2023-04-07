import { createSlice } from "@reduxjs/toolkit";

const initialVal = {
  id: 0,
  img: "",
  seller: "adeen",
  name: "",
  price: 100,
  description: "",
};
const productSlice = createSlice({
  name: "product",
  initialState: initialVal,
  reducers: {
    setProduct: (state, action) => {
      state = action.payload.item;
      return { ...state };
    },
  },
});

const initialAuth = {
  authorized: {},
  data: {},
};
const authSlice = createSlice({
  name: "autherized",
  initialState: initialAuth,
  reducers: {
    changeVal: (state, action) => {
      state.data = action.payload;
    },
  },
});
const productReducer = productSlice.reducer;
const productAction = productSlice.actions;
const autherizedReducer = authSlice.reducer;
const autherizedAction = authSlice.actions;
// export default productSlice.reducer;
// export const { setProduct } = productSlice.actions;
export { productReducer, productAction, autherizedAction, autherizedReducer };
