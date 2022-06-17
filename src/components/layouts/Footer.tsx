import React from 'react';

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";


function Copyright() {
  return(
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
      Your Link
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export const Footer:React.FC =() => {
  return(
    <Container maxWidth="sm">
      <Typography variant="body1">
       Masahide Higashi
      </Typography>
      <Copyright />
    </Container>
  );
}
