import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  spinner: {
    width: "100%",
    height: "100%",
    display: "flex",
    justify: "center",
    align: "center",
  },
}));
const Spinner = () => {
  const { promiseInProgress } = usePromiseTracker();
  const classes = useStyles();

  return (
    promiseInProgress && (
      <div className={classes.spinner}>
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )
  );
};

export default Spinner;
