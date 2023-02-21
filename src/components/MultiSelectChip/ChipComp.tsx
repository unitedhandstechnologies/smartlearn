import React from 'react';
import { Chip, ChipProps } from '@material-ui/core';

type Props = ChipProps & {
  style?: React.CSSProperties;
  label: string;
  size?: string;
  color?: string;
  variant?: string;
  clickable?: boolean;
  onClick?: () => void;
};
export const ChipComp = (props: Props) => {
  const {
    style,
    label,
    clickable = true,
    size = 'medium',
    color,
    variant = 'outlined',
    onClick,
    ...rest
  } = props;

  return (
    <Chip
      color={color}
      clickable={clickable}
      size={size}
      label={label}
      variant={variant}
      style={style}
      onClick={onClick}
      {...rest}
    />
  );
};
