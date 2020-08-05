import React, { Fragment, useEffect } from "react";
import { withStyles, withWidth, Typography, Grid } from "@material-ui/core";

const styles = theme => ({
  mainContainer: {
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
    direction: 'rtl',
  }
});

function HowItWorksSection(props) {
  const { classes, theme } = props;

  return (
    <Fragment>
      <Grid container className={classes.mainContainer}>
        <Typography variant="h4">
          Hi
        </Typography>
      </Grid>
    </Fragment>
  );
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(HowItWorksSection)
);
