import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import {
  ArrowNext,
  BasicStockIcon,
  LineBarIcon,
  ZoomIcon,
  BarChartFillIcon,
  LocationIcon,
  BeginnerIcon,
  IntermediateIcon,
  Offline,
  Language
} from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading } from 'src/components';
import ChipIconcomp from './ChipIconcomp';
import ChipMenu from './ChipMenu';
import CourseBanner from './CourseBanner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import SearchComponent from '../SearchComponent';
import { getUserId } from 'src/Utils';
import { API_SERVICES } from 'src/Services';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { toast } from 'react-hot-toast';
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
  },
  {
    name: 'Cost',
    img: Language,
    id: 3,
    labelItems: [
      {
        id: 0,
        label: 'All'
      },
      {
        id: 1,
        label: 'FREE'
      },
      {
        id: 2,
        label: 'PAID'
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

const UpComingCourse = ({
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
  const [chipFilterItem, setChipFilterItem] = useState([0, 0, 1]);
  const [menuItem, setMenuItem] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState(6);
  const navigateTo = useNavigate();
  const [whistList, setWishList] = useState([]);
  const userId = getUserId();

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
    if (chipFilterItem[3] != 0) {
      filteredCourse = (
        chipFilterItem[0] != 0 ||
        chipFilterItem[1] != 0 ||
        chipFilterItem[2] != 0
          ? filteredCourse
          : courseDetails
      ).filter((item) => {
        let tempValue;
        if (item.cost_type === 'PAID') tempValue = 2;
        if (item.cost_type === 'FREE') tempValue = 1;
        return tempValue === chipFilterItem[3];
      });
    }
    if (
      chipFilterItem[0] === 0 &&
      chipFilterItem[1] === 0 &&
      chipFilterItem[2] === 0 &&
      chipFilterItem[3] === 0
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

  const getAllWishList = async () => {
    let response: any = await API_SERVICES.WishListService.getAllWishlist(
      userId,
      DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
    );
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      const getIds = response.data.wishList.map((i) => i.course_id);
      setWishList(getIds);
    }
  };

  useEffect(() => {
    if (courseDetails?.length) {
      setCourses(courseDetails);
    } else {
      setCourses([]);
    }
    window.scrollTo(0,0)
    getAllWishList();
  }, [courseDetails]);

  const handleIconClick = async (item, isActive) => {
    if (userId !== null) {
      let response: any;
      if (isActive) {
        response = await API_SERVICES.WishListService.delete(
          userId,
          item?.course_id
        );
      } else {
        response = await API_SERVICES.WishListService.create(
          userId,
          item?.course_id,
          { successMessage: 'Successfully Added In WishList' }
        );
      }
      if (response.status < HTTP_STATUSES.BAD_REQUEST) {
        await getAllWishList();
      }
    } else {
      // navigateTo('/home/user-login', {
      //   state: {
      //     formData: item,
      //     route: `/home/course-details/${item.course_name}`,
      //     backBtnTxt: 'All Courses',
      //     backBtnRoute: '/home/courses'
      //   },
      //   replace: true
      // });
      toast.error('Please login')
    }
  };

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
              {headerChipItem?.map((item, index) => (
                <ChipIconcomp
                  key={index}
                  chipText={item?.name}
                  checkboxText={
                    headerChipItem[index]?.labelItems[chipIconText[index]]
                      ?.label
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
          {courses?.length
            ? courses?.slice(0, view)?.map((item, index) => {
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
                      courseLevel={item.course_level_name.trim()}
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
                      isActive={whistList.includes(item.id)}
                      handleOnClick={handleIconClick}
                      backBtnTxt={'All Courses'}
                      backBtnRoute={'/home/courses'}
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
