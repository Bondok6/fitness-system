import React, { useState, useCallback, useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Components/home";
import Nav from "./Components/navbar";
import Contact from "./Components/contactUs";
import About from "./Components/about";
import Sidebar from "./UI/Sidebar/Sidebar";
import Backdrop from "./UI/Backdrop/Backdrop";
import PoPup from "./UI/PoPup/PoPup";
import Profile from "./Components/Profile/Profile/Profile";
import Online from "./Components/online";
import VideoCategory from "./Components/videoCategories";
import Videos from "./Components/videos";
import SearchTrainee from "./Components/searchTrainee";
import SearchTrainer from "./Components/searchTrainer";
import Axios from "axios";
import AuthCont from "./context/auth-context";
import Table from "./Components/Table";
import Approved from "./Components/approvedTrainees";
import AdminHome from "./Components/Admin/Home";
import AddTrainer from "./Components/Admin/AddTrainer";
import Chat from "./Components/Chat/chat";
// import { useDispatch } from "react-redux";
import Qr from "./Components/QRCode/qrCode";
import AllTrainees from "./Components/allTrainees";
import firebase from "./firebase";
import axios from "axios";

// import myTrainees from "./Components/trainer/myTrainees";

function App() {
  const [open, setOpen] = useState(false);
  const [u, setU] = useState(false);
  const [m, setM] = useState(false);
  const [outer, setOuter] = useState(false);
  const [inner, setInnre] = useState(false);
  const [param, setParam] = useState(false);

  const [isAuth, setIsAuth] = useState(false);
  const [me, setMe] = useState({});

  let Auth = useContext(AuthCont);

  //notification
  useEffect(() => {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(async (token) => {
        console.log(token);
        const res = await axios.post("/subscribe", {
          token,
          deviceType: "web",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    async function getProfile() {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await Axios.get("profile");
        if (res.status === 200 || 201) {
          Auth.isAuth = true;
          Auth.auth = res.data;
          setMe(res.data);
          setIsAuth(true);
        }
      }
    }
    getProfile();
  }, []);

  const openHandler = useCallback(() => {
    setOpen(true);
  }, []);

  const closeHandler = useCallback(() => {
    setOpen(false);
  }, []);
  const [open2, setOpen2] = useState(false);

  const openHandler2 = useCallback((url, method, o, i, u) => {
    setOpen2(true);
    setU(url);
    setM(method);
    if (url === "/food" || url === "/table") {
      setOuter(o);
      setInnre(i);
      setParam(u);
    }
  }, []);

  const [foo, setFoo] = useState();

  const foodTable = (f, method) => {
    setFoo(f);
    setM(method);
  };

  const closeHandler2 = useCallback(() => {
    setOpen2(false);
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Nav openHandler={openHandler} openHandler2={openHandler2} />
        <Backdrop
          open={open}
          clickHandler={openHandler}
          closeHandler={closeHandler}
          closeHandler2={closeHandler2}
        />
        <Sidebar
          open={open}
          clickHandler={openHandler}
          closeHandler={closeHandler}
        />
        {/* <Route exact path="/AdminHome" component={AdminHome} />
        <Route exact path="/AddTrainer" component={AddTrainer} /> */}
        <PoPup
          open={open2}
          url={u}
          method={m}
          outer={outer}
          inner={inner}
          param={param}
          clickHandler2={openHandler2}
          closeHandler={closeHandler2}
          foodTable={foodTable}
        />
        {isAuth && me.role === "trainee" ? (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home closeHandler2={closeHandler2} {...props} />
              )}
            />
            <Route
              exact
              path="/profile"
              render={(props) => (
                <Profile
                  closeHandler2={closeHandler2}
                  openHandler2={openHandler2}
                  open2={open2}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/profile/:id"
              render={(props) => (
                <Profile
                  closeHandler2={closeHandler2}
                  openHandler2={openHandler2}
                  open2={open2}
                  {...props}
                />
              )}
            />

            <Route exact path="/searchTrainee" component={SearchTrainee} />
            <Route exact path="/searchTrainer" component={SearchTrainer} />
            <Route exact path="/online/:id" component={Online} />
            <Route exact path="/videoCategories" component={VideoCategory} />
            <Route exact path="/Videos/:id" component={Videos} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        ) : isAuth && me.role === "gym" ? (
          <Switch>
            <Route exact path="/Qr" component={Qr} />
            <Route
              exact
              path="/"
              render={(props) => (
                <Home closeHandler2={closeHandler2} {...props} />
              )}
            />

            <Route
              exact
              path="/profile/:id"
              render={(props) => (
                <Profile
                  closeHandler2={closeHandler2}
                  openHandler2={openHandler2}
                  open2={open2}
                  {...props}
                />
              )}
            />

            <Route exact path="/searchTrainee" component={SearchTrainee} />
            <Route
              exact
              path="/allTrainees"
              render={(props) => (
                <AllTrainees
                  closeHandler2={closeHandler2}
                  openHandler2={openHandler2}
                  open2={open2}
                  {...props}
                />
              )}
            />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/approvedTrainees" component={Approved} />
            <Route exact path="/searchTrainer" component={SearchTrainer} />
            <Route exact path="/online/:id" component={Online} />
            <Route exact path="/videoCategories" component={VideoCategory} />
            <Route exact path="/Videos/:id" component={Videos} />
            <Route
              exact
              path="/addDite/:id"
              render={(props) => (
                <Table
                  closeHandler2={closeHandler2}
                  openHandler2={openHandler2}
                  open2={open2}
                  food={foo}
                  method={m}
                  id={outer}
                  {...props}
                />
              )}
            />
          </Switch>
        ) : isAuth && me.role === "admin" ? (
          <Switch>
            <Route exact path="/AdminHome" component={AdminHome} />
            <Route exact path="/AddTrainer" component={AddTrainer} />
            <Redirect to="/AdminHome" />
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home closeHandler2={closeHandler2} {...props} />
              )}
            />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            
            {/* <Route exact path="/AddTrainer" component={AddTrainer} /> */}
          </Switch>
        )}
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
