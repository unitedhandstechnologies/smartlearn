import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import { ArrowNext, BasicStockIcon, LineBarIcon } from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading, MultiSelectChip } from 'src/components';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import { useLocation, useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
}));

const FILTER_CHIPS = ['Courses', 'Workshops', 'Seminars/Webinars'];

type CourseProps = {
  courseDetails?: any[];
};
const YourUpComingSession = ({ courseDetails = [] }: CourseProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const { state }: any = useLocation();
  const [chipValue, setChipValue] = useState([FILTER_CHIPS[0]]);
  const navigateTo = useNavigate();

  // const handleChangeChipValue = (selectedChipItem: string[]) => {
  //   setChipValue(selectedChipItem);
  // };

  // const getCourses: any[] = useMemo(() => {
  //   const courses = [...courseDetails];
  //   if (chipValue[0] === FILTER_CHIPS[0]) {
  //     return courses;
  //   } else if (chipValue[0] === FILTER_CHIPS[1]) {
  //     const workShop = courseDetails.filter(
  //       (item) => item.course_type === COURSE_TYPE_NAME[4]
  //     );
  //     return workShop;
  //   } else if (chipValue[0] === FILTER_CHIPS[2]) {
  //     const webinarSeminar = courseDetails.filter(
  //       (item) =>
  //         item.course_type === COURSE_TYPE_NAME[1] ||
  //         item.course_type === COURSE_TYPE_NAME[3]
  //     );
  //     return webinarSeminar;
  //   }
  // }, [chipValue, courseDetails]);

  const onClickCardImage = (rowData) => {
    navigateTo('/home/course-details', {
      state: { formData: { ...rowData } },
      replace: true
    });
  };
  const enrolledCourse = courseDetails.filter(
    (item) =>
      item.course_type === COURSE_TYPE_NAME[1] ||
      item.course_type === COURSE_TYPE_NAME[2] ||
      item.course_type === COURSE_TYPE_NAME[3] ||
      item.course_type === COURSE_TYPE_NAME[4] ||
      item.course_type === COURSE_TYPE_NAME[5]
  );
  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item style={{ padding: '0px 0px 30px 0px' }}>
        <Heading
          headingText={'Your upcoming sessions'}
          headerFontSize={'40px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          headerFontFamily={'IBM Plex Serif'}
          style={{
            [theme.breakpoints.down('xs')]: {
              fontSize: 15
            }
          }}
        />
        {/* <Grid style={{ paddingBottom: '20px' }}>
          <MultiSelectChip
            chipItems={FILTER_CHIPS}
            selectedChipItem={chipValue}
            handleChange={handleChangeChipValue}
            chipStyle={{
              padding: theme.spacing(2, 0.8),
              height: theme.MetricsSizes.large,
              fontSize: theme.MetricsSizes.regular
            }}
          />
        </Grid> */}
        <Grid>
          <img src={LineBarIcon} alt="" />
        </Grid>
      </Grid>
      <Grid
        container
        //justifyContent={'center'}
        spacing={4}
        sx={{
          paddingBottom: '30px',
          [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
          }
        }}
      >
        {enrolledCourse.length ? (
          enrolledCourse?.map((item, index) => {
            return (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                className={classes.eachItem}
              >
                <MuiCardComp
                  key={index}
                  imgUrl={item.image_url ? item.image_url : BasicStockIcon}
                  rightText={item.course_type}
                  leftText={item.cost_type}
                  heading={item.category_name}
                  title={item.course_name}
                  subText={item.course_description}
                  courseLevel={item.course_level_name}
                  // courseLanguage={
                  //   item.language_id === 1
                  //     ? 'English'
                  //     : item.language_id === 2
                  //     ? 'Hindi'
                  //     : 'Gujarati'
                  // }
                  nextClass={item.starting_date}
                  zoomLink={item.meeting_link}
                  locationName={item.meeting_location}
                  //subCategory={item.sub_category_name}
                  //courseType={item.course_type}
                  prize={item.amount}
                  onClickCardImage={() => onClickCardImage(item)}
                  startLearning={false}
                  item={item}
                />
              </Grid>
            );
          })
        ) : (
          <Grid item container justifyContent="center">
            <Heading
              headingText={'Not yet enroll the courses'}
              headerFontSize={'20px'}
              headerFontWeight={theme.fontWeight.medium}
              headingColor={'#3C78F0'}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default YourUpComingSession;
