import { combineReducers } from "redux";
import photoReducer from "./photos/photos.reducer";
import cartReducer from "./cart/cart.reducer";

const rootReducer = combineReducers({
  photos: photoReducer,
  products: cartReducer,
});

export default rootReducer;
