import {
  ADD_LIKE,
  FETCH_CARS_FAILUR,
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FILTER_CAR,
} from "./carsType";

const initialState = {
  loading: false,
  error: "",
  data: [],
};
const carReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_CARS_SUCCESS:
      return { loading: false, error: "", data: actions.payload };
    case FETCH_CARS_FAILUR:
      return { loading: false, error: actions.payload, data: [] };
    case FETCH_CARS_REQUEST:
      return { loading: true, error: "", data: [] };
    case ADD_LIKE:
      const newData = [...state.data];
      const index = newData.findIndex(
        (c) => parseInt(c.id) === parseInt(actions.payload)
      );
      newData[index].likeCount++;
      return { loading: false, error: "", data: newData };
    default:
      return state;
  }
};

export default carReducer;
