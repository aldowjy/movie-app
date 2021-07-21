import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(() => ({
  paper: {
    position: "absolute",
  },
  cover: {
    width: 120,
  },
}));

export const ImageModal = ({ value }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <img
        src={value}
        alt={value}
        className={classes.cover}
        onClick={() => handleClickOpen()}
      />
      <Modal
        open={open}
        onClose={handleClickClose}
        aria-labelledby="image-dialog"
        aria-describedby="image-dialog-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <img src={value} alt={value} />
        </div>
      </Modal>
    </>
  );
};
