import { Avatar, Badge, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { RupeeSign } from 'src/Assets';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  textStyle: {
    color: theme.Colors.greyLight
  },
  avatarStyle: {
    height: 42,
    width: 42
  },
  badgeStyle: {
    marginLeft: theme.MetricsSizes.tiny_xxx,
    '& .MuiBadge-badge': {
      background: theme.Colors.redPrimary,
      fontSize: theme.MetricsSizes.tiny_xx,
      fontWeight: theme.fontWeight.regular,
      padding: theme.spacing(1, 0),
      color: theme.Colors.white
    }
  }
}));
type Props = {
  avatarImg?: string;
  title: any;
  subTitle?: string;
  renderComponent?: () => JSX.Element;
  avatarClassNameStyles?: any;
  titleStyle?: React.CSSProperties;
  isBadgeEnable?: boolean;
  isSymbol?: boolean;
  listStyle?: React.CSSProperties;
};

const ListItemCell = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const {
    avatarImg,
    subTitle,
    title,
    renderComponent,
    avatarClassNameStyles,
    titleStyle,
    isBadgeEnable = false,
    listStyle,
    isSymbol
  } = props;

  return (
    <Grid
      container
      alignItems="center"
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        ...listStyle
      }}
    >
      {avatarImg && (
        <Grid item style={{ marginRight: theme.MetricsSizes.small_xxx }}>
          <Avatar
            src={avatarImg}
            className={`${classes.avatarStyle} ${avatarClassNameStyles}`}
          />
        </Grid>
      )}
      <Grid item xs>
        <Grid
          style={{
            display: 'flex'
          }}
        >
          {isSymbol ? <img src={RupeeSign} /> : null}
          <Typography
            style={{
              fontWeight: theme.fontWeight.medium,
              fontSize: theme.MetricsSizes.small_xxx,
              color: theme.Colors.blackMedium,
              ...titleStyle
            }}
          >
            {title}
          </Typography>
          {isBadgeEnable && (
            <Badge
              overlap="circular"
              badgeContent={'Kgs'}
              className={classes.badgeStyle}
            />
          )}
        </Grid>

        {subTitle && (
          <Typography variant="subtitle2" className={classes.textStyle}>
            {subTitle}
          </Typography>
        )}
        {renderComponent && renderComponent()}
      </Grid>
    </Grid>
  );
};
export default ListItemCell;
