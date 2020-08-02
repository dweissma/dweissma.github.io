import React from "react";
import { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Home } from "./Home";
import { About } from "./About";
import { Resume } from "./Resume";
import { ChessGame } from "./chess/ChessGame";

export enum Views {
  Home,
  Resume,
  About,
  Chess
}

export interface AppProps {
  initialState?: Views;
}

function App(props: AppProps) {
  const { initialState } = props;
  const [viewState, setViewState] = useState(initialState ?? Views.Home);
  const showHome = () =>  setViewState(Views.Home);
  const showResume = () => setViewState(Views.Resume);
  const showAbout = () => setViewState(Views.About);
  const showChess = () => setViewState(Views.Chess);
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
              <li className={viewState === Views.Resume ? "active" : ""}>
                <a onClick={showResume}>Resume</a>
              </li>
              <li className={viewState === Views.Chess ? "active": ""}>
                <a onClick={showChess}>Chess</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {viewState === Views.Home ? <Home /> : viewState === Views.About ? <About showResume={showResume} />: viewState === Views.Resume ? <Resume /> : viewState === Views.Chess ? <ChessGame /> : <p>In Progress</p>}
    </div>
  );
}
export default App;
