import React, { memo, useState, Fragment, useRef } from "react";
import { withRouter, Switch, Route, BrowserRouter, Link } from 'react-router-dom';
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

import Charts from './Charts';
import ShopSettings from './ShopSettings';

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

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const menuItems = [
  {
    link: '/c/shopsettings',
    title: 'تنظیمات فروشگاه',
    icon: StorefrontIcon
  },
  {
    link: '/c/charts',
    title: 'نمودار فروش',
    icon: ShowChartIcon
  },
  {
    link: '/c/payreq',
    title: 'درخواست تسویه حساب',
    icon: CreditCardIcon
  }
];

function Main(props) {
  const { classes, cookies, history } = props;

  const [state, setState] = useState({
    drawerOpen: false
  });

  const toggleDrawer = () => {
    setState({
      drawerOpen: !state.drawerOpen
    });
  }

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar style={{direction: "rtl"}}>

          <Avatar alt="customer"> C </Avatar>
          <Typography variant="h6" className={classes.title} style={{marginLeft:"10px", marginRight:"10px"}}>
            داشبورد
          </Typography>
          <Button color="secondary" onClick={() => {history.push('/');}}>
            صفحه اصلی
          </Button>
          <Button color="secondary" onClick={toggleDrawer}>
            منو
          </Button>

          <SwipeableDrawer
            open={state.drawerOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            anchor="right"
          >
            <List>
              {
                menuItems.map((element, idx) => {
                  return(
                    <ListItem key={"menuitem-" + idx}>
                      <ListItemIcon>
                        <element.icon />
                      </ListItemIcon>
                      <ListItemText>
                        <Button variant="contained" color="primary" style={{width: "100%"}} onClick={() => {
                          history.replace("/empty");
                          setTimeout(() => {
                            history.replace(element.link);
                          });
                        }}>
                          {element.title}
                        </Button>
                      </ListItemText>
                    </ListItem>
                  );
                })
              }
            </List>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>      

      <Grid container direction="column" justify="center" alignItems="center" style={{margin: "10px"}}>
        <Typography style={{direction: "rtl"}} color="secondary">
          مشتری گرامی لاشی سگ، خوش آمدید
        </Typography>
        <Typography variant="h5" style={{direction: "rtl"}}>
          باقیمانده کیف پول:
        </Typography>
        <Typography style={{direction: "rtl"}}>
          540 هزار تومان
        </Typography>
      </Grid>
      
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/c/charts"
            component={Charts}
          />
          <Route
            exact
            path="/c/shopsettings"
            component={ShopSettings}
          />
        </Switch>
      </BrowserRouter>

    </Fragment>
  );  
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(withRouter(withCookies(Main))));
