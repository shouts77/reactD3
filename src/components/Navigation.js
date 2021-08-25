import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Home from '@material-ui/icons/Home';
import AccountTree from '@material-ui/icons/AccountTree';
import Collapse from '@material-ui/core/Collapse'; // for nested list
import ExpandLess from '@material-ui/icons/ExpandLess'; // for nested list
import ExpandMore from '@material-ui/icons/ExpandMore'; // for nested list
import Equalizer from '@material-ui/icons/Equalizer'; // for nested list

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [pOpen, setPopen] = React.useState(false);
  const [rOpen, setRopen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const projectHandleClick = () => {
    setPopen(!pOpen);
  };

  const practiceHandleClick = () => {
    setRopen(!rOpen);
  };

  const listClick = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            React D3.js Visualization
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={listClick}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <Link to="/reactD3" component={RouterLink}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem button onClick={projectHandleClick}>
            <ListItemIcon>
              <AccountTree />
            </ListItemIcon>
            <ListItemText primary="Project" />
            {pOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={pOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={listClick}>
                <ListItemIcon>
                  <Equalizer />
                </ListItemIcon>
                <Link to="/scatterchart" component={RouterLink}>
                  <ListItemText primary="Scatter Chart" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested} onClick={listClick}>
                <ListItemIcon>
                  <Equalizer />
                </ListItemIcon>
                <Link to="/barchart" component={RouterLink}>
                  <ListItemText primary="Bar Chart" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={practiceHandleClick}>
            <ListItemIcon>
              <AccountTree />
            </ListItemIcon>
            <ListItemText primary="Practice" />
            {rOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={rOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={listClick}>
                <ListItemIcon>
                  <Equalizer />
                </ListItemIcon>
                <Link to="/scatterchart" component={RouterLink}>
                  <ListItemText primary="Scatter Chart" />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested} onClick={listClick}>
                <ListItemIcon>
                  <Equalizer />
                </ListItemIcon>
                <Link to="/barchart" component={RouterLink}>
                  <ListItemText primary="Bar Chart" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
