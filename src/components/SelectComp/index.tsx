import React, { useEffect, useState } from 'react';
import { Check } from '@material-ui/icons';
import {
  Grid,
  makeStyles,
  Theme,
  Typography,
  useTheme,
  Checkbox
} from '@material-ui/core';
type styleProps = {
  checkColor?: string;
};
const useStyles = makeStyles<Theme, styleProps>((theme: Theme) => {
  return {
    radio: {
      alignSelf: 'flex-start'
    },
    checkBox: {
      marginLeft: theme.MetricsSizes.regular_x,
      color: theme.Colors.greyScaleMedium,
      '&.MuiCheckbox-colorSecondary.Mui-checked': {
        backgroundColor: theme.Colors.white,
        color: theme.Colors.primary
      }
    },
    activeCheckIcon: {
      marginLeft: theme.MetricsSizes.regular_x,
      color: (props) => props.checkColor || theme.Colors.secondary,
      width: 24,
      height: 24
    },
    textStyle: {
      marginLeft: theme.spacing(2.5),
      fontSize: theme.MetricsSizes.small_xx + 1,
      color: theme.Colors.mediumGrey,
      fontWeight: theme.fontWeight.bold
    }
  };
});

export const UH_SELECT_TYPE = {
  single: 'single',
  multiple: 'multiple'
};

type Props = {
  initialValue: number[];
  handleChangeItem?: (selId: number[]) => void;
  checkColor?: string;
  labelData: { label: string; value: number }[];
  type?: string;
  isCheckbox?: boolean;
  isCheck?: boolean;
};
const SelectComp = ({
  initialValue,
  handleChangeItem,
  checkColor,
  labelData,
  type = UH_SELECT_TYPE.single,
  isCheckbox,
  isCheck
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const classes = useStyles({ checkColor });
  const theme = useTheme();

  const onChangeItems = (Items: number[]) => {
    if (handleChangeItem) {
      handleChangeItem(Items);
    } else {
      setSelectedItem(Items);
    }
  };

  const isSelectedItem = (selVal: number) => {
    const filterItems = selectedItem.filter(
      (selectedItem) => selVal !== selectedItem
    );
    if (filterItems.length < selectedItem.length) {
      onChangeItems(filterItems);
      return true;
    } else {
      return false;
    }
  };

  const onclickItem = (item?: { label: string; value: number }) => {
    if (type === UH_SELECT_TYPE.multiple) {
      if (!!isSelectedItem(item.value)) {
        return;
      }
      onChangeItems([...selectedItem, item.value]);
    }
    if (type === UH_SELECT_TYPE.single) {
      onChangeItems([item.value]);
    }
  };

  useEffect(() => {
    setSelectedItem(initialValue);
  }, [initialValue]);

  return (
    <Grid container spacing={1} direction="row">
      {labelData.map((item, index) => {
        const findActiveSelItem: number = selectedItem.findIndex(
          (selItem) => selItem === item.value
        );
        const isActive: boolean = findActiveSelItem !== -1;
        return (
          <Grid
            item
            xs={3}
            container
            key={index}
            onClick={() => onclickItem(item)}
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h6"
                style={{
                  color: theme.Colors.mediumGrey,
                  fontWeight: theme.fontWeight.bold,
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </Typography>
            </Grid>
            {isCheckbox ? (
              <Grid item>
                <Checkbox className={classes.checkBox} checked={isActive} />
              </Grid>
            ) : null}
            {isCheck ? (
              <Grid item>
                {isActive ? (
                  <Check className={classes.activeCheckIcon} />
                ) : null}
              </Grid>
            ) : null}
          </Grid>
        );
      })}
    </Grid>
  );
};
export default SelectComp;
