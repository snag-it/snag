import React, { useEffect, useStyles } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DisplayGrid } from "../../components/DisplayGrid";
import * as actionCreators from "../../actions/actionCreators";
import NavBar from "../../components/NavBar";
import { Typography } from "@material-ui/core";

function HistoryPage({ fetchHistory, history }) {
  useEffect(() => {
    //need to figure out cookieid to pass in
    console.log("Am I using effect in history?");
    fetchHistory();
  }, []);
  //give withSearch a bool
  return (
    <div>
      <NavBar />
      <Typography variant="h3">Previous Search Results</Typography>
      <DisplayGrid
        amazonProducts={history[0]?.results.amazon || []}
        ebayProducts={history[0]?.results.ebay || []}
        targetProducts={history[0]?.results.target || []}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  history: state.user.history,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchHistory: actionCreators.fetchHistory,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
