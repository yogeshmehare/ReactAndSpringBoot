import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProfileCard from "./ProfileCard";
import AddUserCard from "./AddUserCard";

export default function CardsGrid({ setFormType,setOpen,userList, setSelectedUser,DeleteUser }) {

  return (
    <Box
      sx={{ flexGrow: 1,margin:2 }}
      alignItems={"center"}
      justifyContent={"center"}
      justifyItems={"center"}
    >
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 2, md: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {userList!=null && Array.from(userList).map((user, index) => (
          <Grid key={index} item xs={2} sm={4} md={3}>
            <ProfileCard
              user={user}
              setSelectedUser={setSelectedUser}
              setFormType={setFormType}
              setOpen={setOpen}
              DeleteUser={DeleteUser}
            />
          </Grid>
        ))}
        <Grid key={"addCard"} item xs={2} sm={4} md={3}>
        <AddUserCard setOpen={setOpen} setFormType={setFormType}/>
      </Grid>
      </Grid>
    </Box>
  );
}
