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
  SearchIconImg
} from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading, MultiSelectChip } from 'src/components';
import {
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { useNavigate } from 'react-router';
import SearchComponent from '../SearchComponent';
import { getUserId } from 'src/Utils';
import { API_SERVICES } from 'src/Services';
import i18n from 'src/Translations/i18n';
import { toast } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
}));

type WorkshopProps = {
  workshopDetails?: any[];
  onSearchValChange?: (event) => void;
  handleClearSearchValue?: () => void;
  searchval?: string;
};
const UpComingWorkshop = ({
  workshopDetails = [],
  onSearchValChange,
  handleClearSearchValue,
  searchval
}: WorkshopProps) => {
  const theme = useTheme();
  const classes = useStyles();
  let FILTER_CHIPS = ['All'];
  workshopDetails.filter((item) => FILTER_CHIPS.push(item.category_name));
  const [chipValue, setChipValue] = useState([FILTER_CHIPS[0]]);
  const [whistList, setWishList] = useState([]);
  const userId = getUserId();

  const navigateTo = useNavigate();
  const handleChangeChipValue = (selectedChipItem: string[]) => {
    setChipValue(selectedChipItem);
  };

  const getCourses: any[] = useMemo(() => {
    const courses = [...workshopDetails];
    if (chipValue[0] === FILTER_CHIPS[0]) {
      return courses;
    } else if (chipValue[0] === FILTER_CHIPS[1]) {
      const newItem = workshopDetails.filter(
        (item) => item.category_name === FILTER_CHIPS[1]
      );
      return newItem;
    } else if (chipValue[0] === FILTER_CHIPS[2]) {
      const newItem = workshopDetails.filter(
        (item) => item.category_name === FILTER_CHIPS[2]
      );
      return newItem;
    } else if (chipValue[0] === FILTER_CHIPS[3]) {
      const newItem = workshopDetails.filter(
        (item) => item.category_name === FILTER_CHIPS[3]
      );
      return newItem;
    }
  }, [chipValue, workshopDetails]);

  const onClickCardImage = (rowData) => {
    // if (userId !== null) {
    //   navigateTo(`/home/course-details/${rowData.course_name}`, {
    //     state: {
    //       formData: { ...rowData },
    //       backBtnTxt: 'All WorkShops',
    //       backBtnRoute: '/home/workshops'
    //     },
    //     replace: true
    //   });
    // } else {
    //   navigateTo('/home/user-login', {
    //     state: {
    //       formData: { ...rowData },
    //       route: `/home/course-details/${rowData.course_name}`,
    //       backBtnTxt: 'All WorkShops',
    //       backBtnRoute: '/home/workshops'
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
    if (userId !== null) {
      let response: any = await API_SERVICES.WishListService.getAllWishlist(
        userId,
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        const getIds = response.data.wishList.map((i) => i.course_id);
        setWishList(getIds);
      }
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
      // navigateTo('/home/user-login', {
      //   state: {
      //     formData: item,
      //     route: `/home/course-details/${item.course_name}`,
      //     backBtnTxt: 'All WorkShops',
      //     backBtnRoute: '/home/workshops'
      //   },
      //   replace: true
      // });
      toast.error('Please login');
    }
  };

  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item style={{ padding: '50px 0px 30px 0px' }}>
        <Heading
          headingText={'Upcoming Workshops'}
          headerFontSize={'40px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          headerFontFamily={'IBM Plex Serif'}
          style={{
            [theme.breakpoints.down('xs')]: {
              fontSize: 15
            }
          }}
        />
        <Grid
          container
          justifyContent={'space-between'}
          sx={{
            [theme.breakpoints.down('xs')]: {
              flexDirection: 'column',
              gap: 2
            }
          }}
        >
          <Grid>
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
          <Grid item paddingRight={2}>
            <SearchComponent
              onSearchValChange={onSearchValChange}
              searchval={searchval}
              handleClearSearchValue={handleClearSearchValue}
            />
          </Grid>
        </Grid>
        <Grid paddingTop={2}>
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
        {getCourses.length
          ? getCourses.slice(0, 6).map((item, index) => {
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
                    leftText={item.cost_type === 'FREE' ? 'FREE' : null}
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
                    date={item.starting_date}
                    endingDate={item.ending_date}
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
                    backBtnTxt={'All WorkShops'}
                    backBtnRoute={'/home/workshops'}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Grid>
  );
};

export default UpComingWorkshop;
