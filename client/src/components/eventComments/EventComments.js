import React, { useState } from "react"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import TextField from "@material-ui/core/TextField"
import Moment from "react-moment"
import { commentStyles } from "./EventCommentsStyles"
import { addComment } from "../../redux/actions/eventsActions"
import { connect } from "react-redux"

const EventComments = ({ comments, addComment, id, logUser }) => {
  const classes = commentStyles()

  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    addComment(id, { text })
  }

  return (
    <div className={classes.comments}>
      <Typography variant="h3" color="secondary">
        Commentaires:
      </Typography>

      <Button
        className={classes.commentButton}
        variant="contained"
        color="primary"
      >
        Ajouter un commentaire
      </Button>

      <form noValidate className={classes.commentForm} onSubmit={handleSubmit}>
        <TextField
          className={classes.formInput}
          name="text"
          placeholder="Ton commentaire"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          className={classes.formButton}
          type="submit"
          variant="contained"
          color="primary"
        >
          Envoyer
        </Button>
      </form>
      {comments.map(({ _id, name, avatar, text, date, user }) => (
        <div className={classes.comment} key={_id}>
          <div className={classes.commentUser}>
            <Avatar className={classes.commentUserAvatar} alt="" src={avatar} />
            <Typography variant="h5">{name}</Typography>
          </div>
          <div>
            <Typography variant="body1">{text}</Typography>
            <Typography variant="caption" className={classes.commentDate}>
              Créé le <span>{<Moment format="DD/MM/YYYY">{date}</Moment>}</span>
            </Typography>
          </div>
          {!logUser.loading && logUser.user._id === user && (
            <HighlightOffIcon className={classes.commentIcon} />
          )}
        </div>
      ))}
    </div>
  )
}

export default connect(null, { addComment })(EventComments)
