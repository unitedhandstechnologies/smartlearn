import { makeStyles, useTheme } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { Heading, MuiCardComp, MultiSelectChip } from 'src/components';
import CompletedCourse from './CompletedCourse';
import ContinueLearning from './ContinueLearning';
import WishListCourse from './WishListCourse';
import { BasicStockIcon } from 'src/Assets';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import { useLocation, useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
}));

const FILTER_CHIPS = ['Active', 'Completed', 'Whishlist'];

const MyLibrary = ({ enrollCourse }) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  const [chipValue, setChipValue] = useState([FILTER_CHIPS[0]]);

  const handleChangeChipValue = (selectedChipItem: string[]) => {
    setChipValue(selectedChipItem);
  };
  const getCourses: any[] = useMemo(() => {
    //const activecCourses = [...enrollCourse];
    if (chipValue[0] === FILTER_CHIPS[0]) {
      const enrolledCourse = enrollCourse.filter(
        (item) =>
          item.course_type === COURSE_TYPE_NAME[1] ||
          item.course_type === COURSE_TYPE_NAME[2] ||
          item.course_type === COURSE_TYPE_NAME[3] ||
          item.course_type === COURSE_TYPE_NAME[4] ||
          item.course_type === COURSE_TYPE_NAME[5]
      );
      return enrolledCourse;
    } else if (chipValue[0] === FILTER_CHIPS[1]) {
      const completed = enrollCourse.filter((item) => item.status_id === 2);
      return completed;
    }
  }, [chipValue, enrollCourse]);

  const onClickCardImage = (rowData) => {
    navigateTo('/home/course-details', {
      state: { formData: { ...rowData } },
      replace: true
    });
  };

  return (
    <Grid container direction="column" rowSpacing={4}>
      <Grid item style={{ padding: '50px 0px 30px 0px' }}>
        <Grid
          item
          style={{
            padding: '0px 0px 20px 0px',
            [theme.breakpoints.down('xs')]: {
              padding: '20px 0px'
            }
          }}
        >
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
        </Grid>
        <Grid item>
          <Heading
            headingText={
              chipValue[0] === FILTER_CHIPS[0]
                ? 'Upcoming'
                : 'Courses you completed'
            }
            headerFontSize={'24px'}
            headerFontWeight={theme.fontWeight.medium}
            headingColor={theme.Colors.blackBerry}
          />
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
        {getCourses?.length ? (
          getCourses?.slice(0, 6)?.map((item, index) => {
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
                  //leftText={item.cost_type}
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
                  nextclass={item.starting_date}
                  zoomLink={item.meeting_link}
                  locationName={item.meeting_location}
                  //subCategory={item.sub_category_name}
                  courseType={item.course_type}
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
              headingText={
                chipValue[0] === FILTER_CHIPS[0]
                  ? 'Not yet enroll the courses'
                  : 'Not yet completed the courses'
              }
              headerFontSize={'20px'}
              headerFontWeight={theme.fontWeight.medium}
              headingColor={'#3C78F0'}
            />
          </Grid>
        )}
      </Grid>

      {chipValue[0] === FILTER_CHIPS[0] ? (
        <ContinueLearning enrollCourse={enrollCourse} />
      ) : null}
      {/* <CompletedCourse /> */}
      {/* <WishListCourse /> */}
    </Grid>
  );
};

export default MyLibrary;
