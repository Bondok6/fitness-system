import React,{useState,useCallback} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Components/home';
import Nav from './Components/navbar';

import Contact from './Components/contactUs';
import Sidebar from './UI/Sidebar/Sidebar';
import Backdrop from './UI/Backdrop/Backdrop'
import PoPup from './UI/PoPup/PoPup';
import Profile from './Pages/Profile/Profile';
import Online from './Components/online';

function App() {
  
  
  const [open, setOpen] = useState(false);
  const [u, setU] = useState(false);
  const [m, setM] = useState(false);

  const openHandler = useCallback(() => {
    setOpen(true);
  }, []);

  const closeHandler = useCallback(() => {
    setOpen(false);
  }, []);
  const [open2, setOpen2] = useState(false);

  const openHandler2 = useCallback((url,method) => {
    setOpen2(true);
    setU(url)
    setM(method)
    console.log(method)
  }, []);

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
       <PoPup    open={open2}
                  url={u}
                  method={m}
        clickHandler2={openHandler2}
        closeHandler={closeHandler2} />
            <Switch>
              {/* <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component= {Login} /> */}
              <Route exact path='/' render={(props)=><Home closeHandler2={closeHandler2} {...props} />} />
              <Route exact path='/profile' component={Profile} />
              {/* <Route exact path='/' render={(props) => <Home closeHandler2={closeHandler2} {...props} />} /> */}
              <Route exact path='/contact' component={Contact}/>
              <Route exact path='/online' component={Online}/>
              {/* <Route exact path='/forget' component= {ForgetPassword} />
              <Route exact path='/verify' component= {Verify} />
              <Route exact path='/reset' component= {ResetPassword} /> */}
            </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
