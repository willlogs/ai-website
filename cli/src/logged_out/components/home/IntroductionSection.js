import React, { Fragment, useEffect } from "react";
import { withStyles, withWidth, Typography, Grid, Card, CardContent } from "@material-ui/core";

const styles = theme => ({
  mainContainer: {
    backgroundColor: 'white',
    paddingBottom: theme.spacing(2),
    direction: 'rtl',
  }
});

function IntroductionSection(props) {
  const { classes, theme } = props;

  return (
    <Grid container className={classes.mainContainer} direction="column" justify="center" alignContent="center">
      <Typography variant="h4" style={{marginBottom: "20px"}}>
        قضیه چیه؟!
      </Typography>
      <Typography style={{width: "700px", maxWidth: "60%", minWidth: "250px"}}>
        پیج های پربازدید معمولا برای کسب درآمد راهی جز
        انجام تبلیغات غیر مرتبط به پیج ندارند. همچنین پیشنهاد تبلیغات 
        درآمد ثابتی را تضمین نخواهد کرد چرا که فاصله بین پیشنهاد ها ممکن است 
        زیاد باشد. تم با تولید محصولات سفارشی هماهنگ با محتوای پیج اینستاگرامیتون 
        بهتون کمک میکنه بدون وابستگی به تبلیغات غیر مرتبط بتونید از فالور های پیجتون کسب 
        درآمد کنید.<br />
        تم تمام دردسر های مختلف این کار رو به دوش میکشه و با پشتیبانی کامل محصولات رو 
        به دست فالور های شما میرسونه و رضایتشونو کسب میکنه و با هر خرید انجام شده توسط 
        فالور های شما، بخشی از اون پول به حساب شما واریز میشه.<br /><br />
        به همین راحتی!
      </Typography>
    </Grid>
  );
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(IntroductionSection)
);
