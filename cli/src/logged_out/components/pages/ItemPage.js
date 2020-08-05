import React, { Fragment, useState, useRef } from "react";
import { 
    withStyles,
    withWidth,
    Typography,
    Grid,
    Button,
    Paper,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    Input
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
  mainPaper: {
      width: "50%",
      minWidth: "400px"
  }
});

function SimpleDialog(props){
  const { onClose, open, title } = props;

  const handleClose = () => {
    onClose();
  };

  return(
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle style={{direction: "rtl"}}>
        {title}
      </DialogTitle>

      <Paper>
        <Grid container direction="column" justify="center" alignItems="center">
          <Input placeholder="نام" style={{width:"80%", direction: "rtl", margin: "10px"}}/>
          <Input placeholder="نام خانوادگی" style={{width:"80%", direction: "rtl", margin: "10px"}}/>
          <Input placeholder="آدرس دقیق" style={{width:"80%", direction: "rtl", margin: "10px"}}/>
          <Input placeholder="کد پستی" style={{width:"80%", direction: "rtl", margin: "10px"}}/>
          <Input placeholder="شماره موبایل" style={{width:"80%", direction: "rtl", margin: "10px"}}/>

          <Typography style={{direction: "rtl"}}>
            برای تسریع روند ارسال لطفا شماره تلفن دارای تلگرام ثبت نمایید
          </Typography>

          <Button>
            پرداخت 50.000 تومان
          </Button>
        </Grid>
      </Paper>
    </Dialog>
  );
}

function ItemsPage(props) {
  const { classes, theme } = props;

  let params = qs.parse(props.location.search);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sizeCategory, setSizeCategory] = useState("M");

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  console.log(params.id);

  return (
    <Grid container justify="center">
        <Paper className={classes.mainPaper}>
            <Grid container className={classes.mainContainer} direction="column" justify="center" alignItems="center">
                <img src={dummyImage} style={{width: "100%"}}/>
                <Typography variant="h2">
                    تیشرت با تصویر بیبیت
                </Typography>

                <Typography>
                    تیشرت با تصویر بیبیت پر فروش ترین تیشرت جهان است. لطفا با دقت در انتخاب سایز از مشکلات آینده پیشگیری نمایید.
                </Typography>
                
                <Select labelId="size" id="sizeSelect" value={sizeCategory} onChange={(event) => { setSizeCategory(event.target.value); }}>
                    <MenuItem value="S">اسمال - Small</MenuItem>
                    <MenuItem value="M">مدیوم - Medium</MenuItem>
                    <MenuItem value="L">لارج - Large</MenuItem>
                    <MenuItem value="XL">ایکس لارج - XLarge</MenuItem>
                </Select>

                <Button onClick={()=>{setDialogOpen(true);}}>
                    خرید
                </Button>
                <SimpleDialog open={dialogOpen} onClose={handleClose} title={"تیشرت با سایز " + sizeCategory}/>
            </Grid>
        </Paper>
    </Grid>
  );
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(ItemsPage)
);