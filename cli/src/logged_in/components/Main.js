import React, { memo, useState, Fragment, useRef } from "react";
import { withRouter, Switch, Route, Router, Link } from 'react-router';
import PropTypes from "prop-types";
import { withStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, Grid, Hidden, Card, CardContent} from '@material-ui/core';
import {withCookies} from 'react-cookie';
import Axios from "axios";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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

const postToCart = async (uname, id) => {
  return await Axios.post('/api/addtocart', {
    username: uname,
    id: id
  });
}

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

function Main(props) {
  const { classes, cookies, history } = props;

  const [isAuth, setAuth] = useState(false);
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [response, setResponse] = useState("...");

  const inputRef = useRef();

  const sendToServer = (url) => {
    Axios.post('/api/' + url, {input: inputRef.current.value})
    .then(res => {
      setResponse(res.data.response);
    })
    .catch();
  }

  let cartItems = cookies.get('cartItems') || [];
  let price = cookies.get('price') || 0;
  let uname = cookies.get('username');

  const forceUpdate = useForceUpdate();

  Axios
  .get('/api/getitems')
  .then(
    res => {
      if(items.length < res.data.length)
        setItems(res.data);
    }
  )
  .catch(err => console.log(err));

  Axios
  .post('/api/getCart', {username: uname})
  .then(
    res => {
      if(myItems.length < res.data.items.length){
        let newMyItems = [];
        res.data.items.forEach(itm => {
          newMyItems.push(itm.id);
        });
        setMyItems(newMyItems);
      }
    }
  )
  .catch(err => console.log(err));

  Axios
  .get("/login/isauth")
  .then(res => {
    if(res.data.isAuth != isAuth){
      setAuth(res.data.isAuth);
    }
  })
  .catch(err => {
    console.log(err);
  });

  if(isAuth){
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar style={{direction: "rtl"}}>
            <Typography variant="h6" className={classes.title} style={{marginLeft:"10px", marginRight:"10px"}}>
              داشبورد
            </Typography>
            <Button color="secondary" onClick={() => {history.push('/');}}>
              صفحه اصلی
            </Button>
            <Button color="secondary" onClick={() => {history.push('/c');}}>
              سبد خرید
            </Button>
            <Button color="secondary" onClick={() => {
              Axios.get('/login/logout');
              history.push('/');
            }}>
              خروج
            </Button>
          </Toolbar>
        </AppBar>
        <Hidden smDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="right"
          >
            <List>
              {items.map((itm, index) => (
                <Button style={{width: "100%"}} disabled={!myItems.includes(itm._id)} key={index} onClick={
                  () => {
                    history.push("/c/" + itm._id);
                  }
                }>
                  {itm.name}
                </Button>
              ))}
            </List>
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          {items.map((itm, index) => (
            <Button style={{width: "100%"}} disabled={!myItems.includes(itm._id)} key={index} onClick={
              () => {
                history.push("/c/" + itm._id);
              }
            }>
              {itm.name}
            </Button>
          ))}
          <Divider style={{marginTop: "5px", marginBottom: "5px"}}/>
        </Hidden>
            
        <Router history={history}>
          <Route path="/c" exact>
            <Grid container justify="center" alignItems="center" direction="column" style={{marginTop: "50px"}}>
              <Typography variant="h6">
                محصولات داخل سبد
              </Typography>
              {
                price > 0
                ?
                cartItems.map(element => {
                  return(
                    <Typography>
                      {element.name}
                    </Typography>
                  );
                })
                :
                <Typography>
                  سبد خالی است
                </Typography>
              }
              {
                price > 0 &&
                <Button onClick={() => {
                    cartItems.forEach(element => {
                      postToCart(uname, element.id);
                    });
                    cookies.set('cartItems', [], {path: '/'});
                    cookies.set('price', 0, {path: '/'});
                    forceUpdate();
                  }}
                  variant="outlined"
                >
                  پرداخت {price} هزار تومان
                </Button>
              }
            </Grid>
          </Route>
          {
            items.map((itm, idx) =>{
              return(
                <Route key={idx} path={'/c/' + itm._id} exact>
                  <Grid container direction="column" alignItems="center" justify="center">
                    <Typography variant="h6">{itm.name}</Typography>
                    <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="متن خود را وارد کنید" style={{marginLeft: "20px", marginRight: "20px", marginTop: "100px", maxWidth: "700px", width: "95%"}} ref={inputRef}/>
                    <Button style={{marginLeft: "20px", marginRight: "20px", maxWidth: "700px", width: "95%"}} onClick={() => sendToServer(itm.url)}>ثبت</Button>
                    <Card style={{marginLeft: "20px", marginRight: "20px", maxWidth: "700px", width: "95%"}}>
                      <CardContent style={{direction:"rtl"}}>
                        <Typography variant="h6">نتیجه</Typography>
                        <Typography>{response}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Route>
              );
            })
          }
        </Router>
      </Fragment>
    );
  }
  else{
    return(
      <Fragment>
        <AppBar position="static">
          <Toolbar style={{direction: "rtl"}}>
            <Typography variant="h6" className={classes.title}>
              داشبورد
            </Typography>
            <Button color="secondary" onClick={() => {history.push('/');}}>
              بازگشت
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Typography variant="h5" style={{margin: "20px"}}>
            برای دسترسی به این بخش گزینه بازگشت را انتخاب و سپس با استفاده از دکمه ورود در منو وارد شوید
          </Typography>
        </Grid>
      </Fragment>
    );
  }  
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(withRouter(withCookies(Main))));
