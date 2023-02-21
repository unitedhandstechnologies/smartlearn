import { Theme, useTheme } from '@material-ui/core';
import React from 'react';
import { ButtonComp } from 'src/components';

type Props = {
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
};
const DialogAction = (props: Props) => {
  const theme: Theme = useTheme();

  const { onLeftButtonClick, onRightButtonClick } = props;
  return (
    <>
      <ButtonComp
        backgroundColor={theme.Colors.grey}
        height="40px"
        buttonText="Cancel"
        buttonFontSize={theme.MetricsSizes.small_xx}
        buttonTextColor={theme.Colors.primary}
        buttonFontWeight={theme.fontWeight.medium}
        btnWidth="95px"
        btnBorderRadius={100}
        onClickButton={onLeftButtonClick}
      />
      <ButtonComp
        backgroundColor={theme.Colors.primary}
        height="40px"
        buttonText="Save"
        buttonFontSize={theme.MetricsSizes.small_xx}
        buttonTextColor={theme.Colors.white}
        buttonFontWeight={theme.fontWeight.medium}
        btnWidth="95px"
        btnBorderRadius={100}
        onClickButton={onRightButtonClick}
      />
    </>
  );
};
export default DialogAction;
