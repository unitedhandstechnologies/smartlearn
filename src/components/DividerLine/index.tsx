import { makeStyles, Theme, Divider, createStyles } from '@material-ui/core';

type Props = {
  marginValue?: number;
  backgroundColor?: any;
};

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    horizontalDivider: {
      width: '100%',
      height: 1,
      background: (props: Props)=>props.backgroundColor ? props.backgroundColor : theme.Colors.lightBlue,
      marginTop: (props: Props) => props.marginValue
    }
  })
);

function DividerLine({ marginValue, backgroundColor }: { marginValue: number, backgroundColor: any }) {
  const classes = useStyles({ marginValue , backgroundColor});

  return <Divider className={classes.horizontalDivider} />;
}

export default DividerLine;
