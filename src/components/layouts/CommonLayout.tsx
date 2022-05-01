import React from 'react'
import{ Container, Grid } from "@mui/material"


import Header from 'components/layouts/Header'
import Footer from 'components/layouts/Footer'


interface CommonLayoutProps {
  children: React.ReactElement
}

function CommonLayout ({ children }: CommonLayoutProps) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container sx={{ pt: "3rem" }} maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default CommonLayout