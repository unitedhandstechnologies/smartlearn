import { Grid, styled, Typography, Box } from '@mui/material';
import React, { useContext } from 'react';
import {
  ClockIcon,
  VideoTutor,
  DownloadSvg,
  LifeTime,
  CertificateIcon,
  LocationIcon
} from '../../../../Assets/Images';
import { ButtonComp } from 'src/components';
import FavIcon from '../../../../Assets/Images/FavIcon.svg';
import { useNavigate } from 'react-router';
import { StudentInfoContext } from 'src/contexts/StudentContext';
import { useTheme } from '@material-ui/core';
import IconTextComp from 'src/components/IconTextComp';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';

const classes = {
  containerStyle: {
    width: '100%',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.09)',
    borderRadius: '4px',
    padding: 4
  },
  price: {
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: 'Switzer',
    color: '#3C414B'
  },
  mrp: {
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Switzer',
    color: '#78828C',
    textDecoration: 'line-through',
    paddingLeft: 1
  },
  titleStyle: {
    color: '#3C414B',
    fontSize: '18px',
    fontWeight: 600
  },
  offer: {
    color: '#3CC878',
    fontSize: '16px',
    fontWeight: 600,
    paddingLeft: 1
  },
  textStyle: {
    color: '#78828C',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Switzer'
  },
  textStyleTime: {
    color: 'red',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Switzer'
  },
  gridStyle: {
    display: 'flex',
    paddingBottom: '10px'
  },
  favIcon: {
    background: '#F2F4F7',
    borderRadius: '5px',
    padding: 1.3,
    paddingBottom: 0,
    cursor: 'pointer'
  }
};

const TypographyText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  fontFamily: 'Switzer',
  color: '#3C414B'
}));

type Props = {
  course?: any;
  duration?: number | string;
  timeType?: string;
};

const ApplyNow = ({ course, timeType, duration }: Props) => {
  const { studentDetails } = useContext(StudentInfoContext);
  const navigateTo = useNavigate();
  const theme = useTheme();

  let tax = (course?.amount * 10) / 100;
  let totalPrice = course?.amount;

  const handleClick = async () => {
    if (course.course_type !== 'Workshop') {
      if (studentDetails.id !== 0) {
        let data = {
          course_id: course?.course_id,
          language_id: course?.language_id,
          user_id: studentDetails?.id,
          tax: tax,
          total: totalPrice
        };
        const createRes: any = await API_SERVICES.AddToCartService.create({
          data: data
        });
        if (createRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          console.log('createRes--->', createRes);
        }
        // navigateTo('/home/course-details', {
        //   state: { ...course },
        //   replace: true
        // });
      } else {
        // navigateTo('/home/user-login', {
        //   state: {
        //     details: { ...course },
        //     route: '/home/course-details'
        //   },
        //   replace: true
        // });
      }
    } else {
      return null;
    }
  };

  const data = [
    course.course_type === 'Recorded Course' && {
      name:
        duration !== undefined
          ? `${duration} ${timeType} of video tutorials`
          : '',
      img: VideoTutor
    },
    {
      name: '',
      img: DownloadSvg
    },
    course.course_type === 'Recorded Course' && {
      name: 'Lifetime access to the course',
      img: LifeTime
    },
    {
      name: 'Certificate of completion',
      img: CertificateIcon
    }
  ];

  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      xl={12}
      lg={12}
      justifyContent={'center'}
      sx={{
        background: '#FFFFFF',
        ...classes.containerStyle
      }}
    >
      <Grid container justifyContent={'center'}>
        <Grid
          container
          alignItems="center"
          sx={{
            [theme.breakpoints.down('lg')]: {
              justifyContent: 'flex-start'
            }
          }}
        >
          <Grid>
            <TypographyText sx={{ ...classes.price }}>
              {course.cost_type === 'PAID'
                ? `₹
              ${(
                course.amount -
                (course.discount / 100) * course.amount
              ).toFixed()}`
                : 'FREE'}
            </TypographyText>
          </Grid>
          <Grid>
            <TypographyText sx={{ ...classes.mrp }}>
              {course.cost_type === 'PAID' ? `₹${course.amount}` : ''}
            </TypographyText>
          </Grid>
          <Grid>
            <TypographyText sx={{ ...classes.offer }}>
              {course.cost_type === 'PAID' ? `${course.discount}% off` : ''}
            </TypographyText>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sx={{
            ...classes.gridStyle,
            paddingTop: '2px',
            [theme.breakpoints.down('lg')]: {
              //justifyContent: 'center'
            }
          }}
        >
          <img
            src={course.course_type === 'Workshop' ? LocationIcon : ClockIcon}
            style={{ paddingRight: 15 }}
            alt=""
          />
          <TypographyText
            sx={{
              color: course.course_type === 'Workshop' ? '#78828C' : '#FF783C',
              fontSize: theme.MetricsSizes.small_xx,
              fontWeight: theme.fontWeight.mediumBold
            }}
          >
            {course.course_type === 'Workshop'
              ? course.course_mode.toLowerCase() === 'online'
                ? course.meeting_link
                : course.meeting_location
              : '11 hours left at this price'}
          </TypographyText>
        </Grid>
        {course.student_enrolled_course_id ? (
          <Grid item xs={6} md={6} lg={9} justifyContent={'flex-start'}>
            <ButtonComp
              buttonText={'Enrolled'}
              buttonTextColor={'#FFFFFF'}
              buttonFontFamily={'Switzer'}
              buttonFontSize={16}
              btnWidth={'100%'}
              btnBorderRadius={4}
              height={'40px'}
              onClickButton={handleClick}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={6} md={6} lg={9} justifyContent={'flex-start'}>
              <ButtonComp
                buttonText={
                  course.course_type === 'Workshop'
                    ? 'Start learning'
                    : 'Apply Now'
                }
                buttonTextColor={'#FFFFFF'}
                buttonFontFamily={'Switzer'}
                buttonFontSize={16}
                btnWidth={'100%'}
                btnBorderRadius={4}
                height={'40px'}
                onClickButton={handleClick}
              />
            </Grid>
            <Grid sx={{ ...classes.favIcon, ml: 1 }}>
              <img src={FavIcon} />
            </Grid>
          </>
        )}

        <Grid
          xs={12}
          sx={{
            ...classes.gridStyle,
            paddingTop: 1,
            [theme.breakpoints.down('lg')]: {
              //justifyContent: 'center'
            }
          }}
        >
          <TypographyText
            sx={{ fontSize: '18px', fontWeight: 600, paddingTop: 2 }}
          >
            {course.course_type !== 'Workshop'
              ? 'This course includes:'
              : 'This Workshop includes:'}
          </TypographyText>
        </Grid>
        {data.map((item, index) => {
          return (
            item.name !== '' && (
              <Grid
                container
                sx={{
                  ...classes.gridStyle,
                  [theme.breakpoints.down('lg')]: {
                    // justifyContent: 'center'
                  }
                }}
                key={index}
              >
                <img src={item.img} style={{ paddingRight: 10 }} alt="" />
                <Typography sx={{ ...classes.textStyle }}>
                  {item.name}
                </Typography>{' '}
              </Grid>
            )
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ApplyNow;
