import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer } from "./components";
import { Home, NewAsk, Ask, About, MyStuff } from "./screens";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();


function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/ask/:id" exact component={() => <Ask />} />
            <Route path="/ask" exact component={() => <NewAsk />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/my-stuff" exact component={() => <MyStuff />} />
          </Switch>
          <Footer />
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
