import { memo, useCallback, useEffect, useState } from 'react';
import { Box, Grid, makeStyles, useTheme } from '@material-ui/core';

import CourseDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseDetails';
import toast from 'react-hot-toast';
import { HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { Loader } from 'src/components';

const useStyles = makeStyles((theme) =>({
  outerContainer: {
    padding : '18px 18px',
    border : '1px solid',
    borderColor : theme.Colors.primary,
    borderRadius : '5px',
    backgroundColor : theme.Colors.whitePure,
    flexDirection : 'row',
    
  },
}));



const CourseBegin = () => {
    
        const classes = useStyles();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState([]);

    const fetchData = useCallback(async () => {
        let id = 21;
      try {
       
        const response: any = await API_SERVICES.courseManagementService.getById(
          id
        );        
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          setCourseData(response?.data);
        }   
      } catch (err) {
        toast.error(err?.message);
      } finally {
         setLoading(false);
      }
    },[]);

  useEffect(() => {    
      fetchData();
    }, []);
    if (loading) {
      return <Loader />;
    } else {
  return (
    <Grid container>
      <Grid item xs={3} className={classes.outerContainer}>
        <CourseDetails courseData = {courseData} />
      </Grid>
      <Grid item xs={9}>
        
      </Grid>
    </Grid>
  );
}};

export default memo(CourseBegin);
