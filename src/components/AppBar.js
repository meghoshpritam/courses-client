import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import { useHistory, useLocation } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InfoIcon from '@material-ui/icons/Info';
import ClassIcon from '@material-ui/icons/Class';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryIcon from '@material-ui/icons/Category';
import HelpIcon from '@material-ui/icons/Help';
import { Divider, Button } from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link color="inherit" underline="none" href="/">
                Courses
              </Link>
            </Typography>

            <div>
              {!localStorage.getItem('accessToken') && (
                <Button variant="outlined" color="inherit">
                  Sign Up
                </Button>
              )}
              <IconButton
                color="inherit"
                onClick={() => {
                  if (localStorage.getItem('accessToken')) history.push('/profile/me');
                  else history.push('/sign-in');
                }}
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer open={openDrawer} onClose={toggleDrawer}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button onClick={() => history.push('/')} selected={location.pathname === '/'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {!localStorage.getItem('accessToken') && (
              <>
                <ListItem
                  button
                  onClick={() => history.push('/sign-in')}
                  selected={location.pathname === '/sign-in'}
                >
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign In" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => history.push('/sign-up')}
                  selected={location.pathname === '/sign-up'}
                >
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
            <ListItem
              button
              onClick={() => history.push('/my-profile')}
              selected={location.pathname === '/my-profile'}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>

              <ListItemText primary="My Profile" />
            </ListItem>

            <ListItem
              button
              onClick={() => history.push('/course/1')}
              selected={location.pathname === '/course'}
            >
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/course/1')}
              selected={location.pathname === '/course'}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/course/1')}
              selected={location.pathname === '/course'}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Goals" />
            </ListItem>

            {localStorage.getItem('role') === 'admin' && (
              <>
                <Divider />
                <ListItem
                  button
                  onClick={() => history.push('/add-course')}
                  selected={location.pathname === '/add-course'}
                >
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Course" />
                </ListItem>
              </>
            )}
            <Divider />
            <ListItem
              button
              onClick={() => history.push('/about')}
              selected={location.pathname === '/about'}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/course/1')}
              selected={location.pathname === '/course'}
            >
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
            <ListItem
              button
              onClick={() => window.open('https://meghoshpritam.netlify.app', '_blank')}
              selected={location.pathname === '/course'}
            >
              <ListItemIcon>
                <BugReportIcon />
              </ListItemIcon>
              <ListItemText primary="Report a Bug" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                // TODO: sign out from server
                localStorage.clear();
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
