import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProducts: (state) => {
      state.product = [];
    }
  },
});

export const { setProduct, clearProducts } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProduct = (state) => state.product.product;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/* export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
}; */

export default productSlice.reducer;
