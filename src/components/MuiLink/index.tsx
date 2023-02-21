import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  miLink: {
    opacity: 1,
    color: theme.Colors.primary,
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.MetricsSizes.small_xxx,
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    "&:hover": {
      color: theme.Colors.primary,
      textDecoration: "none",
    },
  },
}));

const MuiLink = ({ to, value }) => {
  const classes = useStyles();

  return (
    <Link to={to} className={classes.miLink}>
      {value}
    </Link>
  );
};

export default React.memo(MuiLink);
