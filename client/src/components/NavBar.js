import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
// Remove active tab underline
const MyTabs = withStyles({
  indicator: {
    backgroundColor: '#ffffff00', // remove active tab indicator
  },
})(Tabs);

const useStyles = makeStyles({
  tabText: {
    fontSize: '20px',
  },
  tab: {
    height: '55px'
  }
});

function NavBar(props) {
  const classes = useStyles();
  const [badgeNumber, setBadgeNumber] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  // Ensure proper tag is active on page refresh
  props.location.pathname === '/' && activeTabIndex !== 0 && setActiveTabIndex(0)
  props.location.pathname === '/favorites' && activeTabIndex !== 1 && setActiveTabIndex(1)
  props.location.pathname === '/history' && activeTabIndex !== 2 && setActiveTabIndex(2)


  const handleTabChange = (event, newValue) => {
    event.preventDefault()
    setActiveTabIndex(newValue)
    switch (newValue) {
      case 0:
        console.log(`props`, props)
        return props.history.push('/');
      case 1:
        console.log(`props`, props)
        return props.history.push('/favorites');
      case 2:
        console.log(`props`, props)
        return props.history.push('/history');
      default:
        break;
    }
  };

  useEffect(() => {
    console.log('badge', props.favoriteList.length);
    setBadgeNumber(props.favoriteList.length);
  }, [props.favoriteList]);
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <MyTabs
              value={activeTabIndex}
              onChange={handleTabChange}
              aria-label="simple tabs example">
              <Tab
              className={classes.tab}
                disableRipple
                label={
                  <Typography className={classes.tabText}>Home</Typography>
                }
                {...a11yProps(0)}
              />
              <Tab
              className={classes.tab}
                disableRipple
                label={
                  <Badge badgeContent={badgeNumber} color="secondary">
                    <Typography className={classes.tabText}>
                      Favorites
                    </Typography>
                  </Badge>
                }
                {...a11yProps(1)}
              />
              <Tab
              className={classes.tab}
                disableRipple
                label={
                  <Typography className={classes.tabText}>History</Typography>
                }
                {...a11yProps(2)}
              />
            </MyTabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {props.loading ? <LinearProgress color="secondary" /> : null}
    </>
  );
}

const mapStateToProps = state => ({
  favoriteList: state.user.favorites,
  loading: false,
});

export default connect(mapStateToProps, null)(withRouter(NavBar));
