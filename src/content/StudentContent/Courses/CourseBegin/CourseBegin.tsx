import { memo, useCallback, useEffect, useState } from 'react';
import { Box, Grid, makeStyles, styled, useTheme } from '@material-ui/core';

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



const CourseBegin = () => {
    
    const classes = useStyles();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState([]);
    const [videoList, setVideoList] = useState(null);
    const [videoToPlay, setVideoToPlay] = useState();
    const [lessonData, setLessonData] = useState<any[]>([]);
    const [sectionData, setSectionData] = useState<any[]>([]);
    const [autoPlay, setAutoPlay] = useState(true);

    const [videoToPlayIndex, setVideoToPlayIndex ] = useState({sectionNumber:0,lessonNumber:0});

    const fetchData = useCallback(async () => {
      let id = 1;
      try {
       
        const response: any = await API_SERVICES.courseManagementService.getById(
          id
        );        
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          setCourseData(response?.data);

          try {
            setSectionData([]);
            const responseSection: any =
              await API_SERVICES.sectionAndLessonService.getAllSection(
                response?.data?.course.id,
                LANGUAGE_ID.english
              );
            if (responseSection?.status < HTTP_STATUSES.BAD_REQUEST) {
                setSectionData(responseSection.data.Section);
                try {
                  setLessonData([]);
                  const responseLesson: any =
                    await API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
                      response?.data?.course.id,
                      LANGUAGE_ID.english
                    );
                  if (responseLesson?.status < HTTP_STATUSES.BAD_REQUEST) {
                      setLessonData(responseLesson.data.Lessons);

                      let sectionData1 = responseSection.data.Section;
                      let lessonData1 = responseLesson.data.Lessons;
                      let tempVideoList = Array(sectionData1?.length).fill(0).map((sectionData1,index) =>      
                      new Array((lessonData1.length
                      ? lessonData1.filter(
                          (lessonItm) => lessonItm.section_id === sectionData1.section_id
                          
                        )
                      : []).length) );
                    
                      if(sectionData1?.length){
                        sectionData1.map((item, index) => {
                            const sectionNumber = index + 1;
                              let getLessonData: any = lessonData1.length
                                ? lessonData1.filter(
                                    (lessonItm) => lessonItm.section_id === item.section_id
                                  )
                                : [];
                                if(getLessonData.length) {
                                      getLessonData.map((item, index) => {
                                        console.log("item.video_url",item.video_url)
                                        tempVideoList[sectionNumber-1][index] = item.video_url;
                                        console.log("tempVideoList",tempVideoList) } )}
                          }) }
                    console.log("tempVideoList",tempVideoList);
                    
                    setVideoList(tempVideoList);
                    setVideoToPlay(tempVideoList[0][0]);
                    setVideoToPlayIndex({sectionNumber: 0,lessonNumber : 0})
                    }                  
                } catch (err) {
                  toast.error(err?.message);
                } finally{
                  setLoading(false);
                }
              }
            }
            catch (err) {
            toast.error(err?.message);
          }
        
        
        }   
      } catch (err) {
        toast.error(err?.message);
      } finally {
         setLoading(false);
      }



    },[]);

    
    const handlePlayNext = () => {
      console.log("index of playing file",videoToPlayIndex);
      console.log("videoToPlayIndex.sectionNumber",videoToPlayIndex.sectionNumber);
      console.log("videoList",videoList.length);
      
      let nextLessonIndex : number = videoToPlayIndex.lessonNumber;  
      let nextSectionIndex : number =  videoToPlayIndex.sectionNumber; 
      if (nextLessonIndex-1 < videoList[nextSectionIndex].length)  {
        nextLessonIndex++;        
        return;
      }else {
        if (nextSectionIndex-1 < videoList.length){
          nextSectionIndex++;
          nextLessonIndex=0;
        } else{
          nextSectionIndex=0;
          nextLessonIndex=0;
        }

      }
    };

    const getVideoOfIndex = () => {
        

    };

    

  useEffect(() => {    
      fetchData();
    }, []);
    if (loading) {
      return <Loader />;
    } else {

  return (
  
    <Grid container className={classes.mainContainer}>
       <Grid item xs={12} sm={3} className={classes.outerContainer}>
        <CourseDetails courseData = {courseData}
          setVideoToPlay={setVideoToPlay} setVideoList= {setVideoList}
          sectionData ={sectionData} lessonData={lessonData}
          handleAutoPlay = {setAutoPlay}
          setVideoToPlayIndex = {setVideoToPlayIndex}
          />
      </Grid>
      <Grid item xs={12} sm={9} >
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
}};

export default memo(CourseBegin);
