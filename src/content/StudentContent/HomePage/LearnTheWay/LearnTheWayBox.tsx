import React from 'react';
import { useTheme } from '@material-ui/core/';
import { Grid } from '@mui/material';
import LearnTheWay from '.';
import {
  CourseIcon,
  LineBarIcon,
  MasterClassIcon,
  SeminarIcon,
  WorkShopIcon
} from '../../../../Assets/Images';
import { Heading } from '../../../../components';
import { useNavigate } from 'react-router';

const learn = [
  {
    heading: 'Course',
    icon: CourseIcon,
    subText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  },
  {
    heading: 'Workshops',
    icon: WorkShopIcon,
    subText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  },
  {
    heading: 'Seminars / Webinars',
    icon: SeminarIcon,
    subText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  },
  {
    heading: 'MasterClass',
    icon: MasterClassIcon,
    subText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  }
];

const LearnTheWayBox = () => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  
  const handleClickIcon = (rowData) => {
    if (rowData.heading === 'Course') {
      navigateTo('/home/courses', {
        replace: true
      });
    } else if (rowData.heading === 'Workshops') {
      navigateTo('/home/workshops', {
        replace: true
      });
    } else if (rowData.heading === 'Seminars / Webinars') {
      navigateTo('/home/seminars-webinars', {
        replace: true
      });
    } else {
      navigateTo('/home/masterclasses', {
        replace: true
      });
    }
  };
  return (
    <Grid>
      <Heading
        headingText={'Learn the way you want to'}
        headerFontSize={'40px'}
        headerFontWeight={500}
        headingColor={'#3C414B'}
        headerFontFamily={'IBM Plex Serif'}
        style={{
          [theme.breakpoints.down('xs')]: {
            fontSize: 15
          },
          padding: '0px 0px 20px 0px'
        }}
      />
      <Grid>
        <img src={LineBarIcon} alt="" />
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          padding: '40px 0px 20px 0px',
          [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
          }
        }}
      >
        {learn.map((item, index) => {
          return (
            <Grid item key={index} xs={12} sm={6}>
              <LearnTheWay
                heading={item.heading}
                icon={item.icon}
                subText={item.subText}
                handleClickIcon={() => handleClickIcon(item)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default LearnTheWayBox;
