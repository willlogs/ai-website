import React, { memo, setState, useState } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  Grid,
  Badge,
  IconButton,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BookIcon from "@material-ui/icons/Book";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import Axios from "axios";
import {withCookies} from 'react-cookie';

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    direction: "rtl"
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight
  },
  noDecoration: {
    textDecoration: "none !important"
  }
});

function NavBar(props) {
  const {
    classes,
    openRegisterDialog,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab,
    cookies,
    history
  } = props;

  const [isAuth, setAuth] = useState(false);

  Axios
  .get("/login/isauth")
  .then(res => {
    if(res.data.isAuth != isAuth){
      setAuth(res.data.isAuth);
    }
    
    console.log("logged in");
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

  let cartItems = cookies.get('cartItems') || [];
  let uname = cookies.get('username') || "null";

  const notAuthItems = [
    {
      name: "ثبت نام",
      onClick: openRegisterDialog
    },
    {
      name: "ورود",
      onClick: openLoginDialog
    }
  ]

  const menuItems = [
    {
      link: "/",
      name: "خانه",
      icon: <HomeIcon className="text-white" />
    },
    {
      link: "/blog",
      name: "وبلاگ",
      icon: <BookIcon className="text-white" />
    },
    {
      link: "/404",
      name: "لینک اضافی"
    },
  ];

  const allItems = [
    {
      link: "/",
      name: "خانه",
      icon: <HomeIcon className="text-white" />,
      noAuth: true
    },
    {
      link: "/blog",
      name: "وبلاگ",
      icon: <BookIcon className="text-white" />,
      noAuth: true
    },
    {
      link: "/404",
      name: "لینک اضافی",
      noAuth: true
    },
    {
      name: "ثبت نام",
      onClick: openRegisterDialog,
      isAuth: false
    },
    {
      name: "ورود",
      onClick: openLoginDialog,
      isAuth: false
    }
  ]

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Grid item xs={10}>
            <Grid container>
              <div>
                <Typography
                  variant="h4"
                  className={classes.brandText}
                  display="inline"
                  color="primary"
                >
                  لوگو
                </Typography>
                <Typography
                  variant="h4"
                  className={classes.brandText}
                  display="inline"
                  color="secondary"
                >
                  عهد
                </Typography>
              </div>
              <div>
                <Hidden mdUp>
                  <IconButton
                    className={classes.menuButton}
                    onClick={handleMobileDrawerOpen}
                    aria-label="Open Navigation"
                    color="primary"
                  >
                    <MenuIcon color="primary" />
                  </IconButton>
                </Hidden>
                <Hidden smDown>
                  {menuItems.map(element => {
                    if (element.link) {
                      return (
                        <Link
                          key={element.name}
                          to={element.link}
                          className={classes.noDecoration}
                          onClick={handleMobileDrawerClose}
                        >
                          <Button
                            color="primary"
                            size="large"
                            classes={{ text: classes.menuButtonText }}
                          >
                            {element.name}
                          </Button>
                        </Link>
                      );
                    }
                    return (
                      <Button
                        color="primary"
                        size="large"
                        onClick={element.onClick}
                        classes={{ text: classes.menuButtonText }}
                        key={element.name}
                      >
                        {element.name}
                      </Button>
                    );
                  })}
                  {
                    !isAuth && 
                    notAuthItems.map(element => {
                      if (element.link) {
                        return (
                          <Link
                            key={element.name}
                            to={element.link}
                            className={classes.noDecoration}
                            onClick={handleMobileDrawerClose}
                          >
                            <Button
                              color="primary"
                              size="large"
                              classes={{ text: classes.menuButtonText }}
                            >
                              {element.name}
                            </Button>
                          </Link>
                        );
                      }
                      return (
                        <Button
                          color="primary"
                          size="large"
                          onClick={element.onClick}
                          classes={{ text: classes.menuButtonText }}
                          key={element.name}
                        >
                          {element.name}
                        </Button>
                      );
                    }) 
                  }
                </Hidden>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            {
              isAuth &&
              <Button color="primary" onClick={() => { history.push("/c"); }}>
                داشبورد
              </Button>
            }
            <Button>
              <Badge badgeContent={cartItems.length} color="secondary" onClick={() => { history.push("/c");}}>
                <ShoppingCartIcon fontSize="small" color="primary" style={{}}/>
              </Badge>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={allItems}
        anchor="left"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
        isAuth={isAuth}
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(withRouter(withCookies(NavBar))));
