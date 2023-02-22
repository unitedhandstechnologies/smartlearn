import { memo, useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CourseTitleDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseTitleDetails';
import { Grid, makeStyles, styled, useTheme } from '@material-ui/core';
import { stickyNoteLine , timeLine } from 'src/Assets/Images'
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import toast from 'react-hot-toast';
import React from 'react';
import { Loader } from 'src/components';

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
  setVideoToPlay,
  setVideoList,
  lessonData,
  sectionData,
  //handleAutoPlay,
  setVideoToPlayIndex
  //studentDetails
}) => {
  const theme = useTheme();

 
const studentDetails = {
  remainingDuration : "11hrs 45mins 30 sec",
};
/* const fetchSectionData = useCallback(async () => {
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
},[courseData]);

const fetchLessonData = useCallback(async () => {
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
 
},[sectionData]);

const getVideoList = useCallback(() => {
    
  console.log("set list calledhvjh")
  console.log("lessonData",lessonData)
  console.log("sectionData",sectionData)
    let tempVideoList = Array(sectionData?.length).fill(0).map((sectionData,index) =>      
  new Array((lessonData.length
    ? lessonData.filter(
        (lessonItm) => lessonItm.section_id === sectionData.section_id
        
      )
    : []).length) );
  
    if(sectionData?.length){
         sectionData.map((item, index) => {
          const sectionNumber = index + 1;
            let getLessonData: any = lessonData.length
              ? lessonData.filter(
                  (lessonItm) => lessonItm.section_id === item.section_id
                )
              : [];
              if(getLessonData.length) {
                     getLessonData.map((item, index) => {
                      console.log("item.video_url",item.video_url)
                      tempVideoList[sectionNumber-1][index] = item.video_url;
                      console.log("tempVideoList",tempVideoList) } )}
        }) }
  console.log("tempVideoList");
  setVideoList(tempVideoList);
  setLoading(false);
  },[lessonData]) ;

useEffect(() => {   

}, []); */


               

  const topics = (sectionData, lessonData) => {
    return (
      <CourseTitleDetails 
        sectionData = {sectionData} 
        lessonData = {lessonData} 
        studentDetails = {studentDetails}
        setVideoToPlay = {setVideoToPlay}
        setVideoList = {setVideoList}
        //handleAutoPlay = {handleAutoPlay}
        setVideoToPlayIndex = {setVideoToPlayIndex}
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
