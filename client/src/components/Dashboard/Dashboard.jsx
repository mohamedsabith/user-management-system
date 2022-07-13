import { Grid, Container, Typography, Stack, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import React from "react";
import "./dashboard.css";
import swal from "sweetalert";

const Dashboard = () => {
  const arr = [1, 2, 3, 4];
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          {arr.map(() => (
            <Grid items sx={12} sm={6} md={3}>
              <Typography
                sx={{ marginTop: { xs: 10, md: 15 }, fontWeight: "900" }}
              >
                ADIDAS SHOES
              </Typography>
              <Typography sx={{ opacity: 0.5 }}>
                THE BEST SHOE IN MARKETPLACE
              </Typography>
              <img
                className="img"
                src="https://www.transparentpng.com/thumb/adidas-shoes/a4xO3G-adidas-shoes-adidas-shoe-kids-superstar-daddy-grade.png"
                alt="img"
              />
              <Stack sx={{ marginLeft: { sm: 5, md: 7 } }}>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </Stack>
              <Button onClick={()=>{swal({title: "Added to your cart!",text: "You clicked the button!",icon: "success", button: "Aww yiss!"});}} variant="contained" sx={{marginLeft:{sm:5,md:7},marginTop:2}}>ADD TO CART</Button>
              </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
