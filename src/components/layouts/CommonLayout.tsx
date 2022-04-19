import React from 'react'

import{ Container, Grid } from "@mui/material"
import{ styled } from '@mui/material/styles'

import Header from 'components/layouts/Header'


const CustomContainer = styled(Container)({
  paddingTop: "3rem"
})

interface CommonLayoutProps {
  children: React.ReactElement
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid>
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