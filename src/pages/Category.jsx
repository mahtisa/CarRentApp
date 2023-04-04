import { useDispatch, useSelector } from "react-redux";

import CarBoxHolder from "../components/carBoxHolder/CarBoxHolder";
import FilterHolder from "../components/filterBox/FilterHolder";
import SideBox from "../components/sideBox/SideBox";
import carsFetch from "../redux/cars/carsActions";
import { useEffect } from "react";

const Category = () => {
    const { loading, error, data } = useSelector((state) => state.cars);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(carsFetch());
    }, []);
    
    return (  
        <section className="d-flex">
            <SideBox data={data}/>
            <div className="page-side">
                <FilterHolder data={data}/>
                <CarBoxHolder cars={data} title={""}/>
            </div>
        </section>
    );
}
 
export default Category;