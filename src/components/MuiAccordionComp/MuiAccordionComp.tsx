import React, { useEffect } from 'react';
import { useState } from 'react';
import { AccordionCompProps, AccordionItem } from './AccordionItem';
import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';

type StyleProps = {
  isBorder?: boolean;
  containerBorderColor?: string;
};
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  eachAccordionOuterContainer: {
    position: 'relative',
    border: (props) => (props.isBorder ? '0.5px solid' : 'none'),
    borderColor: (props) => props.containerBorderColor || theme.Colors.greyDark
  }
}));


export type Config = {
  id: number | string;
  title?: string;
  accContentDetail?: () => React.ReactNode;
  renderAccordionTitle?: () => React.ReactNode;
};

interface Props extends Partial<AccordionCompProps> {
  containerBorderColor?: string;
  isBorder?: boolean;
  config: Config[];
  accordionOuterContainerClassName?: any;
  mainContainerStyle?: any;
  customActiveAccItem?: string[] | number[];
  resetAccItems?: boolean;
  accordianTitleClassName?: any;
}

const MuiAccordionComp = (props: Props) => {
  const {
    config,
    isBorder = false,
    containerBorderColor,
    accordionOuterContainerClassName,
    mainContainerStyle,
    customActiveAccItem = [],
    resetAccItems = false,
    accordianTitleClassName,
    ...rest
  } = props;
  const theme = useTheme();
  const classes = useStyles({ isBorder, containerBorderColor });
  const [activeItemIds, setActiveItemIds] = useState([]);
  let activeItem = customActiveAccItem ?? [];

  console.log("confog",config)
  const onOpen = (id: string | number) => {
    if (activeItem.length) {
      return;
    }
    setActiveItemIds([...activeItemIds, id]);
  };

  const onClose = (id: string | number) => {
    if (activeItem.length) {
      return;
    }
    if (activeItemIds.includes(id)) {
      const newActiveIds = activeItemIds.filter((activeId) => activeId !== id);
      setActiveItemIds(newActiveIds);
    }
  };

  useEffect(() => {
    if (activeItem.length || resetAccItems) {
      setActiveItemIds(activeItem);
    }
  }, [resetAccItems, activeItem]);

  return (
    <Grid>
      {config.length
        ? config.map((item: Config, index) => {
            return (
              <Grid
                key={index}
                className={`${classes.eachAccordionOuterContainer} ${accordionOuterContainerClassName}`}
              >
                <AccordionItem
                  accordionTitle={item?.title}
                  onOpen={onOpen}
                  onClose={onClose}
                  activeAccId={item.id}
                  activeItemIds={activeItemIds}
                  accordianTitleClassName={accordianTitleClassName}
                  {...item}
                  {...rest}
                />
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default React.memo(MuiAccordionComp);
