import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/PlusJakartaSans-Bold.ttf";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Category from "./pages/Category";
import DetailCar from "./pages/DetailCar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path=":carId" element={<DetailCar />}>
              <Route path=":carId" element={<DetailCar />} />
            </Route>
          </Route>
          <Route path="category">
            <Route index element={<Category />} />
            <Route path=":carId" element={<DetailCar />}>
              <Route path=":carId" element={<DetailCar />} />
          </Route>
          </Route>
          <Route path="payment/:carId" element={<Payment/>}/>
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
