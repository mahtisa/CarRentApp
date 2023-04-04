import CardBox from "../card/CardBox";
import ReactLoading from 'react-loading';

const CarBoxHolder = ({cars ,title}) => {
  if (cars.length > 0){
      return (
        <div className="container-man">
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3 ms-3">
            <span className="text-mute">{title}</span>
          </div>
          <div className="row">
            {cars.map((car) => {
              return <div className="col-xl-3 col-md-4 col-sm-6" key={car.id}><CardBox car={car}/></div>;
            })}
          </div>
          {title === "Recomendation Car" && <div className="btn-blue btn-more">Show more Car</div>}
        </div>
      );
  }else{
      return(
        <ReactLoading type={"spinningBubbles"} color={"#3563E9"} height={100} width={100} className="mx-auto"/>
      )
  }
};

export default CarBoxHolder;
