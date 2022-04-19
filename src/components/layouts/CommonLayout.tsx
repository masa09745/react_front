import React from 'react'

import{ Container, Grid } from "@mui/material"
import{ makeStyles } from '@mui/material/styles'

import Header from 'components/layouts/Header'


const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

const CommonLayout =({ children } : CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default CommonLayout