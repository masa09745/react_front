import React from 'react'
import{ Container, Grid, Box } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';


import { Header } from 'components/layouts/Header'
import { Footer } from 'components/layouts/Footer'


interface CommonLayoutProps {
  children: React.ReactElement
}

export const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <Box
        sx = {{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          display: 'flex',
          flexDirection: 'column',
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container  component="main"  sx={{ mt:8, mb:2 }} maxWidth="sm">
          <Grid container sx={{justifyContent: "center"}}>
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        component="footer"
        sx={{
          py:3,
          px:2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800]
        }}
      >
        <Footer />
      </Box>
    </>
  );
}