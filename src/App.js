import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RoundCheckbox from "./routes/RoundCheckBox";
import { sentence } from "https://unpkg.com/txtgen/dist/txtgen.esm.js";
import axios from "axios";
import Alert from "@mui/material/Alert";

import "./App.css";
import background from "./treasurehunt.jpg";
import APIReq from "./APIReq";
import MorseReq from "./MorseReq";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = React.useState(1);
  const [congrats, setCongrats] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [typedAnswer, setTypedAnswer] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [completed, setCompleted] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    console.log(level);
    setShowError(false);
    if (level == 1 || level == 2 || level == 3 || level == 4) {
      const resp = APIReq().then((r) => {
        var newOptions = [];
        console.log(r);
        for (let i = 0; i < 3; i++) {
          newOptions.push(sentence());
        }
        newOptions.push(r.answer);
        shuffle(newOptions);
        setOptions(newOptions);
        console.log(newOptions);
        setQuestion(r.riddle);
        setAnswer(r.answer);
      });
    } else if (level == 5 || level == 6) {
      console.log("In morse code section");
      const response = await axios
        .get("https://random-word-api.herokuapp.com/word")
        .then((r) => {
          console.log(r.data[0]);
          let word = r.data[0];
          // MorseReq(word).then((r) => {
          //   console.log(r);
          //   console.log(r.contents.translated);
          //   console.log(r.contents.text);
          //   setQuestion(r.contents.translated);
          //   setAnswer(r.contents.text);
          // });
          MorseReq(word).then((r) => {
            console.log(r);
            setQuestion(r);
            setAnswer(word);
          });
        });
    }
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleCongratsClose = () => {
    setCongrats(false);
  };
  const handleCompletedClose = () => {
    setCompleted(false);
  };
  const handleChange = (e) => {
    setTypedAnswer(e.target.value);
  };
  const handleNext = (e) => {
    console.log("typed answer", typedAnswer);
    console.log("answer", answer);
    if (typedAnswer == answer) {
      if (level != 6) {
        setLevel(level + 1);
        setOpen(false);
        setCongrats(true);
      } else {
        setCompleted(true);
        setLevel(1);
        setOpen(false);
      }
    } else {
      setShowError(true);
    }
  };
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCheckboxChange = (value) => {
    console.log(value);
    setSelectedValue(value);
    setTypedAnswer(value);
  };
  return (
    <div style={{ backgroundColor: "#42280e" }}>
      <div className="App-header">
        <div className="headline">
          <h1>Welcome to Tiger Treasure Hunt</h1>
        </div>
        <div className="location1">
          <div style={{ marginBottom: "25px" }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              beat
              transform="grow-40 left-4"
              className="pinpoint"
            />
          </div>
          <div>
            <button
              className="level-button"
              onClick={handleClickOpen}
              disabled={!(level == 1)}
            >
              Level 1
            </button>
          </div>
        </div>
        <div className="location2">
          <div style={{ marginBottom: "25px" }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              beat
              transform="grow-40 left-4"
              className="pinpoint"
            />
          </div>
          <div>
            <button
              className="level-button"
              onClick={handleClickOpen}
              disabled={!(level == 2)}
            >
              Level 2
            </button>
          </div>
        </div>
        <div className="location3">
          <div style={{ marginBottom: "25px" }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              beat
              transform="grow-40 left-4"
              className="pinpoint"
            />
          </div>
          <button
            className="level-button"
            onClick={handleClickOpen}
            disabled={!(level == 3)}
          >
            Level 3
          </button>
        </div>
        <div className="location4">
          <div style={{ marginBottom: "25px" }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              beat
              transform="grow-40 left-4"
              className="pinpoint"
            />
          </div>
          <button
            className="level-button"
            onClick={handleClickOpen}
            disabled={!(level == 4)}
          >
            Level 4
          </button>
        </div>
        <div className="location5">
          <div style={{ marginBottom: "25px" }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              beat
              transform="grow-40 left-4"
              className="pinpoint"
            />
          </div>
          <button
            className="level-button"
            onClick={handleClickOpen}
            disabled={!(level == 5)}
          >
            Level 5
          </button>
        </div>
        <div className="location6">
          <div style={{ marginBottom: "25px" }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              beat
              transform="grow-40 left-4"
              className="pinpoint"
            />
          </div>
          <button
            className="level-button"
            onClick={handleClickOpen}
            disabled={!(level == 6)}
          >
            Finish!
          </button>
        </div>

        {congrats && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={congrats}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Congrats
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCongratsClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>
                Congratulations you are have unlocked Level {level}
              </Typography>
            </DialogContent>
            <DialogActions>
              <button className="dialogButton" onClick={handleCongratsClose}>
                Close
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}

        {completed && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={completed}
          >
            {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Congrats
            </DialogTitle> */}
            {/* <IconButton
              aria-label="close"
              onClick={handleCompletedClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton> */}
            <DialogContent dividers>
              {/* <Typography gutterBottom>
                Congratulations you have successfully got the treasure!
              </Typography> */}
              <div style={{ width: "100%", height: "100%" }}>
                <img src="https://media.istockphoto.com/id/1368531657/vector/congratulations-colorful-typography-banner.jpg?s=612x612&w=0&k=20&c=wLDsEtMDLracjmXSWOownzagyurdZH-lXlNLmZXWsVM=" />
              </div>
            </DialogContent>
            <DialogActions>
              <button className="dialogButton" onClick={handleCompletedClose}>
                Close
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}

        {level == 1 && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Riddle 1
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>{question}</Typography>
              <div>
                <RoundCheckbox
                  value={options[0]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[0]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[1]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[1]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[2]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[2]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[3]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[3]}
                />
              </div>
              {showError && (
                <div>
                  <Alert variant="outlined" severity="error">
                    Selected answer is wrong! Please try again!
                  </Alert>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button className="dialogButton" onClick={handleNext}>
                Next
                <FontAwesomeIcon icon={faAnglesRight} fade />
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}
        {level == 2 && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Riddle 2
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>{question}</Typography>
              <div>
                <RoundCheckbox
                  value={options[0]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[0]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[1]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[1]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[2]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[2]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[3]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[3]}
                />
              </div>
              {showError && (
                <div>
                  <Alert variant="outlined" severity="error">
                    Selected answer is wrong! Please try again!
                  </Alert>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button className="dialogButton" onClick={handleNext}>
                Next
                <FontAwesomeIcon icon={faAnglesRight} fade />
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}
        {level == 3 && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Riddle 3
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>{question}</Typography>
              <div>
                <RoundCheckbox
                  value={options[0]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[0]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[1]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[1]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[2]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[2]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[3]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[3]}
                />
              </div>
              {showError && (
                <div>
                  <Alert variant="outlined" severity="error">
                    Selected answer is wrong! Please try again!
                  </Alert>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button className="dialogButton" onClick={handleNext}>
                Next
                <FontAwesomeIcon icon={faAnglesRight} fade />
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}
        {level == 4 && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Riddle 4
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>{question}</Typography>
              <div>
                <RoundCheckbox
                  value={options[0]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[0]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[1]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[1]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[2]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[2]}
                />
              </div>
              <div>
                <RoundCheckbox
                  value={options[3]}
                  selectedValue={selectedValue}
                  onCheckboxChange={handleCheckboxChange}
                  name={options[3]}
                />
              </div>
              {showError && (
                <div>
                  <Alert variant="outlined" severity="error">
                    Selected answer is wrong! Please try again!
                  </Alert>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button className="dialogButton" onClick={handleNext}>
                Next
                <FontAwesomeIcon icon={faAnglesRight} fade />
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}
        {level == 5 && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Morse Code 1
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>Decode the morse code</Typography>
              <Typography gutterBottom>{question}</Typography>
              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Answer"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              {showError && (
                <div>
                  <Alert variant="outlined" severity="error">
                    Submitted answer is wrong! Please try again!
                  </Alert>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button className="dialogButton" onClick={handleNext}>
                Next
                <FontAwesomeIcon icon={faAnglesRight} fade />
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}
        {level == 6 && (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Morse Code 2
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>Decode the morse code</Typography>
              <Typography gutterBottom>{question}</Typography>
              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Answer"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              {showError && (
                <div>
                  <Alert variant="outlined" severity="error">
                    Submitted answer is wrong! Please try again!
                  </Alert>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button
                className="dialogButton"
                onClick={handleNext}
                style={{ width: "120px" }}
              >
                Submit
                <FontAwesomeIcon icon={faAnglesRight} fade />
              </button>
            </DialogActions>
          </BootstrapDialog>
        )}
      </div>
    </div>
  );
}
