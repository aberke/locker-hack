import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Ask, About, MyStuff } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/ask" exact component={() => <Ask />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/my-stuff" exact component={() => <MyStuff />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
