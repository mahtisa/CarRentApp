import { ADD_LIKE, CARS_FILTER, FETCH_CARS_FAILUR, FETCH_CARS_REQUEST, FETCH_CARS_SUCCESS, FILTER_CAR } from "./carsType"

import axios from "axios"

const fetchCarsSuccess = (cars)=>{
    return{
        type: FETCH_CARS_SUCCESS,
        payload: cars
    }
}
const fetchCarsFailur = (error)=>{
    return{
        type: FETCH_CARS_FAILUR,
        payload: error
    }
}
const fetchCarsRequest = ()=>{
    return{
        type: FETCH_CARS_REQUEST
    }
}
export const addLike = (id)=>{
    return{
        type: ADD_LIKE,
        payload: id
    }
}
const carsFetch = (dispatch)=>{
    return (dispatch)=>{
        dispatch(fetchCarsRequest());
        axios.get("http://localhost:3002/cars").then((res)=>{
            dispatch(fetchCarsSuccess(res.data))
        }).catch((error)=>{
            dispatch(fetchCarsFailur(error.message));
        })
        
    }
}
export const carsFilter = (filterItem)=>{
    return{
        type: CARS_FILTER,
        payload : filterItem
    }
}

export default carsFetch;
