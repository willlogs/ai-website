import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth, Button } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import BuildIcon from "@material-ui/icons/Build";
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CloudIcon from "@material-ui/icons/Cloud";
import MeassageIcon from "@material-ui/icons/Message";
import Add from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";
import {withCookies} from 'react-cookie';

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "داده‌کاوی",
    text:
      "داده‌کاوی به مفهوم استخراج اطلاعات نهان و یا الگوها و روابط مشخص در حجم زیادی از داده‌ها در یک یا چند بانک اطلاعاتی بزرگ است. داده‌کاوی، پایگاه‌ها و مجموعه‌ حجیم داده‌ها را در پی کشف و استخراج، مورد تحلیل قرار می‌دهد.",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "تحلیل فضای وب",
    text:
    "شبکه‌های اجتماعی، متشکل از افراد، گروه‌ها و ارتباطات بین آنها است. افراد و گروه‌های عضو آن گره‌های را تشکیل می‌دهند و وابستگی‌های بین این افراد یال‌های بین گره‌ها را تشکیل می‌دهند. با افزایش گره‌ها و یال‌ها شبکه هم پیچیده‌تر می‌شود و می‌توان با آنالیز شبکه آنها را تحلیل و بررسی کرد.",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "هوش تجاری",
    text:
    "هوش کسب و کار و یا هوش تجاری، مجموعه‌ای از نظریات، روش‌ها، فرایندها، معماری‌ها و فناوری‌هایی است که برای تبدیل داده خام به اطلاعات مفید و معنادار استفاده می‌شود. هوش کسب و کار مقادیر بزرگی از اطلاعات را برای شناسایی و توسعه فرصت‌های جدید بکار می‌گیرد.",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#d50000",
    headline: "متن‌کاوی",
    text:
    "متن‌کاوی، به داده‌کاوی‌ای که بر روی متن انجام شود اشاره دارد. همچنین به عنوان آنالیز متن نیز شناخته می‌شود که منظور از آن فرایند استخراج اطلاعات با کیفیت از متن است. اطلاعات، از فهم الگوها و گرایشها از طریق معانی و بوسیله یادگیری الگوهای آماری حاصل می‌شود.",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#DD2C00",
    headline: "خدمت تولید سامانه‌های هوشمند",
    text:
    "تولید سامانه‌های هوشمند پردازش و تحلیل داده‌های غیرساختاریافته مانند داده‌های متنی، تصاویر، ویدئو و صوت",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#64DD17",
    headline: "خدمات هوشمند استخراج اطلاعات",
    text:
    "ارائه خدمات هوشمند استخراج اطلاعات نهان و الگوها و همچنین روابط میان آن‎ها از میان حجم زیادی از داده‎ها اعم از فضای مجازی و …",
    icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },
  {
    color: "#304FFE",
    headline: "ذخیره‌سازی و پردازش کلان‌داده‌ها",
    text:
    "ارائه خدمات ذخیره‌سازی، نگهداری، جستجو و پردازش کلان‌داده‌ها بر بستر سکوهای ذخیره‌سازی و پردازش کلان‌داده",
    icon: <CloudIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  }
];

function FeatureSection(props) {
  const { width, cookies } = props;

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          خدمات
        </Typography>
        <div className="container-fluid" style={{direction:'rtl'}}>
          <Grid container spacing={calculateSpacing(width)}>
            {features.map((element, i) => (
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

export default withWidth()(withCookies(FeatureSection));
