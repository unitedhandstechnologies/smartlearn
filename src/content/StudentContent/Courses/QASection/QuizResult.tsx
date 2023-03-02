import { Grid, makeStyles, Typography} from '@mui/material';
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
import CircularProgressWithLabel from 'src/components/CircularProgressWithLabel';
import { useTheme } from '@material-ui/core';
import QuizPreview from './QuizPreview';

type Props = {
  quizDataDetails: any[];
}

const QuizResult = ({quizDataDetails}:Props) => {

  const theme = useTheme();
  const [previewResult , setPreviewResult ] = useState(false);

  const getTotalCorrectAnswers = () => {
    let answerCount = 0;
        quizDataDetails.map((item,index)=>{
            answerCount = answerCount + item.correctCount;
        });

        return answerCount;
 };

 const handleClickPreview = () => {
    setPreviewResult(true);
 };

 const handleClickContinue = () => {
   
 };
  
 useEffect(()=>{
    getTotalCorrectAnswers();
 },[]);

   return (

      <Grid container>
        { !previewResult ? (
            <>
        <Grid item xs={12}
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                paddingTop : '60px'
            }}
        >
            <Typography
                sx={{
                    color : theme.Colors.mediumGreenShade,
                    fontSize : theme.MetricsSizes.regular_xxx,
                    fontWeight : theme.fontWeight.mediumBold
                }}
            >
                Congratulation !
            </Typography>
        </Grid>
        <Grid item xs={12}
            sx={{
                paddingTop : '40px',
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
            }}
        >
        <CircularProgressWithLabel  
            marks = {getTotalCorrectAnswers()}
            outOf = {quizDataDetails.length}
            value = {getTotalCorrectAnswers()/quizDataDetails.length*100}
        />
        </Grid>
        <Grid item xs={12} 
            gap={'32px'}
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                paddingTop : '40px'
            }}
        >
            <ButtonComp
                variant = {'outlined'}                
                backgroundColor = {theme.Colors.whitePure}
                buttonTextColor= {theme.Colors.primary}
                buttonText={'Preview quiz results '}
                onClickButton = {handleClickPreview}
            >
            </ButtonComp>
            <ButtonComp
                 buttonTextColor= {theme.Colors.whitePure}
                 buttonText={'Continue learning'}
                 onClickButton = {handleClickContinue}
            >
            </ButtonComp>
            
        </Grid>
        </>) : (
            <QuizPreview 
            quizDataDetails = {quizDataDetails}
            setPreviewResult = {setPreviewResult}
        
            />)
}
        
      </Grid>
    );
};




export default QuizResult;
 