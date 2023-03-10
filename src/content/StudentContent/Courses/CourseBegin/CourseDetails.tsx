import { memo, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CourseTitleDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseTitleDetails';
import { Grid, makeStyles, styled, useTheme } from '@material-ui/core';
import { stickyNoteLine , timeLine } from 'src/Assets/Images'
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import toast from 'react-hot-toast';

const TopicsListGrid = styled(Grid)(({ theme }) => ({
  padding : '24px 0px'
}));

const RemainingTimeGrid = styled(Grid)(({ theme }) => ({
  //display : 'flex',
 
}));

const LessonGrid = styled(Grid)(({theme}) => ({

  padding : '6px 0px 0px 0px',
  
  sx : {
    [theme.breakpoints.down('sm')]: {  flexWrap: 'wrap' }
  }
 
}));

const CourseDetails = ({
  courseData,
  //studentDetails
}) => {
  const theme = useTheme();
  const [lessonData, setLessonData] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState<any[]>([]);

  
const studentDetails = {
  remainingDuration : "11hrs 45mins 30 sec",
};

  const fetchSectionData = async () => {
    try {
      setSectionData([]);
      const response: any =
        await API_SERVICES.sectionAndLessonService.getAllSection(
          courseData.course.id,
          LANGUAGE_ID.english
        );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          setSectionData(response.data.Section);
        }
      }
      catch (err) {
      toast.error(err?.message);
    }
  };

  const fetchLessonData = async () => {
    try {
      setLessonData([]);
      const response: any =
        await API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
          courseData.course.id,
          LANGUAGE_ID.english
        );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          setLessonData(response.data.Lessons);
        }
      
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {   
    fetchSectionData();
    fetchLessonData();
  }, []);

               

  const topics = (sectionData, lessonData) => {
    return (
      <CourseTitleDetails 
        sectionData = {sectionData} 
        lessonData = {lessonData} 
        studentDetails = {studentDetails}
      />
    )
  };

  return (
    <Grid >
      <Typography 
        sx={{    
          fontWeight : 500,
          fontSize : '24px'}}
      >{courseData.course_language[0].course_name}
      </Typography>

      <LessonGrid container >
        
        <Grid item sm={4} 
          xs={12}  
          alignItems={"center"}
          justifyContent={"center"}>
          <img src={stickyNoteLine} ></img>
          <Typography 
              sx={{
                fontSize : '12px',
                paddingLeft : '4px',
              }} 
              component={'span'}
            >
            {`${courseData.course.section   } Lessons`}
          </Typography>
        </Grid>

        <RemainingTimeGrid item 
          sm={8} 
          xs={12} 
          alignItems={"center"}
          justifyContent={"center"}
          >

          <img src={timeLine} ></img>
          <Typography
              style={{
                fontSize : '12px',
                paddingLeft : '4px',
              }}
              component={'span'}
            >{`${studentDetails.remainingDuration} remaining`}</Typography>
        </RemainingTimeGrid>
      </LessonGrid>
      <TopicsListGrid>
        {topics(sectionData, lessonData)}
      </TopicsListGrid>
    </Grid>
  );
};

export default memo(CourseDetails);
