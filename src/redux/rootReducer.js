import carReducer from "./cars/carsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cars: carReducer,
});

export default rootReducer;
