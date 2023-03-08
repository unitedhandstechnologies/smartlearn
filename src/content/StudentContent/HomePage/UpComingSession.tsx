import React, { useContext, useEffect, useMemo, useState } from 'react';
import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { Grid, Container } from '@mui/material';
import { ArrowNext, BasicStockIcon, LineBarIcon } from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading, MultiSelectChip } from 'src/components';
import {
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { useLocation, useNavigate } from 'react-router';
import { useEdit } from 'src/hooks/useEdit';
import useUserInfo from 'src/hooks/useUserInfo';
import { API_SERVICES } from 'src/Services';
import { StudentInfoContext } from 'src/contexts/StudentContext';
import useWishlistInfo from 'src/hooks/useWishlistInfo';
import { getUserId } from 'src/Utils';
import i18n from 'src/Translations/i18n';
import { toast } from 'react-hot-toast';

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
const UpComingSession = ({ courseDetails = [] }: CourseProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const { state }: any = useLocation();
  const [chipValue, setChipValue] = useState([FILTER_CHIPS[0]]);
  const navigateTo = useNavigate();
  const [view, setView] = useState(6);
  const [whistList, setWishList] = useState([]);
  const userId = getUserId();

  const handleChangeChipValue = (selectedChipItem: string[]) => {
    setChipValue(selectedChipItem);
  };

  const getCourses: any[] = useMemo(() => {
    const courses = [...courseDetails];
    if (chipValue[0] === FILTER_CHIPS[0]) {
      return courses;
    } else if (chipValue[0] === FILTER_CHIPS[1]) {
      const workShop = courseDetails?.filter(
        (item) => item.course_type === COURSE_TYPE_NAME[4]
      );
      return workShop;
    } else if (chipValue[0] === FILTER_CHIPS[2]) {
      const webinarSeminar = courseDetails.filter(
        (item) =>
          item.course_type === COURSE_TYPE_NAME[1] ||
          item.course_type === COURSE_TYPE_NAME[3]
      );
      return webinarSeminar;
    }
  }, [chipValue, courseDetails]);

  const handleView = () => {
    if (view === 6) {
      setView(getCourses.length);
    } else {
      setView(6);
    }
  };

  const onClickCardImage = (rowData) => {
    // if (userId !== null) {
    //   navigateTo(`/home/course-details/${rowData.course_name}`, {
    //     state: {
    //       formData: { ...rowData },
    //       backBtnTxt: 'All Courses',
    //       backBtnRoute: '/home/profilehome'
    //     },
    //     replace: true
    //   });
    // } else {
    //   navigateTo('/home/user-login', {
    //     state: {
    //       formData: { ...rowData },
    //       route: `/home/course-details/${rowData.course_name}`,
    //       backBtnTxt: 'All Courses',
    //       backBtnRoute: '/home/profilehome'
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
    getAllWishList();
  }, []);

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
      //     backBtnRoute: '/home/profilehome'
      //   },
      //   replace: true
      // });
      toast.error('Please login')
    }
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        maxWidth: '1200px'
      }}
    >
      <Grid>
        <Grid item style={{ padding: '0px 0px 30px 0px' }}>
          <Heading
            headingText={'Upcoming sessions'}
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
          <Grid style={{ paddingBottom: '20px' }}>
            <MultiSelectChip
              chipItems={FILTER_CHIPS}
              selectedChipItem={chipValue}
              handleChange={handleChangeChipValue}
              chipStyle={{
                padding: theme.spacing(2, 0.8),
                height: theme.MetricsSizes.large,
                fontSize: theme.MetricsSizes.regular
              }}
              containerStyle={{
                [theme.breakpoints.down('xs')]: {
                  flexDirection: 'column',
                  gap: 5
                }
              }}
            />
          </Grid>
          <Grid>
            <img src={LineBarIcon} alt="" />
          </Grid>
        </Grid>
        <Grid
          container
          //justifyContent={'center'}
          spacing={3}
          sx={{
            paddingBottom: '30px',
            [theme.breakpoints.down('xs')]: {
              justifyContent: 'center'
            }
          }}
        >
          {getCourses.length
            ? getCourses.slice(0, view)?.map((item, index) => {
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
                      prize={item.amount}
                      onClickCardImage={() => onClickCardImage(item)}
                      course_id={item.course_id}
                      discount={item.discount}
                      item={item}
                      isActive={whistList.includes(item.id)}
                      handleOnClick={handleIconClick}
                      backBtnTxt={'All Courses'}
                      backBtnRoute={'/home/profilehome'}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
        {getCourses.length > 6 && (
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
    </Container>
  );
};

export default UpComingSession;
