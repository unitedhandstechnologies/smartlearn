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

type Props = {
  quizData: any[];
}

const Quiz = (props:Props) => {
  const {quizData} = props
  const theme = useTheme();
  const [ questionToDisplayIndex , setQuestionToDisplayIndex ] = useState(0);
  const [ quizDataDetatils, setQuizDataDetatils ] = useState<any>([]);
  const { i18n } = useTranslation();

  let tempQuizArray;
/*   quizData?.length
    ? quizData.map((item, index) => {
      let questionAnswer = 0
      tempQuizArray[index] = questionAnswer;
      }): []; */
    
    return (
      <Grid container>
        
          {/* <QuestionAndAnswer 
            quizDataDetails = {quizDataDetatils}  
            setQuizDataDetails = {setQuizDataDetatils} 
            setQuestionToDisplayIndex = {setQuestionToDisplayIndex}
            questionToDisplayIndex = {questionToDisplayIndex}
            /> */}

      </Grid>
    );
};



export default Quiz;
