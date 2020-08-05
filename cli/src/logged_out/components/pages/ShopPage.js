import React, { Fragment, useEffect } from "react";
import { 
    withStyles,
    withWidth,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    CardHeader,
    CardMedia,
    AppBar,
    Toolbar,
    Avatar,
    Paper
} from "@material-ui/core";
import { Link } from "react-router-dom";
import qs from 'querystring';

import dummyImage from "../../../img/logo.png";

const styles = theme => ({
  mainContainer: {
    backgroundColor: 'white',
    paddingBottom: theme.spacing(2),
    direction: 'rtl',
  },
  cardRoot: {
    maxWidth: "345px",
    width: "25%",
    margin: '7px'
  },
  media: {
    height: 0,
    paddingTop: '70%', // 16:9
  }
});

const dummyArray = [0, 1, 2, 3, 4, 5, 6];

function ShopPage(props) {
  const { classes, theme, history } = props;

  let params = qs.parse(props.location.search);

  console.log(params.user);

  return (
    <Grid container className={classes.mainContainer} direction="row" justify="center" alignItems="center">
        <AppBar position="static" color="white">
            <Toolbar>
                <Avatar alt="Tem" style={{marginLeft: "10px"}}/>
                <Typography>
                    فروشگاه
                </Typography>
            </Toolbar>
        </AppBar>

        <Grid item xs={12} md={9} lg={7}>
            <Grid container justify="center">
            {
                dummyArray.map(num => {
                    return(
                        <Card key={num} className={classes.cardRoot}>
                            <CardHeader 
                                title="تیشرت"
                            />
                            <CardContent>
                                تیشرت با تصویر بیبیت
                            </CardContent>
                            <CardMedia 
                                className={classes.media}
                                image={dummyImage}
                            />
                            <CardActions>
                                <Button onClick={() => {history.push("/item");}}>
                                    خرید
                                </Button>
                            </CardActions>
                        </Card>
                    );
                })
            }
            </Grid>
        </Grid>
    </Grid>
  );
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(ShopPage)
);