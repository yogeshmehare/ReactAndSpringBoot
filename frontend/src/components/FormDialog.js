import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormDiaogType } from "../Enum";
import User from "../model/User";
import { uploadFile } from "../S3Upload";
import { toast } from "react-toastify";

export default function FormDialog({
  formType,
  open,
  setOpen,
  selectedUser,
  AddNewUser,
  UpdateUser,
}) {
  const handleClose = () => {
    setOpen(false);
    setImageUrl("")

  };

  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  function startTimer() {
    // setSeconds(20)
    // setRunning(true)
    setTimeout(() => {
      toast.warn(`Please select image to upload`, { autoClose: 5000 });
    }, 100);
  }

  const handleUpload = async () => {
    if (!file) {
      // setShowAlert(true)
      startTimer();
      return;
    }

    try {
      const url = await uploadFile(file);
      console.log(url);
      setImageUrl(url);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed!");
    }
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "inline-block",
    marginTop: "10px",
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0 && milliseconds === 0) {
          setRunning(false);
          setShowAlert(false);
        } else if (milliseconds > 0) {
          setMilliSeconds(milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds(seconds - 1);
          setMilliSeconds(99);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          setMilliSeconds(99);
        }
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [running, minutes, seconds, milliseconds]);

  return (
    <Dialog
      // {{showAlert && <Alert severity="error">This is an error Alert. {seconds}s {milliseconds}</Alert>}}
      open={open}
      onClose={(event) => {
        const targetElement = event?.target;
        if (targetElement?.closest(".Toastify")) {
          return;
        }
        handleClose();
      }}
      disableEnforceFocus
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const name = formJson.name;
          const profession = formJson.profession;
          if (formType === FormDiaogType.EDIT) {
            if (name.length > 0 && profession.length > 0) {
              selectedUser.name = name;
              selectedUser.profession = profession;
              UpdateUser(selectedUser);
              handleClose();
            } else {
              toast.error("Please fill all the details");
            }
          } else if (formType === FormDiaogType.ADD) {
            if (name.length > 0 && profession.length > 0) {
              AddNewUser(
                new User(
                  0,
                  name,
                  profession,
                  imageUrl,
                  ""
                )
              );
              handleClose();
            } else {
              toast.error("Please fill all the details");
            }
          }
        },
      }}
    >
      {formType === FormDiaogType.EDIT && (
        <>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              defaultValue={selectedUser?.name}
              label="Name"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="profession"
              name="profession"
              label="Profession"
              defaultValue={selectedUser?.profession}
              fullWidth
              variant="standard"
            />
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            /> */}
          </DialogContent>
        </>
      )}

      {formType === FormDiaogType.ADD && (
        <>
          <DialogTitle>Create User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="profession"
              name="profession"
              label="Profession"
              fullWidth
              variant="standard"
            />
            {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          </DialogContent>
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="150" height={200} style={{alignSelf:'center',justifyContent:'center', margin:'15px'}} />}
          <input type="file" onChange={handleFileChange} style={{alignSelf:'center'}}/>
          <button type="button" onClick={handleUpload} style={buttonStyle}>Upload</button>
        </>
      )}

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
