/*import React, { useRef } from "react";*/
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// UI
const theme = createTheme();
const images = [
  {
    url: 'http://localhost:8000/static/allworkouts.png',
    title: 'All workouts',
    width: '40%',
    path:'/all_workouts'
  },
  {
    url: 'http://localhost:8000/static/addworkout.jpg',
    title: 'Create new workout',
    width: '40%',
    path:'/create_workout'
  }
];
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


function Greet() 
{
const navigate = useNavigate();
return(
  <ThemeProvider theme={theme}>
    <Box
    sx={{
      display: 'block',
      flexDirection: 'column',  // כדי לסדר את הכפתורים והכיתוב אחד מעל השני
      justifyContent: 'center',
      minHeight: '100vh',
      alignItems: 'center',
      gap: 4,  // רווח בין האלמנטים
    }}
  >
    <Typography sx={{ display: 'flex', justifyContent: 'center',fontFamily:'Impact', fontSize: '80px'}}>Build Your Workout</Typography>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',minHeight: '70vh', gap: 2 }}>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            onClick={() => navigate(image.path)}
            style={{
              width: image.width,
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={(theme) => ({
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: `calc(${theme.spacing(1)} + 6px)`,
                })}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
      </Box>
      </ThemeProvider>
        /*
        <div>
      <h2  style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => navigate('/all_workouts')} >all workouts</button>
        <button onClick={() => navigate('/create_workout')}>create workout</button>
      </h2>
    </div>
    */
)
}

export default Greet

