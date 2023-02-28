import { makeStyles, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';
import { BasicStockIcon } from 'src/Assets';
import { Heading, MuiCardComp } from 'src/components';

const courses = [
  {
    id: 1,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Advanced',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'webinar',
    cost_type: 'Free',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: '',
    meeting_link: 'link',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  },
  {
    id: 2,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Biggner',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'Live',
    cost_type: 'paid',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: '',
    meeting_link: 'link',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  },
  {
    id: 3,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Intermediate',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'webinar',
    cost_type: 'paid',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: 'Bangalore',
    meeting_link: '',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  },
  {
    id: 4,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Advanced',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'webinar',
    cost_type: 'paid',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: '',
    meeting_link: 'link',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  }
];

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

  const onClickCardImage = (rowData) => {};

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
        {enrollCourse.length
          ? enrollCourse.slice(0, 6).map((item, index) => {
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
                    date={`${item.starting_date} - ${item.ending_date}`}
                    zoomLink={item.meeting_link}
                    locationName={item.meeting_location}
                    //subCategory={item.sub_category_name}
                    courseType={item.course_type}
                    prize={item.amount}
                    onClickCardImage={() => onClickCardImage(item)}
                    startLearning={false}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Grid>
  );
};

export default ContinueLearning;
