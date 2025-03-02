import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { alpha, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { FormDiaogType } from "../Enum";
import ImageLoad from "./ImageLoad";

export default function ProfileCard({
  user,
  setSelectedUser,
  setFormType,
  setOpen,
  DeleteUser
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setSelectedUser(user);
    setFormType(FormDiaogType.EDIT)
    setOpen(true);
    handleClose();
  };

  const handleDeleteClick = () => {
    DeleteUser(user.id)
    handleClose();
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: "rgb(55, 65, 81)",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[300],
      }),
    },
  }));

  const getName = ()=>{
    let fn = "";
    let ln = "";
      fn = user.name.split(" ")[0][0].toUpperCase()
      if(user.name.split(" ")[1]==="")
        ln = ""
      else
        ln = user.name.split(" ")[1][0].toUpperCase()
      return fn+ln
    }

  return (
    <>      
    <Card sx={{ 
      backgroundImage: `url("../res/images/blur.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      maxWidth: 300,
      minWidth: 250,
       background:'linear-gradient(to right,rgb(95, 218, 255),rgb(143, 123, 254))',
       maxHeight:400 ,minHeight:300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {
              (user.name!==null && user.name.includes(" "))?getName():user.name[0]
            }
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-label="more"
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEditProfile} disableRipple>
                <Edit />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDeleteClick} disableRipple>
                <Delete />
                Delete
              </MenuItem>
            </StyledMenu>
          </>
        }
        title={user.name}
        subheader={user.profession}
      />
        <ImageLoad src={user.profilePic} alt="Profile pic" height="30px" width="40px" />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user.profession}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent:'end' , marginTop:'auto'}} >
        <IconButton aria-label="add to favorites" sx={{alignSelf:"end"}}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
    </>
  );
}
