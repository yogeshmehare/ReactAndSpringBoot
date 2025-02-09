import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProfileCard from "./ProfileCard";
import AddUserCard from "./AddUserCard";

export default function CardsGrid({ setOpen,userList, setSelectedUser,DeleteUser }) {

  return (
    <Box
      sx={{ flexGrow: 1 }}
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
        {Array.from(userList).map((user, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
            <ProfileCard
              user={user}
              setSelectedUser={setSelectedUser}
              setOpen={setOpen}
              DeleteUser={DeleteUser}
            />
          </Grid>
        ))}
        <Grid key={"addCard"} size={{ xs: 2, sm: 4, md: 3 }}>
            <AddUserCard setOpen={setOpen}/>
          </Grid>
      </Grid>
    </Box>
  );
}
