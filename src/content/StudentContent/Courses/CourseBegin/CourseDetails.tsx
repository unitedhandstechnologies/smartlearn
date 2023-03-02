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
  display : 'flex',
 
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
  lessonData,
  sectionData,
  //handleAutoPlay,
  //setVideoToPlayIndex,
  //studentDetails,
  videoToPlayIndex,
  quizData,
  setTestTopic,
  videoDetails,
  setIsReady
}) => {
  const theme = useTheme();

const getRemainingTime = ( )=>{
  let totalTime=0;
   (videoDetails.map((row,rowIndex)=>{
    row.map((item,index)=>{

      totalTime = totalTime+ item.videoRemainingTime;
    })
  }));
 
  let hours,mins,secs;
  if(totalTime>60  ){
  hours=(String(totalTime/60).split(".")[0]);
  mins=(String(totalTime-(hours*60)).split(".")[0]);
  secs=(String(totalTime-(hours*60)).split(".")[1]);

  }
  else{
  hours=0;
  mins=(String(totalTime).split(".")[0]);
  secs=(String(totalTime).split(".")[1]);
  }
  return `${hours}hours ${mins}mins ${secs.slice(0,2)}secs`
};

const studentDetails = {
  remainingDuration : "11hrs 45mins 30 sec",
};
          
  const topics = (sectionData, lessonData) => {
    return (
      <CourseTitleDetails 
        sectionData = {sectionData} 
        lessonData = {lessonData} 
        setVideoToPlay = {setVideoToPlay}
        //handleAutoPlay = {handleAutoPlay}videoToPlayIndex
        videoToPlayIndex = {videoToPlayIndex}
        quizData = {quizData}
        setTestTopic = {setTestTopic}
        videoDetails={videoDetails}
        setIsReady={setIsReady}
             />
    )
  };



    
  return (
    <Grid >
      <Typography 
        sx={{    
          fontWeight : 500,
          fontSize : '24px'}}
      >
        {courseData.course_language[0].course_name}
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
            >{getRemainingTime()}</Typography>
        </RemainingTimeGrid>
      </LessonGrid>
      <TopicsListGrid>
        {topics(sectionData, lessonData)}
      </TopicsListGrid>
    </Grid>
  );
};

export default memo(CourseDetails);
