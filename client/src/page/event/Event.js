import React, { useEffect, Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { eventStyles } from "./EventStyles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Moment from "react-moment"
import GoogleMapReact from "google-map-react"
import Marker from "../../components/marker/Marker"
import { connect } from "react-redux"
import { getEvent, deleteEvent } from "../../redux/actions/eventsActions"
import AttendeeItem from "../../components/attendees/AttendeeItem"
import EventComments from "../../components/eventComments/EventComments"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core"

const mapState = (state) => ({
  event: state.event,
  user: state.user,
})

const Event = ({
  getEvent,
  deleteEvent,
  match,
  event: { event, loading },
  user,
  history,
}) => {
  const classes = eventStyles()

  const [modal, setModal] = useState(false)

  const eventLocation = {
    center: {
      lat: event && event.lat,
      lng: event && event.lng,
    },
    zoom: 13,
  }

  useEffect(() => {
    getEvent(match.params.id)
  }, [getEvent, match.params.id])

  return (
    !loading &&
    event !== null && (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper className={classes.container}>
            <img
              src={require(`../../assets/img/${event.type}.jpg`)}
              className={classes.media}
              alt=""
            />
            <div className={classes.eventContent}>
              <Typography variant="h2" color="secondary">
                {event.eventName}
              </Typography>
              <div className={classes.eventDetails}>
                <Typography variant="body1">{event.address}</Typography>
                <Typography variant="body1">
                  Date de début:{" "}
                  <span>
                    <Moment format="DD/MM/YYYY">{event.date}</Moment>
                  </span>
                </Typography>
              </div>

              {user.user !== null && (
                <div className={classes.eventActions}>
                  {user.user._id === event.user && (
                    <Fragment>
                      <Button
                        component={Link}
                        to={`/edit-event/${event._id}`}
                        variant="contained"
                        color="primary"
                      >
                        <i className="fas fa-pen"></i> Editer
                      </Button>
                      <Button
                        disableRipple
                        variant="contained"
                        color="secondary"
                        onClick={() => setModal(true)}
                      >
                        <i className="fas fa-eraser"></i> Supprimer
                      </Button>
                    </Fragment>
                  )}

                  {/* MODAL*/}
                  {modal && (
                    <Dialog
                      open={modal}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {
                          "Es-tu vraiment VRAIMENT sûr de vouloir supprimer ton event ?"
                        }
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Attention, tu ne peux pas revenir en arrière !
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setModal(false)}
                          variant="contained"
                          color="secondary"
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={() => deleteEvent(event._id, history)}
                          variant="contained"
                          color="primary"
                        >
                          Je suis sûr
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )}

                  {user.user._id !== event.user && (
                    <Fragment>
                      <Button variant="contained" color="primary">
                        <i className="fas fa-pen"></i> Participer
                      </Button>
                      <Button
                        disableRipple
                        variant="contained"
                        color="secondary"
                      >
                        <i className="fas fa-eraser"></i> Se desister
                      </Button>
                    </Fragment>
                  )}
                </div>
              )}

              {/* Google Map */}
              <div style={{ width: "100%", height: "200px" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyALKlrkP2uXnhtmWaywZfS-W6kg0lHhnOU",
                  }}
                  defaultCenter={eventLocation.center}
                  defaultZoom={eventLocation.zoom}
                >
                  <Marker />
                </GoogleMapReact>
              </div>
              {/* End Google Map */}

              <div className={classes.description}>
                <Typography variant="h3" color="secondary">
                  Description:
                </Typography>
                <Typography variant="body1">{event.description}</Typography>
              </div>

              {/* COMMENTAIRES*/}
              <EventComments
                comments={event.comments}
                id={event._id}
                logUser={user}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper className={classes.container}>
            <Typography variant="h4" color="secondary">
              Liste des participants:
            </Typography>
            {event.attendees.map(({ _id, name, avatar, host }) => (
              <AttendeeItem name={name} host={host} avatar={avatar} key={_id} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    )
  )
}
export default connect(mapState, { getEvent, deleteEvent })(Event)
