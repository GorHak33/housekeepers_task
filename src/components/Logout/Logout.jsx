import { Box, Button } from "@mui/material";
import React from "react";
import { GoogleLogout } from "@react-oauth/google";

export default function Logout({ setIsLoggedIn }) {
  const onSuccess = () => {
    console.log("Logout Successful");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {/* <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      /> */}
      <Button onClick={() => onSuccess()}>Log out</Button>
    </Box>
  );
}
