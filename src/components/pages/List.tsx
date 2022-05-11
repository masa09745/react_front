import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';


import { MenuData } from 'interfaces/index'

export const ListItem = (props: MenuData) => {
  const {id, name } = props;


  return(
    <Card sx={{width: 200}} >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
          {id} :{name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            メニューの表示テスト
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}