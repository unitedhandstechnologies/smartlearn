import { makeStyles, useTheme } from '@material-ui/core';
import {
  Grid,
  Typography,
  InputBase,
  InputAdornment,
  IconButton
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowNext,
  BarChartFillIcon,
  BarIcon,
  BasicStockIcon,
  BeginnerIcon,
  IntermediateIcon,
  Language,
  LineBarIcon,
  SearchIconImg
} from 'src/Assets';
import { ButtonComp, Heading, MuiCardComp } from 'src/components';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import ChipIconcomp from './ChipIconcomp';
import ChipMenu from './ChipMenu';
import { useNavigate } from 'react-router';
import SearchComponent from '../SearchComponent';
import { getUserId } from 'src/Utils';

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
    name: 'Language',
    img: Language,
    id: 1,
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
  onSearchValChange?: (event) => void;
  handleClearSearchValue?: () => void;
  searchval?: string;
};
const LearnAtUrPace = ({
  courseDetails,
  chipIconText,
  setChipIconText,
  onSearchValChange,
  handleClearSearchValue,
  searchval
}: CourseProps) => {
  const theme = useTheme();
  const classes = useStyle();
  const { i18n } = useTranslation();
  const [chipFilterItem, setChipFilterItem] = useState([0, 1]);
  const [menuItem, setMenuItem] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState(6);
  const [searchValue, setSearchValue] = useState('');
  const navigateTo = useNavigate();
  const userId = getUserId();

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

  const handleApply = () => {
    let filteredCourse = [];
    if (chipFilterItem[0] != 0) {
      filteredCourse = courseDetails.filter(
        (item) => item.course_level_id == chipFilterItem[0]
      );
    }
    if (chipFilterItem[1] != 0) {
      filteredCourse = (
        chipFilterItem[0] != 0 || chipFilterItem[1] != 0
          ? filteredCourse
          : courseDetails
      ).filter((item) => item.language_id == chipFilterItem[1]);
      changeLanguage(chipFilterItem[1]);
    }
    if (chipFilterItem[0] === 0 && chipFilterItem[1] === 0) {
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
    // if (userId !== null) {
    //   navigateTo(`/home/course-details/${rowData.course_name}`, {
    //     state: {
    //       formData: { ...rowData },
    //       backBtnTxt: 'All Courses',
    //       backBtnRoute: '/home/courses'
    //     },
    //     replace: true
    //   });
    // } else {
    //   navigateTo('/home/user-login', {
    //     state: {
    //       formData: { ...rowData },
    //       route: `/home/course-details/${rowData.course_name}`,
    //       backBtnTxt: 'All Courses',
    //       backBtnRoute: '/home/courses'
    //     },
    //     replace: true
    //   });
    // }
    navigateTo(`/home/course-details/${rowData.course_name}`, {
      state: { formData: { ...rowData } },
      replace: true
    });
  };

  const getFilterCourse = useMemo(() => {
    let recordedCourse = courseDetails.filter((item) => {
      return item.course_type === COURSE_TYPE_NAME[6];
    });
    return recordedCourse;
  }, [courseDetails]);

  const handleView = () => {
    if (view === 6) {
      setView(getFilterCourse?.length);
    } else {
      setView(6);
    }
  };

  return (
    <Grid container justifyContent={'center'} direction="column" rowSpacing={3}>
      <Grid style={{ margin: theme.spacing(4, 0) }}>
        <Typography
          sx={{
            fontSize: '40px',
            fontWenghit: theme.fontWeight.medium,
            color: theme.Colors.blackBerry,
            lineHeight: '48px',
            fontFamily: 'IBM Plex Serif',
            [theme.breakpoints.down('xs')]: {
              fontSize: 25
            }
          }}
        >
          Learn at your pace
        </Typography>
        <Typography
          sx={{
            fontSize: '40px',
            fontWenghit: theme.fontWeight.medium,
            color: theme.Colors.blackBerry,
            lineHeight: '48px',
            padding: '0px 0px 20px 0px',
            fontFamily: 'IBM Plex Serif',
            [theme.breakpoints.down('xs')]: {
              fontSize: 25
            }
          }}
        >
          with recorded courses
        </Typography>
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
            {headerChipItem?.map((item, index) => (
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
            <SearchComponent
              onSearchValChange={onSearchValChange}
              searchval={searchval}
              handleClearSearchValue={handleClearSearchValue}
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
        {getFilterCourse.length
          ? getFilterCourse.slice(0, view).map((item, index) => {
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
                        : 'Gujarati'
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
                    backBtnTxt={'All Courses'}
                    backBtnRoute={'/home/courses'}
                    //progressValue={parseInt(item.level)}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
      {getFilterCourse.length > 6 && (
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
            onClickButton={handleView}
          />
        </Grid>
      )}
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

export default LearnAtUrPace;
