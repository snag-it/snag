import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Search from './Search';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(10, 0, 0, 0),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignContent="center">
      <Search />
    </Grid>
  );
}
