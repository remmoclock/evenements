import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import theme from "./theme/theme"
import "./App.css"
import Navbar from "./components/navbar/Navbar"
import { ThemeProvider } from "@material-ui/core/styles"
import Landing from "./page/landing/Landing"
import Register from "./page/register/Register"
import Login from "./page/login/Login"
import { connect } from "react-redux"
import { loadUser } from "./redux/actions/userActions"
import EventList from "./page/eventList/EventList"
import Event from "./page/event/Event"
import CreateEvent from "./page/createEvent/CreateEvent"
import EditEvent from "./page/editEvent/EditEvent"

function App({ loadUser }) {
  useEffect(() => {
    loadUser()
  }, [loadUser])
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={EventList} />
            <Route exact path="/event/:id" component={Event} />
            <Route exact path="/create-event" component={CreateEvent} />
            <Route exact path="/edit-event/:id" component={EditEvent} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default connect(null, { loadUser })(App)
