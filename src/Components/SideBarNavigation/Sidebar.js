// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
    return (
        <div style={{ width: '240px', height: '100vh', backgroundColor: '#f4f4f4', padding: '20px' }}>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/table">
                    <ListItemText primary="Data Table" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;