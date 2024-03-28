import { Box } from "@mui/material";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = ({ setIsLoggedIn }) => {
  const handleSuccess = credentialResponse => {
    const token = jwtDecode(credentialResponse?.credential);
    const jti = token?.jti;
    localStorage.setItem("token", jti);
    setIsLoggedIn(true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </Box>
  );
};

export default Login;
