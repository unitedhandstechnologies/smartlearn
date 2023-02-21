import React from 'react';
import ToggleButton from 'react-toggle-button';
type Toggle = {
  Value?: any;
  onClick?: (e: any) => void;
};
const CheckStatus = (props: Toggle) => {
  const { Value, onClick } = props;
  const borderRadiusStyle = { borderRadius: 2 };

  return (
    <ToggleButton
      value={Value}
      thumbStyle={borderRadiusStyle}
      trackStyle={borderRadiusStyle}
      onToggle={onClick}
    />
  );
};
export default CheckStatus;
