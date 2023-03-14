import React, { useCallback, useEffect, useState } from 'react';
import { Container, makeStyles, useTheme } from '@material-ui/core';
import { Grid, Typography } from '@mui/material';
import { BasicStockIcon, LineBarIcon } from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { Heading } from 'src/components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { getUserId } from 'src/Utils';
import { API_SERVICES } from 'src/Services';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import toast from 'react-hot-toast';

const useStyle = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
}));

type CourseProps = {
  courseDetails?: any;
};

const RelatedCourses = ({ courseDetails }: CourseProps) => {
  const theme = useTheme();
  const classes = useStyle();
  const { i18n } = useTranslation();
  const [courses, setCourses] = useState([]);
  const navigateTo = useNavigate();
  const [whistList, setWishList] = useState([]);
  const userId = getUserId();
  const [view, setView] = useState([0, 3]);
  const handleNextClick = () => {
    setView([view[0] + 3, view[1] + 3]);
  };
  const handlePrevClick = () => {
    setView([view[0] - 1, view[1] - 1]);
  };
  const fetchData = useCallback(async () => {
    try {
      const response: any = await API_SERVICES.courseManagementService.getAll(
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.courses?.length) {
          const allCourses = response?.data?.courses;
          const filteredCourse = allCourses?.filter(
            (item) =>
              item?.category_id === courseDetails?.category_id &&
              item?.id !== courseDetails?.id
          );
          setCourses([...filteredCourse]);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      // setLoading(false);
    }
  }, [DETECT_LANGUAGE[i18n.language], courseDetails]);

  const onClickCardImage = (rowData) => {
    navigateTo(`/home/course-details/${rowData?.course_name}`, {
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
      const getIds = response?.data?.wishList?.map((i) => i?.course_id);
      setWishList(getIds);
    }
  };

  useEffect(() => {
    fetchData();
    getAllWishList();
  }, [courseDetails]);

  const handleIconClick = async (item, isActive) => {
    if (userId !== 0) {
      let response: any;
      if (isActive) {
        response = await API_SERVICES.WishListService.delete(
          userId,
          item?.course_id,
          {
            successMessage: 'Successfully Removed From WishList'
          }
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
      navigateTo('/home/user-login', {
        state: {
          details: { formData: item },
          route: `/home/course-details/${item?.course_name}`
        },
        replace: true
      });
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
        <Grid container justifyContent={'space-between'}>
          <Grid item style={{ padding: '0px 0px 40px 0px' }}>
            <Heading
              headingText={'Related Courses:'}
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
            <Grid>
              <img src={LineBarIcon} alt="" />
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              sx={{ color: '#3C78F0' }}
              onClick={handlePrevClick}
              disabled={view[0] <= 0}
            >
              <ChevronLeftIcon
                style={{
                  border: '1px solid #3C78F0',
                  paddingTop: 1,
                  width: 37,
                  height: 50,
                  borderRadius: 4
                }}
              />
            </IconButton>
            <IconButton
              sx={{ color: '#3C78F0' }}
              onClick={handleNextClick}
              disabled={view[1] >= courses?.length}
            >
              <ChevronRightIcon
                style={{
                  border: '1px solid #3C78F0',
                  paddingTop: 1,
                  width: 37,
                  height: 50,
                  borderRadius: 4
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            paddingBottom: '30px',
            [theme.breakpoints.down('xs')]: {
              justifyContent: 'center'
            }
          }}
        >
          {courses?.length
            ? courses?.slice(view[0], view[1])?.map((item, index) => {
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
                      date={item.starting_date}
                      endingDate={item.ending_date}
                      zoomLink={item.meeting_link}
                      locationName={item.meeting_location}
                      subCategory={item.sub_category_name}
                      courseType={item.course_type}
                      prize={item.amount}
                      onClickCardImage={() => onClickCardImage(item)}
                      course_id={item.course_id}
                      discount={item.discount}
                      item={item}
                      // isActive={isActive}
                      // handleOnClick={() => handleOnClick(item)}
                    />
                  </Grid>
                );
              })
            : null
              // <Typography>No Related Courses</Typography>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default RelatedCourses;
