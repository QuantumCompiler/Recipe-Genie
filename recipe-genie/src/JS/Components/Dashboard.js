import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Dashboard() {
    /*  useState hooks: 
            drawerOpen: A boolean value to determine if the drawer is open
            setDrawerOpen: A function to update the drawerOpen state
    */
    const [drawerOpen, setDrawerOpen] = useState(false);
    /*  toggleDrawer - A function to toggle the drawer open and closed
        Inputs:
            open: A boolean value to determine if the drawer should be open
        Algorithm:
            * Set the drawerOpen state to the value of the open parameter
        Return:
            Toggles the drawer open and closed based on the value of the open parameter
    */
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };
    /*  list - A function to render the list of links in the drawer
        Inputs:
            None
        Algorithm:
            * Render a list of links to navigate to different pages
        Return:
            A list of links to navigate to different pages
    */
    const list = () => (
        // The Box component is used to set the width of the drawer
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {/* The List component is used to render a list of links */}
            <List>
                {/* List item for home */}
                <ListItem button component={Link} to='/'>
                    <ListItemText primary="Home" />
                </ListItem>
                {/* List item for create new recipe */}
                <ListItem button component={Link} to='/create-recipe'>
                    <ListItemText primary="Create New Recipe"/>
                </ListItem>
            </List>
        </Box>
    );
    /*  JSX: 
    */
    return (
        // The Box component is used to contain the app bar and drawer
        <Box sx={{ flexGrow: 1 }}>
            {/* The AppBar component is used to display the app bar */}
            <AppBar position="static">
                {/* The Toolbar component is used to contain the app bar content */}
                <Toolbar sx={{ backgroundColor: '#272727' }}>
                    {/* The IconButton component is used to open the drawer */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        {/* Menu icon*/}
                        <MenuIcon />
                    </IconButton>
                    {/* Box for space */}
                    <Box sx={{ flexGrow: 1 }} />
                    {/* Title for app bar */}
                    <Typography variant="h6" component="div">
                        Recipe Genie
                    </Typography>
                    {/* Box for space */}
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
            {/* The Drawer component is used to display the drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {/* List of links to navigate to different pages */}
                {list()}
            </Drawer>
        </Box>
    );
}