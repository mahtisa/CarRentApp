import {
  ADD_LIKE,
  CARS_FILTER,
  FETCH_CARS_FAILUR,
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
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
    case CARS_FILTER:
      const allData = [...state.data];
      let filterCars = []
      if(actions.payload.filterItemType === "type"){
         filterCars = allData.filter(c => c.type === actions.payload.filterItems);
      }else if(actions.payload.filterItemType === "capacity"){
        filterCars = allData.filter(c => c.feature.capacity === actions.payload.filterItems);
      }else{
        filterCars = allData.filter(c =>  c.price <= actions.payload.filterItems[1])
        if(filterCars.length === 0){
          filterCars = allData;
        }
      }
      return { loading: false, error: "", data: filterCars }
    default:
      return state;
  }
};

export default carReducer;
