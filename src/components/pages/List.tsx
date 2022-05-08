import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { MenuData } from 'interfaces/index'

export const ListItem = (props: MenuData) => {
  const {id, name } = props;


  return(
    <Card sx={{width: 200}} >
      <CardContent>
        <Typography variant="h5" component="div">
        {id} :{name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}