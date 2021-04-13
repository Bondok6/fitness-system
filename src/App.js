import React, { useState, useCallback, useRef } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Components/home';
import Nav from './Components/navbar';

import Contact from "./Components/contactUs";
import About from "./Components/about";
import Sidebar from "./UI/Sidebar/Sidebar";
import Backdrop from "./UI/Backdrop/Backdrop";
import PoPup from "./UI/PoPup/PoPup";
import Profile from "./Pages/Profile/Profile";
import Online from "./Components/online";
import VideoCategory from './Components/videoCategories'
import Videos from './Components/videos'

import Search from './Components/search'
function App() {
  const [open, setOpen] = useState(false);
  const [u, setU] = useState(false);
  const [m, setM] = useState(false);
  const [outer, setOuter] = useState(false);
  const [inner, setInnre] = useState(false);

	const openHandler = useCallback(() => {
		setOpen(true);
	}, []);

	const closeHandler = useCallback(() => {
		setOpen(false);
	}, []);
	const [ open2, setOpen2 ] = useState(false);

	const openHandler2 = useCallback((url, method, o, i) => {
		setOpen2(true);
		setU(url);
		setM(method);
		if (url === '/food') {
			setOuter(o);
			setInnre(i);
		}
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
        <PoPup
          open={open2}
          url={u}
          method={m}
          outer={outer}
          inner={inner}
          clickHandler2={openHandler2}
          closeHandler={closeHandler2}
        />
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
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/online/:id" component={Online} />
          <Route exact path="/videoCategories" component={VideoCategory} />
          <Route exact path="/Videos/:id" component={Videos} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
