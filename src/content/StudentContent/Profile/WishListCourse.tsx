import { Container, IconButton, makeStyles, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ButtonComp, Heading, ListItemCell, MuiCardComp } from 'src/components';
import { Grid } from '@mui/material';
import { BasicStockIcon } from 'src/Assets';
import { API_SERVICES } from 'src/Services';
import { getUserId } from 'src/Utils';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import useWishlistInfo from 'src/hooks/useWishlistInfo';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
}));

const WishListCourse = () => {
  const theme = useTheme();
  const classes = useStyles();
  const userId = getUserId();
  const { i18n } = useTranslation();
  const { wishlistDetails, updateWishlistInfo } = useWishlistInfo();
  const [likedCourses, setLikedCourses] = useState<any>([]);
  const navigateTo = useNavigate();

  let wishlistIds = [];
  wishlistDetails.filter((item) => wishlistIds.push(item.id));

  const fetchData = async () => {
    try {
      setLikedCourses([]);
      const response: any = await API_SERVICES.WishListService.getAllWishlist(
        userId,
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
      );
      if (response.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.wishList?.length) {
          setLikedCourses(response?.data?.wishList);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    updateWishlistInfo(userId, DETECT_LANGUAGE[i18n.language]);
    fetchData();
  }, []);

  const onClickCardImage = (rowData) => {
    navigateTo(`/home/course-details/${rowData.course_name}`, {
      state: {
        formData: { ...rowData },
        backBtnTxt: 'All Courses',
        backBtnRoute: '/home/profilehome'
      },
      replace: true
    });
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        maxWidth: '1200px'
      }}
    >
      <Grid>
        <Heading
          headingText={'Upgrade yourself with more courses'}
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
          {likedCourses?.length
            ? likedCourses?.slice(0, 6)?.map((item, index) => {
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
                      heading={item.category_name}
                      title={item.course_name}
                      subText={item.course_description}
                      courseLevel={item?.course_level_name?.trim()}
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
                      item={item}
                      backBtnTxt={'All Courses'}
                      backBtnRoute={'/home/profilehome'}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WishListCourse;
