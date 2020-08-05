import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import HeadSection from "./HeadSection";
import IntroductionSection from "./IntroductionSection";
import HowItWorksSection from "./HowItWorksSection";

import PricingSection from "./PricingSection";
import WaveBorder from "../../../shared/components/WaveBorder";
import { withStyles, withWidth } from "@material-ui/core";

const styles = theme => {
  waveBorder: {
    paddingTop: theme.spacing(4)
  }
};

function Home(props) {
  const { selectHome, classes, theme } = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);

  return (
    <Fragment>
      <HeadSection />

      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />

      <IntroductionSection />

      <WaveBorder
        upperColor='#ffffff'
        lowerColor={theme.palette.secondary.main}
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />

      <HowItWorksSection />

      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />

    </Fragment>
  );
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(Home)
);
