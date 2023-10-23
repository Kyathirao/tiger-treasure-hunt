import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import RoundCheckbox from "./RoundCheckBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogFunc(isOpen, title, content, onClose) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCheckboxChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Riddle 1
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
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
          A white dove flew down by the castle. Along came a king and picked it
          up handless, ate it up toothless, and carried it away wingless.
        </Typography>
        <div>
          <RoundCheckbox
            value="option1"
            selectedValue={selectedValue}
            onCheckboxChange={handleCheckboxChange}
            name="Snow melted by the sun"
          />
        </div>
        <div>
          <RoundCheckbox
            value="option2"
            selectedValue={selectedValue}
            onCheckboxChange={handleCheckboxChange}
            name="Sun melted by snow"
          />
        </div>
        <div>
          <RoundCheckbox
            value="option3"
            selectedValue={selectedValue}
            onCheckboxChange={handleCheckboxChange}
            name="Dove got the king"
          />
        </div>
        <div>
          <RoundCheckbox
            value="option4"
            selectedValue={selectedValue}
            onCheckboxChange={handleCheckboxChange}
            name="King got the dove"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <button className="dialogButton">
          Next
          <FontAwesomeIcon icon={faAnglesRight} fade />
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
}
