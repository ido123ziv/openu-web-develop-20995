import React from 'react';
import { Menu, MenuItem, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <Menu inverted pointing color='grey'>
            <MenuItem as={Link} to="/" name='home'>
                Home
            </MenuItem>

            <MenuItem as={Link} to="/about" name='about'>
                About
            </MenuItem>

            <MenuItem as={Link} to="/contact" name='contact'>
                Contact
            </MenuItem>

            <MenuItem>
                <Button primary>Sign up</Button>
            </MenuItem>

            <MenuItem position='right'>
                <Button>Log-in</Button>
            </MenuItem>

        </Menu>
    );
}

export default NavigationBar;
