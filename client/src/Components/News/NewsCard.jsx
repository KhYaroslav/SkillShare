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
          <a target="_blank" href={news.url} style={{ color: '#A1A1A1', textDecoration: 'none' }} rel="noreferrer">
            <ListItemText
              sx={{ mt: -1, mb: -1 }}
              primary={news.title}
            />
          </a>
        </ListItem>
      </List>
    </>
  );
}
