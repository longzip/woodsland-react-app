import React from "react";
import Moment from "react-moment";
import moment from "moment/min/moment-with-locales";

Moment.globalMoment = moment;
Moment.globalLocale = "vi";
const dateFormat = (cell, row) => {
  return <Moment fromNow>{cell}</Moment>;
};

export default dateFormat;
