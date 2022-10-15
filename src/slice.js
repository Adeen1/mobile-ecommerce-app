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
      return action.payload;
    },
  },
});
export default productSlice.reducer;
export const { setProduct } = productSlice.actions;
