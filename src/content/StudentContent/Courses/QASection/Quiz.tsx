import { Grid, makeStyles, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { ButtonComp, Loader } from 'src/components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  COURSE_STATUS_ID,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import toast from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';
import { useTranslation } from 'react-i18next';
import QuestionAndAnswer from './QuestionAndAnswer';
import QuizResult from './QuizResult';

type Props = {
  //quizData: any[];
}

const Quiz = (props:Props) => {

  const theme = useTheme();
  const [ questionToDisplayIndex , setQuestionToDisplayIndex ] = useState(0);
  const [ quizDataDetails, setQuizDataDetails ] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [ quizResult , setQuizResult ] = useState(false)
  const { i18n } = useTranslation();

const fetchData = useCallback(async() => {
  let id = 6;
  let courseName = "Name of the Course";
  try {      
    const response: any = await Promise.all([
      API_SERVICES.quizService.getAllQuiz(LANGUAGE_ID.english,id)    
    ]);
    if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
      
  let tempQuizArray = Array(response[0]?.data?.quiz?.length);
  response[0]?.data?.quiz.map((item,index)=>{
    tempQuizArray[index] = {
      quizName : courseName,
      question_number : index+1,
      question : item.question,
      option_1 : item.option_1,
      option_2 : item.option_2,
      option_3 : item.option_3,
      option_4 : item.option_4,
      answer : item.answer,
      userAnswer : 0,
      correctCount : 0      
    }
  });
  setQuizDataDetails(tempQuizArray);
}
} catch (err) {
  toast.error(err?.message);
} finally{
  setLoading(false);
}
},[] );
  
useEffect(() => {
  fetchData();
}, []);  
    

if (loading) {
  return <Loader />;
} else {
    return (
      <Grid container>
        { !quizResult ? (
           <QuestionAndAnswer 
            quizDataDetails = {quizDataDetails}  
            setQuizDataDetails = {setQuizDataDetails} 
            setQuestionToDisplayIndex = {setQuestionToDisplayIndex}
            questionToDisplayIndex = {questionToDisplayIndex}
            setQuizResult = {setQuizResult}
            /> 
        ) : (
            <QuizResult  quizDataDetails={quizDataDetails} />
        )}
      </Grid>
    );
}
};



export default Quiz;
 