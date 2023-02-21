import React from 'react';
import { useState } from 'react';
import {
  Grid,
  makeStyles,
  Theme,
  Typography,
  createStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  useTheme
} from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { RupeeSign } from 'src/Assets/Images';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextInputComponent from '../TextInputComponent';

type Props = {
  bgColor: string;
  height: string;
  textColor: string;
};
const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    headingContainer: {
      padding: theme.spacing(1),
      background: theme.Colors.whitePrimary,
      borderBottom: '3px solid',
      borderBottomColor: theme.Colors.accentGrey
    },
    listItemContainer: {
      padding: theme.spacing(1),
      borderBottom: '1px solid',
      borderBottomColor: theme.Colors.accentGrey
    },
    headingStyle: {
      fontSize: theme.MetricsSizes.regular,
      fontWeight: theme.fontWeight.bold,
      color: theme.Colors.primary
    },
    listItemsStyle: {
      fontSize: theme.MetricsSizes.regular,
      fontWeight: theme.fontWeight.regular,
      color: (props) => props.textColor || theme.Colors.greyPrimary
    },
    addNewContainer: {
      padding: theme.spacing(1),
      borderBottom: '1px solid',
      borderBottomColor: theme.Colors.accentGrey,
      background: theme.Colors.lightShadeGrey,
      cursor: 'pointer'
    },
    addNewStyle: {
      fontSize: theme.MetricsSizes.small_xxx,
      fontWeight: theme.fontWeight.mediumBold,
      color: theme.Colors.primary
    },
    imageStyle: {
      width: theme.spacing(5),
      height: theme.spacing(5)
    },
    IconContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    amountFieldStyle: {
      display: 'flex',
      backgroundColor: theme.Colors.whitePrimary,
      padding: theme.MetricsSizes.small_x,
      width: 93,
      height: theme.MetricsSizes.large_x,
      alignItems: 'center'
    },
    textStyle: {
      textTransform: 'capitalize'
    }
  })
);

export const ItemListingComp = ({
  backgroundColor,
  height,
  heading,
  listOfItems,
  withEditField = false,
  isAvatarImg = false,
  isEditIcon = true,
  isAddButton = true,
  isName = true,
  isPincode,
  handleAddNewListItem,
  handleEditListItem,
  renderListItemIcons,
  textColor
}: {
  backgroundColor?: string;
  height?: string;
  heading: string;
  textColor?: string;
  listOfItems: any[];
  withEditField?: boolean;
  isAvatarImg?: boolean;
  isEditIcon?: boolean;
  isAddButton?: boolean;
  isName?: boolean;
  isPincode?: boolean;
  handleAddNewListItem?: () => void;
  handleEditListItem?: (item: any) => void;
  renderListItemIcons?: (item: any) => React.ReactNode;
}) => {
  const classes = useStyles({
    bgColor: backgroundColor,
    height,
    textColor: textColor
  });
  const theme = useTheme();

  return (
    <Grid container direction="column">
      <Grid item className={classes.headingContainer}>
        <Typography className={classes.headingStyle}>{heading}</Typography>
      </Grid>
      <Grid item>
        <List disablePadding>
          {listOfItems.map((item, index) => {
            return (
              <ListItem key={index} className={classes.listItemContainer}>
                {isAvatarImg ? (
                  <ListItemAvatar>
                    <Avatar className={classes.imageStyle}>
                      <img src={item?.image_url} alt="image" />
                    </Avatar>
                  </ListItemAvatar>
                ) : null}
                <ListItemText
                  className={classes.listItemsStyle}
                  primary={
                    isName ? item?.name : isPincode ? item?.pincode : item?.area
                  }
                  disableTypography={true}
                />
                <ListItemSecondaryAction className={classes.IconContainer}>
                  {renderListItemIcons ? renderListItemIcons(item) : null}
                  {withEditField ? (
                    <Grid className={classes.amountFieldStyle}>
                      <img src={RupeeSign} alt="image" />
                      <Typography variant="h4" color="primary">
                        {item?.price}
                      </Typography>
                    </Grid>
                  ) : null}
                  {isEditIcon ? (
                    <IconButton
                      edge="end"
                      onClick={() => handleEditListItem(item)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  ) : null}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}

          {isAddButton ? (
            <ListItem className={classes.addNewContainer}>
              <ListItemText
                className={classes.addNewStyle}
                primary={'+ ADD NEW'}
                disableTypography={true}
                onClick={handleAddNewListItem}
              />
            </ListItem>
          ) : null}
        </List>
      </Grid>
    </Grid>
  );
};
