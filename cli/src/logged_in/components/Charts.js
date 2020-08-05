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
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
    {
        name: '0', uv: 4000,
    },
    {
        name: '1', uv: 3000,
    },
    {
        name: '2', uv: 2000,
    },
    {
        name: '3', uv: 2780,
    },
    {
        name: '4', uv: 1890,
    },
    {
        name: '5', uv: 2390,
    },
    {
        name: '6', uv: 3490,
    },
    {
        name: '0', uv: 4000,
    },
    {
        name: '1', uv: 3000,
    },
    {
        name: '2', uv: 2000,
    },
    {
        name: '3', uv: 2780,
    },
    {
        name: '4', uv: 1890,
    },
    {
        name: '5', uv: 2390,
    },
    {
        name: '6', uv: 3490,
    },
    {
        name: '0', uv: 4000,
    },
    {
        name: '1', uv: 3000,
    },
    {
        name: '2', uv: 2000,
    },
    {
        name: '3', uv: 2780,
    },
    {
        name: '4', uv: 1890,
    },
    {
        name: '5', uv: 2390,
    },
    {
        name: '6', uv: 3490,
    },
];

const drawerWidth = 200;

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
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

function Charts(props) {
  const { classes, cookies, history } = props;

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center" style={{margin: "10px"}}>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
      </Grid>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(memo(withRouter(withCookies(Charts))));
