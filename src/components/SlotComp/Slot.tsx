import React, { useState } from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  Grid,
  Typography
} from '@material-ui/core';
import ButtonComp from '../ButtonComp/index';
import { DateIcon, SunIcon } from 'src/Assets/Images';

export type TimeSlotDetails = {
  text: string;
  time: React.ReactNode;
  id: React.ReactText;
  value: string;
};
type Prop = {
  handleChangeSlot: (slot: TimeSlotDetails) => void;
  slotError?: boolean;
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    buttonContainer: {
      padding: theme.spacing(2, 0)
    },
    date: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontSize: theme.MetricsSizes.tiny_xx,
      padding: theme.spacing(1, 0)
    }
  };
});

const Slot = (props: Prop) => {
  const { handleChangeSlot, slotError = false } = props;

  const timeSlotDetails: TimeSlotDetails[] = [
    { id: 1, text: 'Morning', time: '9:00 AM  - 12:00 PM', value: 'morning' },
    { id: 2, text: 'Noon', time: '1:00 PM  - 4:00 PM', value: 'afternoon' },
    { id: 3, text: 'Evening', time: '4:00 PM  - 7:00 PM', value: 'evening' }
  ];
  const theme = useTheme();
  const classes = useStyles();
  const [activeButtonId, setActiveButtonId] = useState<any>(null);

  const handleClickSlot = (selectedSlot: TimeSlotDetails) => {
    setActiveButtonId(selectedSlot?.id);
    handleChangeSlot(selectedSlot);
  };

  return (
    <Grid container xs={12}>
      <Grid container item direction="row">
        {timeSlotDetails.map((slot: TimeSlotDetails, index) => {
          return (
            <Grid item xs={4} key={index}>
              <ButtonComp
                buttonText={slot.text}
                buttonFontSize={theme.MetricsSizes.small_xx}
                btnWidth={100}
                buttonFontWeight={theme.fontWeight.regular}
                height={theme.MetricsSizes.large_x}
                backgroundColor={
                  activeButtonId === slot.id
                    ? theme.Colors.secondary
                    : theme.Colors.lightWhiteGrey
                }
                buttonTextColor={
                  activeButtonId === slot.id
                    ? theme.Colors.white
                    : theme.Colors.black
                }
                startIcon={
                  <SunIcon
                    fontSize="small"
                    stroke={
                      activeButtonId === slot.id
                        ? theme.Colors.white
                        : theme.Colors.black
                    }
                  />
                }
                onClickButton={() => handleClickSlot(slot)}
              />
              <Grid container className={classes.date}>
                <Grid item xs={2}>
                  <DateIcon />
                </Grid>
                <Grid
                  item
                  xs={10}
                  style={{
                    padding: 2,
                    fontSize: theme.MetricsSizes.tiny_xx,
                    fontWeight: theme.fontWeight.regular
                  }}
                >
                  {slot.time}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      {slotError ? (
        <Typography
          style={{
            color: theme.Colors.redPrimary,
            textTransform: 'none',
            fontSize: theme.MetricsSizes.small_xx
          }}
        >
          Please select a slot for the pickup
        </Typography>
      ) : null}
    </Grid>
  );
};

export default Slot;
