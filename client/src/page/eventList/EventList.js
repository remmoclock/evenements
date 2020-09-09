import React, { Fragment, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import { connect } from "react-redux"
import { getEvents } from "../../redux/actions/eventsActions"

const useStyles = makeStyles({
  card: {
    display: "flex",
    alignItems: "center",
    marginBottom: "3rem",
  },
  mediaContainer: {
    width: "33%",
    marginRight: "3rem",
  },
  cardMedia: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    display: "block",
  },
})

const mapState = (state) => ({
  event: state.event,
})

const EventList = ({ getEvents, event: { events, loading } }) => {
  const classes = useStyles()
  useEffect(() => {
    getEvents()
  }, [getEvents])

  return (
    <Fragment>
      {!loading && events ? (
        events.map((evt) => {
          return (
            <Card
              component={Link}
              to={`/event/${evt._id}`}
              className={classes.card}
              key={evt._id}
            >
              <div className={classes.mediaContainer}>
                <img
                  src={require(`../../assets/img/${evt.type}.jpg`)}
                  className={classes.cardMedia}
                  alt=""
                />
              </div>
              <div className={classes.mediaDetails}>
                <Typography variant="h2" color="secondary">
                  {evt.eventName}
                </Typography>
                <Typography variant="body1">
                  Créé le <Moment format="DD/MM/YYYY">{evt.date}</Moment> par{" "}
                  {evt.userName}
                </Typography>
              </div>
            </Card>
          )
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </Fragment>
  )
}

export default connect(mapState, { getEvents })(EventList)
