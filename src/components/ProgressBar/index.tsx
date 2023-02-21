import React from "react";
import { LinearProgress, Typography, Theme, makeStyles, LinearProgressProps } from "@material-ui/core";

type ThemeProps = {
  backgroundColor: string;
  progressColor: string;
}
const useStyles = makeStyles<Theme, ThemeProps>((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: "96%",
  },
  colorPrimary: {
    backgroundColor: ({ backgroundColor }) =>
      backgroundColor || theme.Colors.white,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: ({ progressColor }) => progressColor || theme.Colors.mediumGreenShade,
  },
  progressText: {
    fontSize: theme.MetricsSizes.small,
    fontWeight: theme.fontWeight.medium,
    marginRight: 5,
    marginLeft: 5,
  },
}));

type Props = LinearProgressProps & {
  value: number | string;
  width?: number | string;
  backgroundColor?: string;
  progressColor?: string;
  showProgressValue?: boolean;
  variant?: string;
};

const ProgressBar = (props: Props) => {
  const {
    value,
    width,
    progressColor,
    backgroundColor,
    showProgressValue,
    ...rest
  } = props;
  const { progressText, ...progressBarClasses } = useStyles({
    progressColor,
    backgroundColor,
  });
  return (
    <div
      style={{
        width: width || "100%",
        display: "flex",
        alignItems: "center",
        border: '1px solid'
      }}
    >
      {showProgressValue && (
        <Typography className={progressText}>0%</Typography>
      )}
      <LinearProgress
        variant="determinate"
        value={value}
        classes={progressBarClasses}
        {...rest}
      />
      {showProgressValue && (
        <Typography className={progressText}>{value}%</Typography>
      )}
    </div>
  );
};

export default ProgressBar
