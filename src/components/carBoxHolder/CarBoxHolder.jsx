import { useDispatch, useSelector } from "react-redux";

import CardBox from "../card/CardBox";
import ReactLoading from 'react-loading';
import carsFetch from "../../redux/cars/carsActions";
import { useEffect } from "react";

const CarBoxHolder = () => {
  const { loading, error, data } = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(carsFetch());
  }, []);
  if (!loading){
      return (
        <div className="container-man">
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3 ms-3">
            <span className="text-mute">Recomendation Car</span>
          </div>
          <div className="row">
            {data.map((car) => {
              return <div className="col-xl-3 col-md-4 col-sm-6" key={car.id}><CardBox car={car}/></div>;
            })}
          </div>
          <div className="btn-blue btn-more">Show more Car</div>
        </div>
      );
  }else{
      return(
        <ReactLoading type={"spinningBubbles"} color={"#3563E9"} height={100} width={100} className="mx-auto"/>
      )
  }
};

export default CarBoxHolder;
