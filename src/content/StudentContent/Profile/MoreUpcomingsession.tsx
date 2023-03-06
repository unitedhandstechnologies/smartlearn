import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Container, makeStyles, useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import { ArrowNext, BasicStockIcon, LineBarIcon } from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading, MultiSelectChip } from 'src/components';
import { COURSE_TYPE_NAME, HTTP_STATUSES } from 'src/Config/constant';
import { useLocation, useNavigate } from 'react-router';
import { StudentInfoContext } from 'src/contexts/StudentContext';
import { API_SERVICES } from 'src/Services';

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
  InitialItemVal: any[];
  handleChangeItem: (val: any) => void;
};
const MoreUpcomingSession = ({ courseDetails = [], InitialItemVal, handleChangeItem }: CourseProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const { state }: any = useLocation();
  const [chipValue, setChipValue] = useState([FILTER_CHIPS[0]]);
  const navigateTo = useNavigate();
  const [view, setView] = useState(6);
  const [selectedItemId, setSelectedItemId] = useState<number[]>([]);
  const [wishlistId, setWishlistId] = useState<number>(0);
  const { studentDetails } = useContext(StudentInfoContext);
  let isActive: boolean;

  const handleChangeChipValue = (selectedChipItem: string[]) => {
    setChipValue(selectedChipItem);
  };

  const getCourses: any[] = useMemo(() => {
    const courses = [...courseDetails];
    if (chipValue[0] === FILTER_CHIPS[0]) {
      return courses;
    } else if (chipValue[0] === FILTER_CHIPS[1]) {
      const workShop = courseDetails.filter(
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

  const onClickCardImage = (rowData) => {
    navigateTo('/home/course-details', {
      state: { formData: { ...rowData } },
      replace: true
    });
  };

  const handleView = () => {
    if (view === 6) {
      setView(getCourses.length);
    } else {
      setView(6);
    }
  };

  const onChange = (itemIds: any[]) => {
    if (handleChangeItem) {
      handleChangeItem(itemIds);
    } else {
      setSelectedItemId(itemIds);
    }
  };

  const isUnselected = (selId: number) => {
    const items =
      selectedItemId.length &&
      selectedItemId.filter((itemId) => selId !== itemId);

    if (items.length < selectedItemId.length) {
      onChange(items);
      return true;
    }
    return false;
  };
  const handleIconClick = async (item) => {
    if (studentDetails.id !== 0) {
      let response: any;
      if (isActive) {
        response = await API_SERVICES.WishListService.delete(
          item?.course_id,
          wishlistId
        );
      } else {
        response = await API_SERVICES.WishListService.create(
          studentDetails?.id,
          item?.course_id,
          { successMessage: 'Added Successfully' }
        );
      }
      if (response.status < HTTP_STATUSES.BAD_REQUEST) {
        console.log('res', response);
        setWishlistId(response?.data?.wishlist?.id);
      }
    } else {
      navigateTo('/home/user-login', {
        state: {
          details: { formData: item },
          route: '/home/course-details'
        },
        replace: true
      });
    }
  };
  const handleOnClick = (item: any) => {
    handleIconClick(item);
    if (isUnselected(item?.id)) {
      return;
    }
    onChange([...selectedItemId, item?.id]);
  };

  useEffect(() => {
    setSelectedItemId(InitialItemVal);
  }, [InitialItemVal]);

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
            headingText={'More upcoming sessions'}
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
            />
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
          {getCourses.length
            ? getCourses.slice(0, 6)?.map((item, index) => {
              const findActiveIcon: number = selectedItemId.length
              ? selectedItemId.findIndex((selId) => {
                  return selId === item.id;
                })
              : -1;
            isActive = findActiveIcon !== -1;
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
                  isActive={isActive}
                  handleOnClick={() => handleOnClick(item)}
                />
                  </Grid>
                );
              })
            : null}
        </Grid>
        <Grid item>
        {getCourses.length > 6 && (
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
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoreUpcomingSession;
