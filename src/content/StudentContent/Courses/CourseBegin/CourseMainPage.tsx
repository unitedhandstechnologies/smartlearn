import { memo, useCallback, useEffect, useState } from 'react';
import { Box, Grid, makeStyles, styled, Typography, useTheme } from '@material-ui/core';

import CourseDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseDetails';
import toast from 'react-hot-toast';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { Loader } from 'src/components';
import ReactPlayer from 'react-player'
import React from 'react';
import { number } from 'prop-types';

const useStyles = makeStyles((theme) =>({
  outerContainer: {
    padding : '18px 18px',
    border : '1px solid',
    borderColor : theme.Colors.primary,
    borderRadius : '5px',
    backgroundColor : theme.Colors.whitePure,
    flexDirection : 'row',
    
  },
  playerContainer :{
    padding : '32px',
  },
  mainContainer : {
    [theme.breakpoints.down('sm')]: { flexWrap:' wrap-reverse' }
    
  }
}));

const MainGrid = styled(Grid)(({theme}) => ({

  sx : {
    
    [theme.breakpoints.down('sm')]: {  flexWrap: 'wrap-reverse' }
  }
 
}));



const CourseMainPage = (
    {
        courseData,
        videoList,
        videoToPlay,
        lessonData,
        sectionData,
        videoToPlayIndex,
        setVideoToPlay,
        setVideoToPlayIndex,
        setVideoList,
        videoName
    }
) => {
    
    const classes = useStyles();
    const theme = useTheme();
   

    
    const handlePlayNext = () => {
      console.log("videoList",videoList)
      console.log("index of playing file",videoToPlayIndex)   
      
      let nextLessonIndex : number = videoToPlayIndex.lessonNumber;  
      let nextSectionIndex : number =  videoToPlayIndex.sectionNumber; 
      if (nextLessonIndex < videoList[nextSectionIndex].length-1)  {
        nextLessonIndex++;   
        setVideoToPlayIndex({sectionNumber : nextSectionIndex , lessonNumber : nextLessonIndex })
        setVideoToPlay(videoList[nextSectionIndex][nextLessonIndex]); 
        console.log("selected video id",nextSectionIndex,nextLessonIndex)  
        console.log(videoList[nextSectionIndex][nextLessonIndex]); 

        return;
      }else {
        if (nextSectionIndex < videoList.length-1){
          nextSectionIndex++;
          nextLessonIndex=0;
          setVideoToPlayIndex({sectionNumber : nextSectionIndex , lessonNumber : nextLessonIndex })
          setVideoToPlay(videoList[nextSectionIndex][nextLessonIndex]); 
          console.log("selected video id",nextSectionIndex,nextLessonIndex)
          return;
        } else{
            nextSectionIndex=0;
            nextLessonIndex=0;
          setVideoToPlayIndex({sectionNumber : nextSectionIndex , lessonNumber : nextLessonIndex })
          setVideoToPlay(videoList[nextSectionIndex][nextLessonIndex]); 

          console.log("selected video id",nextSectionIndex,nextLessonIndex)
          
        }
      }
      
    };

   useEffect(() => {    
      
    }, [videoToPlay]); 



  return (
  
    <Grid container className={classes.mainContainer}>
       <Grid item xs={12} sm={3} className={classes.outerContainer}>
        <CourseDetails courseData = {courseData}
          setVideoToPlay={setVideoToPlay} setVideoList= {setVideoList}
          sectionData ={sectionData} lessonData={lessonData}
          //handleAutoPlay = {setAutoPlay}
          setVideoToPlayIndex = {setVideoToPlayIndex}
          videoToPlayIndex={videoToPlayIndex}
          />
      </Grid>
      <Grid item xs={12} sm={9} >
      <Typography style={{
        padding:'0px 32px',
        fontSize: theme.MetricsSizes.medium
      }}>{videoToPlayIndex.sectionNumber+1} . {videoToPlayIndex.lessonNumber+1} {videoName[videoToPlayIndex.sectionNumber][videoToPlayIndex.lessonNumber]}</Typography>
        <Grid className={classes.playerContainer}>
          <ReactPlayer 
            url={videoToPlay} 
            playing={true} 
            controls={true}
            width={'100%'}
            height={'100%'}
            onEnded={handlePlayNext}
            />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(CourseMainPage);
