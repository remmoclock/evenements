import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import frLocale from "date-fns/locale/fr"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { createEventStyles } from "./CreateEventStyles"
import { createEvent } from "../../redux/actions/eventsActions"
import { connect } from "react-redux"

const CreateEvent = ({ createEvent, history }) => {
  // HOOKS
  const classes = createEventStyles()
  const [formData, setData] = useState({
    eventName: "",
    type: "",
    address: "",
    date: new Date(),
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...formData, [name]: value })
  }

  const handleChangeDate = (date) => {
    setData({ ...formData, date })
  }

  const handleChangeAddress = (address) => {
    setData({ ...formData, address })
  }

  const handleSelect = async (address) => {
    const res = await geocodeByAddress(address)
    const latLng = await getLatLng(res[0])
    setData({
      ...formData,
      address,
      lat: latLng.lat,
      lng: latLng.lng,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createEvent(formData, history)
  }

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant="h2" color="primary">
          Créé ton event !!
        </Typography>
        <TextField
          className={classes.textFields}
          type="text"
          name="eventName"
          placeholder="Donnes un titre"
          fullWidth
          value={formData.eventName}
          onChange={handleChange}
        />

        {/*2eme input*/}
        <FormControl className={classes.textFields} fullWidth>
          <InputLabel id="type-event">Type</InputLabel>
          <Select
            labelId="type-event"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value={"visite"}>Visite</MenuItem>
            <MenuItem value={"concert"}>Concert</MenuItem>
            <MenuItem value={"festival"}>Festival</MenuItem>
            <MenuItem value={"restaurant"}>Restaurant</MenuItem>
            <MenuItem value={"cinema"}>Cinéma</MenuItem>
          </Select>
        </FormControl>

        {/*3eme input*/}
        <PlacesAutocomplete
          value={formData.address}
          onChange={handleChangeAddress}
          onSelect={(address) => handleSelect(address)}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <TextField
                {...getInputProps({
                  placeholder: "Lieu",
                  className: classes.textFields,
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item"
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        {/*4eme input*/}
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
          <DatePicker
            className={classes.datePicker}
            name="date"
            format="dd/MM/yyyy"
            value={formData.date}
            onChange={(date) => handleChangeDate(date)}
          />
        </MuiPickersUtilsProvider>

        {/*5eme input*/}
        <TextField
          className={classes.textFields}
          name="description"
          multiline
          rows={5}
          placeholder="Description"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Envoyer
        </Button>
      </form>
    </Paper>
  )
}

export default connect(null, { createEvent })(CreateEvent)
