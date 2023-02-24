import React from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  AccordionProps
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

const useAccordionStyles = makeStyles<Theme,AccordionCompProps>((theme) => ({
  summary: {
    position: 'relative',
    backgroundColor: (props) => props.bgColor || theme.Colors.lightGrey,    
    padding: '0 15px',
    '& .MuiAccordionSummary-content': {
      margin: 0
    },
    '&.Mui-expanded': {
      minHeight: 48
    }
  },
  accordionStyle: {
    margin: 0,
    boxShadow: 'none'
  },
  expandIconLeft: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  expandIconRight: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleStyle: {
    fontSize: theme.MetricsSizes.small_xxx,
    fontWeight: theme.fontWeight.bold,
    color: theme.Colors.primary
  },
  accordionDetailStyle: {
    display: 'block',
    backgroundColor: '#F5F5F5',
    border: '1px solid',
    borderColor: 'lightgrey',    
  }
}));

export interface AccordionCompProps extends AccordionProps {
  accordionTitle?: React.ReactNode;
  disabled?: boolean;
  onOpen?: (id: string | number) => void;
  onClose?: (id: string | number) => void;
  activeAccId?: string | number;
  activeItemIds?: any[];
  activeColor?: string;
  iconPosition?: string;
  renderExpandIcons?: (isActive: boolean) => React.ReactNode;
  accordionClassName?: any;
  accordionSummaryClassName?: any;
  accordionDetailClassName?: any;
  tileIconActiveBgColor?: string;
  accordianTitleClassName?: string;
  accContentDetail: () => React.ReactNode;
  renderAccordionTitle: () => React.ReactNode;
  accordianSummaryClassName?: any;
  iconColor?: any;
  bgColor?: any;
  isSectionCompleted?: boolean;
}

export const AccordionItem = (props) => {
  const {
    accordionTitle,
    disabled = false,
    onOpen,
    onClose,
    activeAccId,
    activeItemIds,
    activeColor,
    iconPosition = 'right',
    iconColor,
    bgColor,
    renderExpandIcons,
    accordionClassName,
    accordionSummaryClassName,
    accordionDetailClassName,
    tileIconActiveBgColor,
    accContentDetail,
    renderAccordionTitle,
    accordianTitleClassName,
    isSectionCompleted,
    ...Rest
  }: AccordionCompProps = props;

  const isActive = activeItemIds.includes(activeAccId);
  const classes = useAccordionStyles(props);
  const theme = useTheme();

  const handleChange = (event, isExpanded) => {
    if (isExpanded) {
      onOpen(activeAccId);
      return;
    }
    onClose(activeAccId);
  };

  const renderDefaultExpandIcons = () => {
    if (renderExpandIcons) {
      return renderExpandIcons(isActive);
    } else if (isActive) {
      return <ExpandLess style={{color:iconColor || "#78828C"}}/>;
    } else {
      return <ExpandMore style={{color:iconColor || "#78828C"}}/>;
    }
  };

  const getAccordionSummaryStyle = () => {
    return iconPosition === 'left'
      ? classes.expandIconLeft
      : classes.expandIconRight;
  };

  return (
    <Accordion
      onChange={handleChange}
      expanded={isActive}
      disabled={!!disabled}
      className={`${classes.accordionStyle} ${accordionClassName}`}
      {...Rest}
    >
      <AccordionSummary
        className={`${classes.summary} ${accordionSummaryClassName}`}
      >
        <Grid className={`${getAccordionSummaryStyle()} ${accordianTitleClassName}`}>
          {accordionTitle && (
            <Grid className={`${classes.titleStyle}`}>{accordionTitle}</Grid>
          )}
          {renderAccordionTitle && renderAccordionTitle()}
          {renderDefaultExpandIcons()}
        </Grid>
      </AccordionSummary>
      <AccordionDetails
        className={`${classes.accordionDetailStyle} ${accordionDetailClassName}`}
      >
        {accContentDetail && accContentDetail()}
      </AccordionDetails>
    </Accordion>
  );
};
