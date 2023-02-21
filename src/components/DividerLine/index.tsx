import { makeStyles, Theme, Divider, createStyles } from '@material-ui/core';

type Props = {
  marginValue?: number;
};

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    horizontalDivider: {
      width: '100%',
      height: 1,
      background: theme.Colors.lightBlue,
      marginTop: (props: Props) => props.marginValue
    }
  })
);

function DividerLine({ marginValue }: { marginValue: number }) {
  const classes = useStyles({ marginValue });

  return <Divider className={classes.horizontalDivider} />;
}

export default DividerLine;
