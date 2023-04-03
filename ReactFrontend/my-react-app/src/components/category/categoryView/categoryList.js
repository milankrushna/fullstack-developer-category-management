import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ExpandLess,ExpandMore,} from '@mui/icons-material';
import { IconButton,List,ListItemButton,ListItemText, Collapse,   } from '@mui/material';

export default function CategoryList(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Starred" />

          <IconButton  color="success" onClick={()=>{props.onOpenCatDialog('rootCat',{"value": "camera"})}} ><AddCircleOutlineIcon fontSize="large" /></IconButton>
          <IconButton  color="warning" ><BorderColorIcon fontSize="large" /></IconButton>
          <IconButton  color="error" ><DeleteForeverIcon fontSize="large" /></IconButton>
    
            
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}