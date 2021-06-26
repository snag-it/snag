import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

// For Tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Elevates the appbar on scroll let the view pass under it.
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }));

function NavBar(props) {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0: return props.history.push('/')
      case 1: return props.history.push('/favorites')
      case 2: return props.history.push('/history')
      default:
        break;
    }
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Favorites" {...a11yProps(1)} />
            <Tab label="History" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}

export default withRouter(NavBar)
