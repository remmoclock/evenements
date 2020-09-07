import React from "react";
import theme from "./theme/theme";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
