import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import theme from "./theme/theme";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Landing from "./page/landing/Landing";
import Register from "./page/register/Register";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
