import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {
    const location = useLocation();
    const username = location.state?.username || 'Guest';
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const Logout = () => {
        navigate('/', {replace: true});
    }
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };
    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem onClick={() => navigate('/dashboard', {state: {username}})} sx={{cursor: 'pointer', textAlign: 'center'}}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem onClick={() => navigate('/create-recipe', {state: {username}})} sx={{cursor: 'pointer', textAlign: 'center'}}>
                    <ListItemText primary="Create New Recipe"/>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: '#272727', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ width: '40px' }}/>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" component="div">
                            Recipe Genie
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" component="div" sx={{ ml: 'auto' }}>
                            {username}
                        </Typography>
                        <IconButton 
                            size="small"
                            edge="end"
                            color="inherit"
                            aria-label="logout"
                            sx={{ ml: 2 }}
                            onClick={() => Logout()}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
            <Box height={'20px'}/>
            <Box
                sx={{
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center'
                    }}
                >   
                    <Typography variant='h6'>
                        Hello, {username}. <br/>
                        Click the hamburger icon in the top left to get started.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}