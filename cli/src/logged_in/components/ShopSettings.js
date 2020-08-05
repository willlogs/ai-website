import React, { memo, useState, Fragment, useRef } from "react";
import { withRouter, Switch, Route, Router, Link } from 'react-router';
import PropTypes from "prop-types";
import { withStyles, SwipeableDrawer, List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, Grid, Hidden, Card, CardContent, Avatar} from '@material-ui/core';
import {withCookies} from 'react-cookie';
import Axios from "axios";

import StorefrontIcon from '@material-ui/icons/Storefront';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function ShopSettings(props) {
  const { classes, cookies, history } = props;

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center" style={{margin: "10px"}}>
          HIIII
      </Grid>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(memo(withRouter(withCookies(ShopSettings))));
