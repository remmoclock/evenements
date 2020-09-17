import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    position: "fixed",
    background:
      'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80") no-repeat center center/cover'
  }
}))

const Landing = () => {
  const classes = useStyles()
  return <div className={classes.root}></div>
}

export default Landing
