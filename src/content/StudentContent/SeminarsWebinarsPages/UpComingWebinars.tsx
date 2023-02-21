import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import {
  Grid,
  Typography,
  InputBase,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  ArrowNext,
  BasicStockIcon,
  LineBarIcon,
  CommendIcon,
  BarIcon,
  ZoomIcon,
  DateSvg,
  Computer,
  BarChartFillIcon,
  LocationIcon,
  BeginnerIcon,
  IntermediateIcon,
  SearchIconImg
} from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading, MultiSelectChip } from 'src/components';
import Offline from '../../../Assets/Images/Offline.svg';
import Language from '../../../Assets/Images/Language.svg';
import ChipIconcomp from '../Courses/ChipIconcomp';
import ChipMenu from '../Courses/ChipMenu';
import { COURSE_TYPE_NAME } from 'src/Config/constant';

// const courses = [
//   {
//     id: 1,
//     mentor_id: 2,
//     mentor_name: 'Mentor',
//     category_id: 2,
//     category_name: 'FrontEnd English',
//     sub_category_id: 2,
//     sub_category_name: 'React',
//     course_level_id: 3,
//     course_level_name: 'Advanced',
//     image_url:
//       'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
//     chapter: 0,
//     section: 0,
//     course_type: '',
//     cost_type: 'Free',
//     amount: 0,
//     discount: 0,
//     starting_date: '2023-01-25',
//     ending_date: '2023-02-25',
//     duration: '2 hours',
//     course_mode: 'Online',
//     course_status: 'disabled',
//     starting_time: '01:12',
//     ending_time: '01:11',
//     meeting_location: '',
//     meeting_link: 'link',
//     created_at: '2023-02-09T07:46:29.756Z',
//     updated_at: '2023-02-09T19:41:14.823Z',
//     course_id: 1,
//     language_id: 1,
//     course_name: 'React English',
//     course_description: '.net',
//     requirements: 'undefined'
//   },
//   {
//     id: 2,
//     mentor_id: 2,
//     mentor_name: 'Mentor',
//     category_id: 2,
//     category_name: 'FrontEnd English',
//     sub_category_id: 2,
//     sub_category_name: 'React',
//     course_level_id: 3,
//     course_level_name: 'Biggner',
//     image_url:
//       'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
//     chapter: 0,
//     section: 0,
//     course_type: '',
//     cost_type: 'paid',
//     amount: 0,
//     discount: 0,
//     starting_date: '2023-01-25',
//     ending_date: '2023-02-25',
//     duration: '2 hours',
//     course_mode: 'Online',
//     course_status: 'disabled',
//     starting_time: '01:12',
//     ending_time: '01:11',
//     meeting_location: '',
//     meeting_link: 'link',
//     created_at: '2023-02-09T07:46:29.756Z',
//     updated_at: '2023-02-09T19:41:14.823Z',
//     course_id: 1,
//     language_id: 1,
//     course_name: 'React English',
//     course_description: '.net',
//     requirements: 'undefined'
//   },
//   {
//     id: 3,
//     mentor_id: 2,
//     mentor_name: 'Mentor',
//     category_id: 2,
//     category_name: 'FrontEnd English',
//     sub_category_id: 2,
//     sub_category_name: 'React',
//     course_level_id: 3,
//     course_level_name: 'Intermediate',
//     image_url:
//       'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
//     chapter: 0,
//     section: 0,
//     course_type: '',
//     cost_type: 'paid',
//     amount: 0,
//     discount: 0,
//     starting_date: '2023-01-25',
//     ending_date: '2023-02-25',
//     duration: '2 hours',
//     course_mode: 'Online',
//     course_status: 'disabled',
//     starting_time: '01:12',
//     ending_time: '01:11',
//     meeting_location: 'Bangalore',
//     meeting_link: '',
//     created_at: '2023-02-09T07:46:29.756Z',
//     updated_at: '2023-02-09T19:41:14.823Z',
//     course_id: 1,
//     language_id: 1,
//     course_name: 'React English',
//     course_description: '.net',
//     requirements: 'undefined'
//   },
//   {
//     id: 4,
//     mentor_id: 2,
//     mentor_name: 'Mentor',
//     category_id: 2,
//     category_name: 'FrontEnd English',
//     sub_category_id: 2,
//     sub_category_name: 'React',
//     course_level_id: 3,
//     course_level_name: 'Advanced',
//     image_url:
//       'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
//     chapter: 0,
//     section: 0,
//     course_type: '',
//     cost_type: 'paid',
//     amount: 0,
//     discount: 0,
//     starting_date: '2023-01-25',
//     ending_date: '2023-02-25',
//     duration: '2 hours',
//     course_mode: 'Online',
//     course_status: 'disabled',
//     starting_time: '01:12',
//     ending_time: '01:11',
//     meeting_location: '',
//     meeting_link: 'link',
//     created_at: '2023-02-09T07:46:29.756Z',
//     updated_at: '2023-02-09T19:41:14.823Z',
//     course_id: 1,
//     language_id: 1,
//     course_name: 'React English',
//     course_description: '.net',
//     requirements: 'undefined'
//   }
// ];

const useStyle = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-grid-xs-4': {
      maxWidth: '33.3%',
      flexBasis: '33.3%'
    }
  }
}));
const headerChipItem = [
  {
    name: 'Difficulty',
    id: 0,
    labelItems: [
      {
        id: 0,
        label: 'All'
      },
      {
        id: 1,
        label: 'Beginner',
        icon: BeginnerIcon
      },
      {
        id: 2,
        label: 'Intermediate',
        icon: IntermediateIcon
      },
      {
        id: 3,
        label: 'Advanced',
        icon: BarChartFillIcon
      }
    ]
  },
  {
    name: 'Mode',
    img: Offline,
    id: 1,
    labelItems: [
      {
        id: 0,
        label: 'All'
      },
      {
        id: 1,
        label: 'Online',
        icon: ZoomIcon
      },
      {
        id: 2,
        label: 'Offline',
        icon: LocationIcon
      }
    ]
  },
  {
    name: 'Language',
    img: Language,
    id: 2,
    labelItems: [
      {
        id: 0,
        label: 'All'
      },
      {
        id: 1,
        label: 'English'
      },
      {
        id: 2,
        label: 'Hindi'
      },
      {
        id: 3,
        label: 'Gujarati'
      }
    ]
  }
];

type CourseProps = {
  courseDetails?: any[];
};

const UpComingWebinars = ({ courseDetails }: CourseProps) => {
  const theme = useTheme();
  const classes = useStyle();
  const [chipFilterItem, setChipFilterItem] = useState([0, 0, 1]);
  const [menuItem, setMenuItem] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState(6);
  const [searchValue, setSearchValue] = useState('');

  const getSearchValue = (searchValue) => {
    console.log(searchValue);
    setSearchValue(searchValue);
  };

  const handleOpen = (event, item) => {
    setMenuItem({
      menuItem: item.labelItems,
      headerName: item.name,
      chipId: item.id
    });
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (index) => {
    chipFilterItem[menuItem.chipId] = index;
    setChipFilterItem([...chipFilterItem]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    if (view === 6) {
      setView(courses.length);
    } else {
      setView(6);
    }
  };

  const handleApply = () => {
    let filteredCourse = [];
    if (chipFilterItem[0] != 0) {
      filteredCourse = courseDetails.filter(
        (item) => item.course_level_id == chipFilterItem[0]
      );
    }
    if (chipFilterItem[1] != 0) {
      filteredCourse = (
        chipFilterItem[0] != 0 ? filteredCourse : courseDetails
      ).filter(
        (item) =>
          item.course_mode ==
          headerChipItem[1].labelItems[chipFilterItem[1]].label
      );
    }
    if (chipFilterItem[2] != 0) {
      filteredCourse = (
        chipFilterItem[0] != 0 || chipFilterItem[1] != 0
          ? filteredCourse
          : courseDetails
      ).filter((item) => item.language_id == chipFilterItem[2]);
    }
    if (
      chipFilterItem[0] === 0 &&
      chipFilterItem[1] === 0 &&
      chipFilterItem[2] === 0
    ) {
      setCourses([...courseDetails]);
    } else {
      setCourses([...filteredCourse]);
    }
    setAnchorEl(null);
  };

  const onClickCardImage = (rowData) => {
    console.log('rowData', rowData);
  };

  useEffect(() => {
    if (courseDetails?.length) {
      setCourses(courseDetails);
    } else {
      setCourses([]);
    }
  }, [courseDetails]);

  // const getFilterCourse = useMemo(()=>{
  //   let webinarCourse = courseDetails.filter((item) => {
  //       return item.course_type === COURSE_TYPE_NAME[3]
  //   })
  //   return webinarCourse
  // },[courseDetails])

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Grid container direction="column" rowSpacing={3}>
        <Grid item style={{ margin: theme.spacing(4, 0) }}>
          <Heading
            headingText={'Upcoming Webinars'}
            headerFontSize={'40px'}
            headerFontWeight={500}
            headingColor={'#3C414B'}
            style={{
              [theme.breakpoints.down('xs')]: {
                fontSize: 15
              }
            }}
          />
          <Grid
            container
            sx={{
              [theme.breakpoints.down('xs')]: {
                flexDirection: 'column'
              }
            }}
          >
            <Grid container item xs style={{ paddingBottom: '20px', gap: '10px' }}>
              {headerChipItem.map((item, index) => (
                <ChipIconcomp
                  key={index}
                  chipText={item.name}
                  checkboxText={
                    headerChipItem[index].labelItems[chipFilterItem[index]]
                      .label
                  }
                  onClick={(event) => handleOpen(event, item)}
                  img={item.img}
                />
              ))}
            </Grid>
            <Grid item paddingBottom={2}>
              <InputBase
                onChange={(e) => getSearchValue(e.target.value)}
                value={searchValue}
                placeholder={'Search'}
                sx={{
                  width: 65,
                  transition: '0.5s',
                  ':hover': {
                    width: 300,
                    border: '1px solid #3C78F0',
                    borderRadius: 50,
                    fontSize: 20,
                    fontWeight: 400,
                    padding: theme.spacing(0.3, 0.5)
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <img src={SearchIconImg} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
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
          {courses.length
            ? courses.slice(0, 6).map((item, index) => {
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
                      subCategory={item.sub_category_name}
                      courseType={item.course_type}
                      onClickCardImage={() => onClickCardImage(item)}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
        <Grid item>
          <ButtonComp
            style={{ border: '1.5px solid #3C78F0' }}
            variant="outlined"
            buttonFontFamily="Switzer"
            buttonFontSize={theme.MetricsSizes.regular}
            backgroundColor={theme.Colors.white}
            buttonTextColor={'#3C78F0'}
            btnBorderRadius={'4px'}
            buttonText={view === 6 ? 'View All' : 'Back'}
            btnWidth="100%"
            iconImage={
              view === 6 ? (
                <img src={ArrowNext} style={{ marginLeft: '8px' }} />
              ) : null
            }
            onClick={handleView}
          />
        </Grid>
      </Grid>
      <ChipMenu
        anchorEl={anchorEl}
        {...menuItem}
        currentId={chipFilterItem[menuItem.chipId]}
        handleChange={handleChange}
        handleClose={handleClose}
        handleApply={handleApply}
      />
    </Grid>
  );
};

export default UpComingWebinars;
