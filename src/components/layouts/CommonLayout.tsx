import React from 'react'
import{ Container, Grid, Box } from "@mui/material"


import { Header } from 'components/layouts/Header'
import { Footer } from 'components/layouts/Footer'


interface CommonLayoutProps {
  children: React.ReactElement
}

export const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container sx={{ pt: "3rem", hight:"100vh" }} maxWidth="lg">
          <Grid container sx={{justifyContent: "center"}}>
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
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