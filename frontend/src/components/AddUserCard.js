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
    <div 
    style={{ height: '100%',width:'100%', alignContent:'center' }}>
    <Card sx={{ maxWidth: 300, minWidth: 245, maxHeight:180 ,minHeight:180,
      alignContent:'center',
      background:'linear-gradient(to right,rgb(95, 255, 130),rgb(8, 134, 65))',     }} onClick={handleClick}>
      <CardHeader title={"Create User"} />
      <AddCircleOutline />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {"Add User"}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

export default AddUserCard;
