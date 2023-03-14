import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { memo } from 'react';
import { ButtonComp } from 'src/components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';

type Props = {
  quizDataDetails: any[];
  setQuizDataDetails: any;
  questionToDisplayIndex: any;
  setQuestionToDisplayIndex: any;
  setQuizResult: any;
  fromLibrary?: any;
};

const QuestionAndAnswer = ({
  quizDataDetails,
  setQuizDataDetails,
  questionToDisplayIndex,
  setQuestionToDisplayIndex,
  setQuizResult,
  fromLibrary
}: Props) => {
  const theme = useTheme();

  const { i18n } = useTranslation();
  const [optionClicked, setOptionClicked] = useState(0);

  const handleClickNextQuestion = () => {
    setOptionClicked(0);
    if (questionToDisplayIndex < quizDataDetails.length - 1) {
      if (quizDataDetails[questionToDisplayIndex].userAnswer)
        setQuestionToDisplayIndex(questionToDisplayIndex + 1);
      else toast.error('Please Choose an option');
    } else {
      setQuizResult(true);
    }
  };

  const handleClickOption = (selectedOption) => {
    let tempQuizDetails = quizDataDetails;
    tempQuizDetails[questionToDisplayIndex].userAnswer = selectedOption;
    if (
      selectedOption ===
      parseInt(tempQuizDetails[questionToDisplayIndex].answer)
    ) {
      tempQuizDetails[questionToDisplayIndex].correctCount = 1;
      setQuizDataDetails(tempQuizDetails);
    }
    setOptionClicked(selectedOption);
  };

  return (
    <Grid
      container
      sx={{
        padding: '0px 24px'
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          paddingBottom: '24px'
        }}
      >
        { fromLibrary ? (
        <Typography
          sx={{
            fontSize: theme.MetricsSizes.regular_xx,
            fontWeight: theme.fontWeight.mediumBold
          }}
        >
         {quizDataDetails[questionToDisplayIndex]?.quizName}
        </Typography>):(
          <Typography
          sx={{
            fontSize: theme.MetricsSizes.regular_xx,
            fontWeight: theme.fontWeight.mediumBold
          }}
          >
          Quiz : {quizDataDetails[questionToDisplayIndex]?.quizName}
        </Typography>)}        
      </Grid>
      <Grid sx={{
       
      }}>
      <Grid
        item
        xs={12}
        sx={{
          padding: '24px 0px'
        }}
      >
        <Typography
          sx={{
            fontSize: theme.MetricsSizes.regular_x,
            fontWeight: theme.fontWeight.medium,
          }}
        >
          {quizDataDetails[questionToDisplayIndex]?.question_number}.
          {quizDataDetails[questionToDisplayIndex]?.question}
        </Typography>
      </Grid>

      <Grid item xs={12} container sx={{}}>
        {quizDataDetails[questionToDisplayIndex]?.option_1 && (
          <Grid xs={12} sm={6}>
            <Grid
              onClick={() => handleClickOption(1)}
              sx={{
                marginRight: '20px',
                borderRadius: '8px',
                padding: '8px 16px',
                //marginRight : '16px',
                backgroundColor: theme.Colors.whiteLightGrey,
                display: 'flex',
                alignItems: 'center',
                border: optionClicked === 1 ? '1px solid ' : '',
                borderColor: optionClicked === 1 ? theme.Colors.primary : '',
                [theme.breakpoints.down('sm')]: { marginRight: '0px' }
              }}
            >
              <Typography>
                1.{quizDataDetails[questionToDisplayIndex]?.option_1}
              </Typography>
            </Grid>
          </Grid>
        )}
        {quizDataDetails[questionToDisplayIndex]?.option_2 && (
          <Grid
            xs={12}
            sm={6}
            onClick={() => handleClickOption(2)}
            sx={{
              borderRadius: '8px',
              padding: '8px 16px',
              backgroundColor: theme.Colors.whiteLightGrey,
              display: 'flex',
              alignItems: 'center',
              border: optionClicked === 2 ? '1px solid ' : '',
              borderColor: optionClicked === 2 ? theme.Colors.primary : '',
              [theme.breakpoints.down('sm')]: { marginTop: '20px' }
            }}
          >
            <Typography>
              2.{quizDataDetails[questionToDisplayIndex]?.option_2}
            </Typography>
          </Grid>
        )}
        {quizDataDetails[questionToDisplayIndex]?.option_3 && (
          <Grid xs={12} sm={6}>
            <Grid
              onClick={() => handleClickOption(3)}
              sx={{
                marginRight: '20px',
                borderRadius: '8px',
                padding: '8px 16px',
                backgroundColor: theme.Colors.whiteLightGrey,
                display: 'flex',
                alignItems: 'center',
                marginTop: '20px',
                border: optionClicked === 3 ? '1px solid ' : '',
                borderColor: optionClicked === 3 ? theme.Colors.primary : '',
                [theme.breakpoints.down('sm')]: { marginRight: '0px' }
              }}
            >
              <Typography>
                3.{quizDataDetails[questionToDisplayIndex]?.option_3}
              </Typography>
            </Grid>
          </Grid>
        )}
        {quizDataDetails[questionToDisplayIndex]?.option_4 && (
          <Grid
            xs={12}
            sm={6}
            onClick={() => handleClickOption(4)}
            sx={{
              borderRadius: '8px',
              padding: '8px 16px',
              backgroundColor: theme.Colors.whiteLightGrey,
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px',
              border: optionClicked === 4 ? '1px solid ' : '',
              borderColor: optionClicked === 4 ? theme.Colors.primary : ''
            }}
          >
            <Typography>
              4.{quizDataDetails[questionToDisplayIndex]?.option_4}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: '48px'
        }}
      >
        <ButtonComp
          buttonTextColor={theme.Colors.whitePure}
          buttonText={'Next'}
          onClickButton={handleClickNextQuestion}
          iconImage={<ArrowForwardIcon />}
        ></ButtonComp>
      </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(QuestionAndAnswer);
