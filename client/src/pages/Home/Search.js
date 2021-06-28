import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import * as actionCreators from '../../actions/actionCreators';
import { sampleAmazonData } from '../../sampleData/sampleAmazonData'
import { sampleEbayData } from '../../sampleData/sampleEbayData'
import { sampleTargetData } from '../../sampleData/sampleTargetData'

const useStyles = makeStyles(theme => ({
  root: {
    width: '40%',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  searchIcon: {
    margin: theme.spacing(1),
    color: theme.palette.grey[500],
    fontSize: '30px',
  },
  input: {
    fontSize: '1.5em',
    width: '300%',
  },
  retailAvatar: {
    backgroundColor: '#00000000',
  },
  retailerCheckboxes: {
    width: '100%',
  },
  button: {
    width: '120px',
    fontSize: '20px',
    marginLeft: theme.spacing(1),
    height: '70px',
  },
}));

function Search({
  retailers,
  retailerLogos,
  fetchAmazon,
  fetchEbay,
  fetchTarget,
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([0, 1, 2]);
  const [chosenRetailers, setChosenRetailers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    setChosenRetailers(checked.map(value => retailers[value]));
  }, [checked]);

  const handleChecks = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
  };

  const handleInputChange = event => setUserInput(event.target.value);
  const handleToggleAccordianExpansion = event => setIsExpanded(!isExpanded);
  const handleSearchSubmit = () => {
    isExpanded && handleToggleAccordianExpansion();
    const uriEncodedInput = encodeURI(userInput);
    if (userInput.length === 0) setPlaceholder('Search for an item');
    else {
      fetchAmazon(sampleAmazonData)
      fetchEbay(sampleEbayData)
      fetchTarget(sampleTargetData)
    }; // Promise.all() here
  };

  return (
    <Grid container direction="row" justify="center">
      <Accordion
        className={classes.root}
        expanded={isExpanded}
        onClick={handleToggleAccordianExpansion}>
        <AccordionSummary
          expandIcon={<AddIcon fontSize="large" />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header">
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<SearchIcon className={classes.searchIcon} />}
            label={
              <InputBase
                className={classes.input}
                placeholder={placeholder}
                fullWidth
                value={userInput}
                onChange={handleInputChange}
              />
            }
          />
        </AccordionSummary>
        <AccordionDetails onClick={event => event.stopPropagation()}>
          <List className={classes.retailerCheckboxes}>
            {[0, 1, 2].map(value => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleChecks(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={retailers[value]} />
                  <ListItemSecondaryAction>
                    <Avatar variant="square" className={classes.retailAvatar}>
                      {retailerLogos[value]}
                    </Avatar>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Button
        className={classes.button}
        onClick={handleSearchSubmit}
        variant="contained"
        color="secondary">
        submit
      </Button>
    </Grid>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAmazon: actionCreators.fetchAmazon,
      fetchEbay: actionCreators.fetchEbay,
      fetchTarget: actionCreators.fetchTarget,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Search);
