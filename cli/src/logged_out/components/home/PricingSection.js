import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  Button,
  withWidth,
  withStyles
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";
import {withCookies} from 'react-cookie';
import Axios from 'axios';

const styles = theme => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340
    }
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360
    }
  }
});

function PricingSection(props) {
  const { width, classes, cookies } = props;

  const [items, setItems] = useState([]);

  Axios
  .get('/api/getItems')
  .then(res => {
    setItems(res.data);
  })
  .catch();

  const onClickItem = (item) => {
    let items = cookies.get('cartItems') || [];
    let price = parseInt(cookies.get('price')) || 0;

    items.push(item);
    price += parseInt(item.price);

    cookies.set('cartItems', items, {path: '/'});
    cookies.set('price', price, {path: '/'});
  }

  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        قیمت ها
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid
          container
          spacing={calculateSpacing(width)}
          className={classes.gridContainer}
        >
          {
            items.map(item => {
              return(
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  className={classes.cardWrapper}
                  data-aos="zoom-in-up"
                  style={{direction: "rtl"}}
                >
                  <Button
                    onClick={() => {onClickItem({id: item._id, name: item.name, price: item.price});}}
                  >
                    <PriceCard
                      title={item.name}
                      pricing={
                        <span>
                          {item.price} هزار تومان
                          <Typography display="inline"> / {item.dueDay} روز</Typography>
                        </span>
                      }
                      features={[item.description,]}
                    />
                  </Button>
                </Grid>
              );
            })
          }
        </Grid>
      </div>
    </div>
  );
}

PricingSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(withCookies(PricingSection))
);
