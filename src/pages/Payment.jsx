import "react-toastify/dist/ReactToastify.css";

import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Field, useFormik } from "formik";
import { InferType, date, number, object, string } from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import bitCoin from "../../src/images/Bitcoin.png";
import carsFetch from "../redux/cars/carsActions";
import payPal from "../../src/images/PayPal.png";
import security from "../../src/images/security.png";
import { useParams } from "react-router-dom";
import visa from "../../src/images/Visa.png";

const getCar = (id, cars) => {
  const allCars = [...cars];
  return allCars.find((c) => c.id === id);
};
const initialValues = {
  name: "",
  phoneNumber: "",
  address: "",
  townOrCity: "",
  pickLocation: "",
  pickDate: "",
  pickTime: "",
  dropLocation: "",
  dropDate: "",
  dropTime: "",
  cardNumber: "",
  exDate: "",
  cardHolder: "",
  cvc: "",
  payPort: "",
};
const getLocations = (data) => {
  let locations = [];
  data.forEach((car) => {
    car.location.forEach((l) => {
      if (!locations.includes(l)) {
        locations.push(l);
      }
    });
  });
  return locations;
};
const getTime = (date) => {
  let hr = date.getHours();
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  if (hr < 10) {
    hr = "0" + hr;
  }
  return hr + ":" + min + " " + ampm;
};
const getDate = (date) => {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const Payment = () => {
  const { loading, error, data } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(carsFetch());
  }, []);
  const carId = useParams();
  const [pickTimeValue, setPickTime] = useState(new Date());
  const [pickDateValue, setPickDate] = useState(new Date());
  const [dropTimeValue, setDropTime] = useState(new Date());
  const [dropDateValue, setDropDate] = useState(new Date());
  const [exDateValue, setExDate] = useState(new Date());
  const [squar1, setsquar1] = useState(false);
  const [squar2, setsquar2] = useState(false);

  let car;
  if (data.length > 0) {
    car = getCar(carId.carId, data);
  }
  const locations = getLocations(data);
  const notify = (name) =>
    toast.success(`Thank You ${name}. Payment was Completed!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    const warning = () =>
    toast.warn('Please Check All the Conditions!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  const onSubmit = (value) => {
      if(squar1 && squar2){
        notify(value.name);
      }else{
        warning();
      }
      
  };
  const validationSchema = object({
    name: string().required("Name is Required!"),
    phoneNumber: string()
      .required("Phone Number is Required!")
      .matches(/^[0-9]{11}$/, "invalid Phone Number!!!"),
    address: string().required("Address is Required!"),
    townOrCity: string().required("Town or City is Required!"),
    pickLocation: string().required("Location is Required!"),
    dropLocation: string().required("Location is Required!"),
    cardNumber: string().required("Card Number is Required!"),
    cardHolder: string().required("Card Holder is Required!"),
    cvc: string().required("CVC is Reqired!"),
    payPort: string().required("Please Select a Payment Method!"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const pickTimeHandler = (timeValue) => {
    setPickTime(timeValue);
    const time = getTime(new Date(timeValue.toString()));
    formik.values.pickTime = time;
  };
  const dropTimeHandler = (timeValue) => {
    setDropTime(timeValue);
    const time = getTime(new Date(timeValue.toString()));
    formik.values.dropTime = time;
  };
  const pickDateHandler = (dateValue) => {
    setPickDate(dateValue);
    const date = getDate(new Date(dateValue.toString()));
    formik.values.pickDate = date;
  };
  const dropDateHandler = (dateValue) => {
    setDropDate(dateValue);
    const date = getDate(new Date(dateValue.toString()));
    formik.values.dropDate = date;
  };

  const exDateHandler = (dateValue) => {
    setExDate(dateValue);
    const date = getDate(new Date(dateValue.toString()));
    formik.values.exDate = date;
  };
  const checkHandeler = (e) => {
    if (e.target.id === "squar-1") {
      setsquar1(true);
    } else {
      setsquar2(true);
    }
  };
  if (car) {
    return (
      <>
        <div className="container-man">
          <div className="row">
            <div className="col d-lg-none d-block">
              <div className="payment-box mt-4">
                <div className="box-title-holder">
                  <h2 className="title">Rental Summary</h2>
                  <p className="text-mute mb-0">
                    Prices may change depending on the length of the rental and
                    the price of your rental car.
                  </p>
                </div>
                <div className="d-flex align-items-center summery-profile">
                  <img
                    src={process.env.PUBLIC_URL + "/" + car.src}
                    alt="summery"
                    className="summery-img"
                  />
                  <div>
                    <h1 className="title-summery">{car.name}</h1>
                    <div>
                      <div className="star-holder">
                        <BsFillStarFill className="fill-star" />
                        <BsFillStarFill className="fill-star" />
                        <BsFillStarFill className="fill-star" />
                        <BsFillStarFill className="fill-star" />
                        <BsStar className="empty-star" />
                      </div>
                      <div className="mt-2">440 + Reciewer</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <label className="text-mute">Subtotal</label>
                  <div className="fw-bold">
                    ${car.priceOff ? car.priceOff : car.price}.00
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <label className="text-mute">Tax</label>
                  <div className="fw-bold">$0</div>
                </div>
                <div className="offer">
                  <input
                    type="text"
                    placeholder="Apply promo code"
                    id="cardNumber"
                  />
                  <button>Applynow</button>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-5">
                  <div className="box-title-holder">
                    <h2 className="title">Total Rental Price</h2>
                    <p className="text-mute mb-0">Overall price rental</p>
                  </div>
                  <div className="price-summery">
                    ${car.priceOff ? car.priceOff : car.price}.00
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <form onSubmit={formik.handleSubmit}>
                <div className="payment-box mt-4">
                  <div className="mb-3 d-flex justify-content-between align-items-end">
                    <div className="box-title-holder">
                      <h2 className="title">Billing Info</h2>
                      <p className="text-mute mb-0">
                        Please enter your billing info
                      </p>
                    </div>
                    <div className="text-mute">Step 1 of 4</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="name" className="d-flex flex-column mt-3">
                        Name
                        <input
                          className="mt-2"
                          type="text"
                          placeholder="Your name"
                          id="name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                        />
                      </label>
                      {formik.errors.name && formik.touched.name && (
                        <div className="text-danger error">
                          {formik.errors.name}
                        </div>
                      )}
                      <label
                        htmlFor="Adress"
                        className="d-flex flex-column mt-3"
                      >
                        Adress
                        <input
                          className="mt-2"
                          type="text"
                          placeholder="Your Adress"
                          id="Adress"
                          name="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                        />
                      </label>
                      {formik.errors.address && formik.touched.address && (
                        <div className="text-danger error">
                          {formik.errors.address}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="PhoneNumber"
                        className="d-flex flex-column mt-3"
                      >
                        PhoneNumber
                        <input
                          className="mt-2"
                          type="text"
                          placeholder="Phone number"
                          id="PhoneNumber"
                          name="phoneNumber"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                        />
                      </label>
                      {formik.errors.phoneNumber &&
                        formik.touched.phoneNumber && (
                          <div className="text-danger error">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                      <label
                        htmlFor="Town_City"
                        className="d-flex flex-column mt-3"
                      >
                        Town/City
                        <input
                          className="mt-2"
                          type="text"
                          placeholder="Town or City"
                          id="Town_City"
                          name="townOrCity"
                          value={formik.values.townOrCity}
                          onChange={formik.handleChange}
                        />
                      </label>
                      {formik.errors.townOrCity &&
                        formik.touched.townOrCity && (
                          <div className="text-danger error">
                            {formik.errors.townOrCity}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="payment-box mt-4">
                  <div className="mb-3 d-flex justify-content-between align-items-end">
                    <div className="box-title-holder">
                      <h2 className="title">Rental Info</h2>
                      <p className="text-mute mb-0">
                        Please select your rental date
                      </p>
                    </div>
                    <div className="text-mute">Step 2 of 4</div>
                  </div>
                  <div className="row">
                    <div>
                      <input id="pickup" type="radio" className="me-2" />
                      <label htmlFor="pickup">Pick-Up</label>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="location"
                        className="d-flex flex-column mt-3"
                      >
                        Locations
                        <div className="filter-selector mt-2">
                          <select
                            id="location"
                            name="pickLocation"
                            value={formik.values.pickLocation}
                            onChange={formik.handleChange}
                          >
                            <option value="">Select Your City</option>
                            {locations.length > 0 ? (
                              locations.map((l, index) => {
                                return (
                                  <option value={l} key={index}>
                                    {l}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="">Select Your City</option>
                            )}
                          </select>
                        </div>
                      </label>
                      {formik.errors.pickLocation &&
                        formik.touched.pickLocation && (
                          <div className="text-danger error">
                            {formik.errors.pickLocation}
                          </div>
                        )}
                      <label
                        htmlFor="pickTime"
                        className="d-flex flex-column mt-3"
                      >
                        Time
                        <div className="filter-selector mt-2 p-0">
                          <DatePicker
                            id="pickTime"
                            selected={pickTimeValue}
                            onChange={(timeValue) => pickTimeHandler(timeValue)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="pickDate"
                        className="d-flex flex-column mt-3"
                      >
                        Date
                        <div className="filter-selector mt-2 p-0">
                          <DatePicker
                            id="pickDate"
                            selected={pickDateValue}
                            onChange={(dateValue) => pickDateHandler(dateValue)}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div>
                      <input id="pickup" type="radio" className="me-2" />
                      <label htmlFor="pickup">Drop-Off</label>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="location"
                        className="d-flex flex-column mt-3"
                      >
                        Locations
                        <div className="filter-selector mt-2">
                          <select
                            id="location"
                            name="dropLocation"
                            value={formik.values.dropLocation}
                            onChange={formik.handleChange}
                          >
                            <option value="">Select Your City</option>
                            {locations.length > 0 ? (
                              locations.map((l, index) => {
                                return (
                                  <option value={l} key={index}>
                                    {l}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="">Select Your City</option>
                            )}
                          </select>
                        </div>
                      </label>
                      {formik.errors.dropLocation &&
                        formik.touched.dropLocation && (
                          <div className="text-danger error">
                            {formik.errors.dropLocation}
                          </div>
                        )}
                      <label
                        htmlFor="dropTime"
                        className="d-flex flex-column mt-3"
                      >
                        Time
                        <div className="filter-selector mt-2 p-0">
                          <DatePicker
                            id="dropTime"
                            selected={dropTimeValue}
                            onChange={(timeValue) => dropTimeHandler(timeValue)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="dropDate"
                        className="d-flex flex-column mt-3"
                      >
                        Date
                        <div className="filter-selector mt-2 p-0">
                          <DatePicker
                            id="dropDate"
                            selected={dropDateValue}
                            onChange={(dateValue) => dropDateHandler(dateValue)}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="payment-box mt-4">
                  <div className="mb-3 d-flex justify-content-between align-items-end">
                    <div className="box-title-holder">
                      <h2 className="title">Payment Method</h2>
                      <p className="text-mute mb-0">
                        Please enter your payment method
                      </p>
                    </div>
                    <div className="text-mute">Step 3 of 4</div>
                  </div>
                  <div className="credit-box">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <input id="pickup" type="radio" className="me-2" />
                        <label htmlFor="pickup">Pick-Up</label>
                      </div>
                      <img src={visa} alt="visa" />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label
                          htmlFor="cardNumber"
                          className="d-flex flex-column mt-3"
                        >
                          Card Number
                          <input
                            className="mt-2"
                            type="text"
                            placeholder="Card number"
                            id="cardNumber"
                            name="cardNumber"
                            value={formik.values.cardNumber}
                            onChange={formik.handleChange}
                          />
                        </label>
                        {formik.errors.cardNumber &&
                          formik.touched.cardNumber && (
                            <div className="text-danger error">
                              {formik.errors.cardNumber}
                            </div>
                          )}
                        <label
                          htmlFor="CardHolder"
                          className="d-flex flex-column mt-3"
                        >
                          CardHolder
                          <input
                            className="mt-2"
                            type="text"
                            placeholder="CardHolder"
                            id="CardHolder"
                            name="cardHolder"
                            value={formik.values.cardHolder}
                            onChange={formik.handleChange}
                          />
                        </label>
                        {formik.errors.cardHolder &&
                          formik.touched.cardHolder && (
                            <div className="text-danger error">
                              {formik.errors.cardHolder}
                            </div>
                          )}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="exDate"
                          className="d-flex flex-column mt-3"
                        >
                          Expration Date
                          <div className="filter-selector mt-2 p-0">
                            <DatePicker
                              id="exDate"
                              selected={exDateValue}
                              onChange={(dateValue) => exDateHandler(dateValue)}
                            />
                          </div>
                        </label>
                        <label
                          htmlFor="CVC"
                          className="d-flex flex-column mt-3"
                        >
                          CVC
                          <input
                            className="mt-2"
                            type="text"
                            placeholder="CVC"
                            id="CVC"
                            name="cvc"
                            value={formik.values.cvc}
                            onChange={formik.handleChange}
                          />
                        </label>
                        {formik.errors.cvc && formik.touched.cvc && (
                          <div className="text-danger error">
                            {formik.errors.cvc}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="credit-box d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex align-items-center">
                      <input
                        className="pay-circle me-3"
                        id="payPal"
                        type="radio"
                        value={"payPal"}
                        name="payPort"
                        onChange={formik.handleChange}
                      />
                      <label htmlFor="payPal">PayPal</label>
                    </div>
                    <img src={payPal} alt="PayPal" />
                  </div>
                  <div className="credit-box d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex align-items-center">
                      <input
                        className="pay-circle me-3"
                        id="bitCoin"
                        type="radio"
                        value={"payPal"}
                        name="payPort"
                        onChange={formik.handleChange}
                      />
                      <label htmlFor="bitCoin">BitCoin</label>
                    </div>
                    <img src={bitCoin} alt="bitCoin" />
                  </div>
                </div>
                <div className="payment-box my-4">
                  <div className="mb-4 d-flex justify-content-between align-items-end">
                    <div className="box-title-holder">
                      <h2 className="title">Confirmation</h2>
                      <p className="text-mute mb-0">
                        We are getting to the end. Just few clicks and your
                        rental is ready!
                      </p>
                    </div>
                    <div className="text-mute">Step 4 of 4</div>
                  </div>
                  <div className="credit-box d-flex align-items-center mt-4">
                    <input
                      type="checkbox"
                      className="squar me-3"
                      id="squar-1"
                      onClick={checkHandeler}
                    />
                    <label htmlFor="squar-1">
                      I agree with sending an Marketing and newsletter emails.
                      No spam, promissed!
                    </label>
                  </div>
                  <div className="credit-box d-flex align-items-center my-4">
                    <input
                      type="checkbox"
                      className="squar me-3"
                      id="squar-2"
                      onClick={checkHandeler}
                    />
                    <label htmlFor="squar-1">
                      I agree with our terms and conditions and privacy policy.
                    </label>
                  </div>
                  <button
                    className="btn-blue mb-5"
                    type="submit"
                    onSubmit={formik.handleSubmit}
                  >
                    RentNow
                  </button>
                  <div className="d-flex flex-column">
                    <img
                      src={security}
                      alt="security"
                      className="security-icon"
                    />
                    <label>All your data are safe</label>
                    <p className="text-mute mt-2">
                      We are using the most advanced security to provide you the
                      best experience ever.
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="payment-box mt-4">
                <div className="box-title-holder">
                  <h2 className="title">Rental Summary</h2>
                  <p className="text-mute mb-0">
                    Prices may change depending on the length of the rental and
                    the price of your rental car.
                  </p>
                </div>
                <div className="d-flex align-items-center summery-profile">
                  <img
                    src={process.env.PUBLIC_URL + "/" + car.src}
                    alt="summery"
                    className="summery-img"
                  />
                  <div>
                    <h1 className="title-summery">Nissan GT - R</h1>
                    <div className="d-flex">
                      <div className="star-holder">
                        <BsFillStarFill className="fill-star" />
                        <BsFillStarFill className="fill-star" />
                        <BsFillStarFill className="fill-star" />
                        <BsFillStarFill className="fill-star" />
                        <BsStar className="empty-star" />
                      </div>
                      <div className="ms-2">440 + Reciewer</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <label className="text-mute">Subtotal</label>
                  <div className="fw-bold">$80.00</div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <label className="text-mute">Tax</label>
                  <div className="fw-bold">$0</div>
                </div>
                <div className="offer">
                  <input
                    type="text"
                    placeholder="Apply promo code"
                    id="cardNumber"
                  />
                  <button>Applynow</button>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-5">
                  <div className="box-title-holder">
                    <h2 className="title">Total Rental Price</h2>
                    <p className="text-mute mb-0">Overall price rental</p>
                  </div>
                  <div className="price-summery">$80.00</div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </>
    );
  }
};

export default Payment;
