import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import BuildIcon from "@material-ui/icons/Build";
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CloudIcon from "@material-ui/icons/Cloud";
import MeassageIcon from "@material-ui/icons/Message";
import CancelIcon from "@material-ui/icons/Cancel";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "خدمت 1",
    text:
      "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "خدمت 2",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "خدمت 3",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#d50000",
    headline: "خدمت 4",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#DD2C00",
    headline: "خدمت 5",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#64DD17",
    headline: "خدمت 6",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },
  {
    color: "#304FFE",
    headline: "خدمت 7",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <CloudIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#C51162",
    headline: "خدمت 8",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <CodeIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#00B8D4",
    headline: "خدمت 9",
    text:
    "ما این خدمت را به شما ارائه می دهیم و شما می توانید از آن استفاده نمایید ولی باید حتما پولشو هم پرداخت نمایید.",
    icon: <CancelIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  }
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          خدمات
        </Typography>
        <div className="container-fluid" style={{direction:'rtl'}}>
          <Grid container spacing={calculateSpacing(width)}>
            {features.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                style={{direction: 'rtl'}}
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
