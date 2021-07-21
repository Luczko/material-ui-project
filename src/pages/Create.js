import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");
  const [noteTitleError, setNoteTitleError] = useState(false);
  const [noteDetailsError, setNoteDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoteTitleError(false);
    setNoteDetailsError(false);
    if (noteTitle === "") {
      setNoteTitleError(true);
    }
    if (noteDetails === "") {
      setNoteDetailsError(true);
    }
    if (noteTitle && noteDetails) {
      axios
        .post("http://localhost:8000/notes", {
          title: noteTitle,
          details: noteDetails,
          category: category,
        })
        .then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Typography
        variant='h6'
        color='textSecondary'
        component='h2'
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setNoteTitle(e.target.value)}
          className={classes.field}
          color='secondary'
          label='Note Title'
          variant='outlined'
          fullWidth
          required
          error={noteTitleError}
        />
        <TextField
          onChange={(e) => setNoteDetails(e.target.value)}
          className={classes.field}
          color='secondary'
          label='Note Details'
          variant='outlined'
          multiline
          rows={4}
          fullWidth
          required
          error={noteDetailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value='money' control={<Radio />} label='Money' />
            <FormControlLabel value='todos' control={<Radio />} label='Todos' />
            <FormControlLabel
              value='reminders'
              control={<Radio />}
              label='Reminders'
            />
            <FormControlLabel value='work' control={<Radio />} label='Work' />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      <br />
      {/* <AcUnitOutlinedIcon />
      <AcUnitOutlinedIcon color='secondary' fontSize='large' /> */}
    </Container>
  );
}
