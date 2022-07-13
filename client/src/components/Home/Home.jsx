import React,{useEffect} from 'react'
import {Grid,Typography,Button,CssBaseline,Container} from '@mui/material'
import banner from '../../assets/banner.svg'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const Navigate = useNavigate()

  useEffect(() => {
   const Auth=localStorage.getItem("AuthToken")
   if(Auth){
    Navigate("/dashboard")
   }
  }, [Navigate])
  
  return (
    <>
    <CssBaseline/>
    <div style={{paddingTop:3,marginTop:50}}>
      <Container maxWidth="lg">
       <Grid container direction="row" justifyContent="space-between"  className='container'>
         <Grid item xs={12} md={6}>
          <img src={banner} alt='banner' className='banner'/>
         </Grid>

      <Grid sx={{marginY:{xs:5,sm:10,md:20}}} item xs={12} md={6}>
      <Typography variant="h5" sx={{lineHeight:2,fontSize:{xs:20,sm:30}}}>USER MANAGEMENT SYSTEM</Typography>
      <Typography gutterBottom variant="body1">User management describes the ability for administrators to manage user access to various IT resources like systems, devices, applications, storage systems, networks, SaaS services, and more.....</Typography>
       <div className='button'>
       <Button  variant="contained" color="primary" onClick={()=>{Navigate('/signup')}}>SignUp</Button>
       <ArrowBackIcon color="primary"/>
       <ArrowForwardIcon color="secondary"/>
       <Button  variant="contained" color="secondary" onClick={()=>{Navigate('/login')}}>Login</Button>
       </div>
        </Grid>

       </Grid>
      </Container>
    </div>
     
    </>
  )
}

export default Home