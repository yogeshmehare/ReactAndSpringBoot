import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormDiaogType } from "../Enum";
import User from "../model/User";

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
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            const profession = formJson.profession;
            if (formType === FormDiaogType.EDIT) {
              selectedUser.name = name;
              selectedUser.profession = profession;
              UpdateUser(selectedUser);
            }else if(formType === FormDiaogType.ADD){
              AddNewUser(new User(0,name,profession,"https://avatar.iran.liara.run/public",""))
            }
            handleClose();
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

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
