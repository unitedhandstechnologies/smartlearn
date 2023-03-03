import { makeStyles, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';
import { BasicStockIcon } from 'src/Assets';
import { Heading, MuiCardComp } from 'src/components';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import { useLocation, useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
}));

const ContinueLearning = ({ enrollCourse }) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigateTo = useNavigate();
  const recordeCourse = enrollCourse.filter((item) => {
    return item.course_type === COURSE_TYPE_NAME[6];
  });
  const onClickCardImage = (rowData) => {
    if (rowData.course_type === 'Recorded Course') {
      navigateTo('/home/pre-recordedCourse-details', {
        state: { ...rowData },
        replace: true
      });
    }
  };

  return (
    <Grid>
      <Heading
        headingText={'Continue learning'}
        headerFontSize={'24px'}
        headerFontWeight={theme.fontWeight.medium}
        headingColor={theme.Colors.blackBerry}
      />
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
        {recordeCourse.length ? (
          recordeCourse.slice(0, 6)?.map((item, index) => {
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
                  courseLanguage={
                    item.language_id === 1
                      ? 'English'
                      : item.language_id === 2
                      ? 'Hindi'
                      : 'Gjarati'
                  }
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

export default ContinueLearning;
