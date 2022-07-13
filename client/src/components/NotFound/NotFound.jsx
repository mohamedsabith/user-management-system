import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/404.svg";

const NotFound = () => {
  const Navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: { xs: 15, sm: 20, md: 25 },
        }}
      >
        <img src={notFound} alt="logo" height={150} />
        <Typography sx={{ fontSize: { xs: 30, md: 40 }, opacity: 0.5 }}>
          PAGE NOT FOUND
        </Typography>
        <Button
          variant="contained"
          onClick={() => Navigate("/")}
          sx={{ marginTop: 2 }}
        >
          GO BACK
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
