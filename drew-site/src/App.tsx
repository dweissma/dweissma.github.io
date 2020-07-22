import React from "react";
import { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { Home } from "./Home";
import { About } from "./About";

export enum Views {
  Home,
  Resume,
  About,
  Contact,
}

export interface AppProps {
  initialState?: Views;
}

function getComponent(view: Views){
  if(view === Views.Home){
    return <Home />
  }
  else if(view === Views.About){
    console.log("hit");
    return <About />
  }
  else{
    return <p>Couldn't find that view</p>
  }
}

function App(props: AppProps) {
  const { initialState } = props;
  const [viewState, setViewState] = useState(initialState ?? Views.Home);
  const showHome = () =>  setViewState(Views.Home);
  const showResume = () => setViewState(Views.Resume);
  const showAbout = () => setViewState(Views.About);
  const showContact = () => setViewState(Views.Contact);
  return (
    <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="" onClick={showHome}>
              Drew Weissmann
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={viewState === Views.Home ? "active" : ""}>
                <a onClick={showHome}>Home</a>
              </li>
              <li className={viewState === Views.About ? "active" : ""}>
                <a onClick={showAbout}>About</a>
              </li>
              <li className={viewState === Views.Contact ? "active" : ""}>
                <a onClick={showContact}>Contact</a>
              </li>
              <li className={viewState === Views.Resume ? "active" : ""}>
                <a onClick={showResume}>Resume</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {getComponent(viewState)}
    </div>
  );
}
export default App;
