import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { Grid, InputBase, InputAdornment, IconButton } from '@mui/material';
import {
  ArrowNext,
  BasicStockIcon,
  LineBarIcon,
  ZoomIcon,
  BarChartFillIcon,
  LocationIcon,
  BeginnerIcon,
  IntermediateIcon,
  SearchIconImg,
  Offline,
  Language
} from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading, MultiSelectChip } from 'src/components';
import ChipIconcomp from './ChipIconcomp';
import ChipMenu from './ChipMenu';
import CourseBanner from './CourseBanner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
const useStyle = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
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
  chipIconText?: number[];
  setChipIconText?: React.Dispatch<React.SetStateAction<number[]>>;
};

const UpComingCourse = ({
  courseDetails,
  chipIconText,
  setChipIconText
}: CourseProps) => {
  const theme = useTheme();
  const classes = useStyle();
  const { i18n } = useTranslation();
  const [chipFilterItem, setChipFilterItem] = useState([0, 0, 1]);
  const [menuItem, setMenuItem] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState(6);
  const [searchValue, setSearchValue] = useState('');
  const navigateTo = useNavigate();
  const getSearchValue = (searchValue) => {
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
    setChipFilterItem([...chipIconText]);
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
      changeLanguage(chipFilterItem[2]);
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
    setChipIconText([...chipFilterItem]);
  };
  const changeLanguage = (chipValue) => {
    if (chipValue === 1) {
      return i18n.changeLanguage('en');
    } else if (chipValue === 2) {
      return i18n.changeLanguage('hi');
    } else if (chipValue === 3) {
      return i18n.changeLanguage('gu');
    }
  };

  const onClickCardImage = (rowData) => {
    navigateTo('/home/course-details', {
      state: { formData: { ...rowData } },
      replace: true
    });
  };

  useEffect(() => {
    if (courseDetails?.length) {
      setCourses(courseDetails);
    } else {
      setCourses([]);
    }
  }, [courseDetails]);

  return (
    <Grid container sx={{ position: 'relative' }}>
      <CourseBanner
        course={'Courses'}
        courseSubTitle={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit ullamco laboris nisi ut aliquip ex ea c'
        }
      />

      <Grid container direction="column" rowSpacing={3}>
        <Grid item style={{ margin: theme.spacing(4, 0) }}>
          <Heading
            headingText={'Upcoming Courses'}
            headerFontSize={'40px'}
            headerFontWeight={500}
            headingColor={'#3C414B'}
            headerFontFamily={'Switzer'}
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
            <Grid
              container
              item
              xs
              style={{ paddingBottom: '20px', gap: '10px' }}
            >
              {headerChipItem.map((item, index) => (
                <ChipIconcomp
                  key={index}
                  chipText={item.name}
                  checkboxText={
                    headerChipItem[index].labelItems[chipIconText[index]].label
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
            ? courses.slice(0, view).map((item, index) => {
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
                      prize={item.amount}
                      discount={item.discount}
                      item={item}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
        {courses.length > 6 && (
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
        )}
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

export default UpComingCourse;
