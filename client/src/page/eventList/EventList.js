import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { getEvents } from "../../redux/actions/eventsActions";

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
});

const EventList = ({ getEvents }) => {
  const classes = useStyles();
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <Fragment>
      <Card component={Link} to={`/event/event`} className={classes.card}>
        <div className={classes.mediaContainer}>
          <img
            src={require(`../../assets/img/cinema.jpg`)}
            className={classes.cardMedia}
            alt=""
          />
        </div>
        <div className={classes.mediaDetails}>
          <Typography variant="h2" color="secondary">
            Nom de l'event
          </Typography>
          <Typography variant="body1">
            Créé le <Moment format="DD/MM/YYYY">{new Date()}</Moment> par Ahmad
          </Typography>
        </div>
      </Card>
    </Fragment>
  );
};

export default connect(null, { getEvents })(EventList);
