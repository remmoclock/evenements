import React, { useEffect } from "react"
import { eventStyles } from "./EventStyles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Moment from "react-moment"
import GoogleMapReact from "google-map-react"
import Marker from "../../components/marker/Marker"
import { connect } from "react-redux"
import { getEvent } from "../../redux/actions/eventsActions"
import AttendeeItem from "../../components/attendees/AttendeeItem"

const mapState = (state) => ({
  event: state.event,
})

const Event = ({ getEvent, match, event: { event, loading } }) => {
  const classes = eventStyles()

  const eventLocation = {
    center: {
      lat: !loading && event && event.lat,
      lng: !loading && event && event.lng,
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
              src={require(`../../assets/img/cinema.jpg`)}
              className={classes.media}
              alt=""
            />
            <div className={classes.eventContent}>
              <Typography variant="h2" color="secondary">
                {event.userName}
              </Typography>
              <div className={classes.eventDetails}>
                <Typography variant="body1">Address</Typography>
                <Typography variant="body1">
                  Date de début:{" "}
                  <span>
                    <Moment format="DD/MM/YYYY">{event.date}</Moment>
                  </span>
                </Typography>
              </div>

              <div className={classes.eventActions}>
                <Button variant="contained" color="primary">
                  <i className="fas fa-pen"></i> Editer
                </Button>
                <Button disableRipple variant="contained" color="secondary">
                  <i className="fas fa-eraser"></i> Supprimer
                </Button>
              </div>

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
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper className={classes.container}>
            <Typography variant="h4" color="secondary">
              Liste des participants:
            </Typography>
            {event.attendees.map(({_id, name, avatar, host}) => (
              <AttendeeItem
                name={name}
                host={host}
                avatar={avatar}
                key={_id}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
    )
  )
}
export default connect(mapState, { getEvent })(Event)