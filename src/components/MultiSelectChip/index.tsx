import React, { useState, useEffect } from 'react';
import { ChipComp } from './ChipComp';
import { Box, useTheme } from '@material-ui/core';

const types = {
  SINGLE_SELECT: 'SINGLE_SELECT',
  MULTI_SELECT: 'MULTI_SELECT'
};

type Props = {
  chipItems: string[];
  selectedChipItem?: string[];
  chipType?: string;
  handleChange?: (item: string[]) => void;
  activeBgColor?: string;
  color?: string;
  size?: string;
  chipStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  chipBorderColor?: string;
};

const MultiSelectChip = (props: Props) => {
  const {
    chipItems,
    selectedChipItem,
    chipType = types.SINGLE_SELECT,
    handleChange,
    activeBgColor,
    color,
    chipStyle,
    containerStyle,
    chipBorderColor
  } = props;
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<string[]>(
    selectedChipItem || []
  );

  const onChangeChip = (items: any) => {
    if (handleChange) {
      handleChange(items);
    } else {
      setSelectedItem(items);
    }
  };

  const isUnselected = (itemData: string) => {
    const items = selectedItem.filter(
      (selectedItem) => itemData !== selectedItem
    );
    if (items.length < selectedItem.length) {
      //  onChangeChip(items);
      return true;
    }
    return false;
  };

  const handleOnClick = (item: string) => {
    if (isUnselected(item)) {
      return;
    }
    if (chipType === types.MULTI_SELECT) {
      onChangeChip([...selectedItem, item]);
    } else {
      onChangeChip([item]);
    }
  };

  const getChipBackgroundColor = (isActive: boolean) => {
    if (isActive) {
      return activeBgColor || theme.Colors.primary;
    }
    return theme.Colors.white;
  };

  useEffect(() => {
    setSelectedItem(selectedChipItem);
  }, [selectedChipItem]);

  return (
    <Box
      sx={{
        display: 'flex',
        ...containerStyle
      }}
    >
      {chipItems.map((item, index) => {
        const findActiveChip: number = selectedItem.findIndex(
          (selItem) => selItem === item
        );
        const isActive: boolean = findActiveChip !== -1;
        return (
          <ChipComp
            onClick={() => handleOnClick(item)}
            label={item}
            key={index}
            style={{
              marginRight: theme.spacing(1),
              color: isActive ? theme.Colors.white : theme.Colors.primary,
              backgroundColor: getChipBackgroundColor(isActive),
              fontSize: theme.MetricsSizes.tiny_xxx,
              fontWeight: isActive
                ? theme.fontWeight.medium
                : theme.fontWeight.regular,
              borderWidth: '1px',
              borderColor: chipBorderColor || theme.Colors.primary,
              ...chipStyle
            }}
          />
        );
      })}
    </Box>
  );
};

export default MultiSelectChip;
