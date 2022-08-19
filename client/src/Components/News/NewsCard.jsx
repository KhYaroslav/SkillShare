import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

export default function NewsCard({ news }) {
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={news.title}
          />
        </ListItem>
      </List>
    </>
  );
}
