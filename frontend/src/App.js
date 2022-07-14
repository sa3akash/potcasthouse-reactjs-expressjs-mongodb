import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//components
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Authenticate from "./pages/authenticatePage/AuthenticatePage";
import ActivatePage from "./pages/activatePage/ActivatePage"
import RoomsPage from "./pages/roomsPage/RoomsPage"
import {useSelector} from "react-redux"
import {useLoadingWidthRefresh} from "./hooks/useLoadingWidthRefresh";
import Loader from "./components/Loader/Loader";
import Room from "./pages/Room/Room"


function App() {
const {loading} = useLoadingWidthRefresh()

  return ( loading ?  <Loader message='Loading...'/> :
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={
            <GuestRoutes>
              <Home />
            </GuestRoutes>
          } />
        <Route path="/authenticate" element={
            <GuestRoutes>
              <Authenticate />
            </GuestRoutes>
          }/>
        <Route path="/activate" element={
            <SemiProtectedRoutes>
              <ActivatePage />
            </SemiProtectedRoutes>
          }/>
        <Route path="/rooms" element={
            <ProtectedRoutes>
              <RoomsPage />
            </ProtectedRoutes>
          }/>
        <Route path="/room/:id" element={
            <ProtectedRoutes>
              <Room />
            </ProtectedRoutes>
          }/>

      </Routes>
    </BrowserRouter>
  );
}

const GuestRoutes = ({ children }) => {

const {isAuth} = useSelector((state) => state.authSlice)

 return (
  isAuth ? (<Navigate to={"/rooms"} replace />) : (children)
 )
  // if (isAuth) {
  // return children;
  // } else {
  //   return <Navigate to={"/rooms"} replace />;
  // }
};



const SemiProtectedRoutes = ({ children }) => {

  const {isAuth, user} = useSelector((state) => state.authSlice)


 return (
  !isAuth ? (<Navigate to={"/"} replace />) : isAuth && !user.activated ? (children) : (<Navigate to={"/rooms"} replace />)
 )
};



const ProtectedRoutes = ({ children }) => {

  const {isAuth, user} = useSelector((state) => state.authSlice)


 return (
  !isAuth ? (<Navigate to={"/"} replace />) : isAuth && !user.activated ? (<Navigate to={"/activate"} replace />) : (children)
 )
};

export default App;
