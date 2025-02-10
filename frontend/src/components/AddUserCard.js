import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AddCircleOutline } from "@mui/icons-material";
import { FormDiaogType } from "../Enum";

function AddUserCard({ setOpen, setFormType }) {

  const handleClick = () => {
    console.log("ck");
    setFormType(FormDiaogType.ADD);
    setOpen(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardHeader title={"Create User"} />
      <AddCircleOutline />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {"Add User"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AddUserCard;
