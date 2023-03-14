import React from 'react';
import { Grid, Typography } from '@mui/material';
import { memo } from 'react';
import { ButtonComp, DividerLine } from 'src/components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';

type Props = {
  quizDataDetails: any[];
  setPreviewResult: any;
  fromLibrary?:any;
  onClose?:any;
  setTestTopic?:any;
  setShowQuizUnlockedMsg?:any;
};

const quizPreview = ({ quizDataDetails, setPreviewResult, fromLibrary, onClose,setTestTopic,setShowQuizUnlockedMsg }: Props) => {
  const theme = useTheme();

  const { i18n } = useTranslation();

  const handleClickContinue = ()=>{
    if(fromLibrary){
      onClose();
    }
    else{   
        setTestTopic(false);
        setShowQuizUnlockedMsg(false);  
    }
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
         {quizDataDetails[0]?.quizName}
        </Typography>):(
          <Typography
          sx={{
            fontSize: theme.MetricsSizes.regular_xx,
            fontWeight: theme.fontWeight.mediumBold
          }}
          >
          Quiz : {quizDataDetails[0]?.quizName}
        </Typography>)}        
        {/* <Typography>Quiz : {quizDataDetails[0]?.quizName}</Typography> */}
      </Grid>

      {quizDataDetails?.map((item, index) => {
        return (
          <>
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
                {quizDataDetails[index]?.question_number}.
                {quizDataDetails[index]?.question}
              </Typography>
            </Grid>

            <Grid item xs={12} container sx={{}}>
              {' '}
              {quizDataDetails[index]?.option_1 && (
                <Grid xs={12} sm={6}>
                  <Grid
                    sx={{
                      marginRight: '20px',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      //marginRight : '16px',
                      backgroundColor: theme.Colors.whiteLightGrey,
                      display: 'flex',
                      alignItems: 'center',
                      border:
                        parseInt(item.answer) === 1
                          ? '1px solid '
                          : '' || parseInt(item.userAnswer) === 1
                          ? '1px solid '
                          : '',
                      borderColor:
                        parseInt(item.answer) === 1
                          ? theme.Colors.darkGreen
                          : '' || parseInt(item.userAnswer) === 1
                          ? theme.Colors.redPrimary
                          : ''
                    }}
                  >
                    <Typography>1.{quizDataDetails[index].option_1}</Typography>
                  </Grid>
                </Grid>
              )}
              {quizDataDetails[index]?.option_2 && (
                <Grid
                  xs={12}
                  sm={6}
                  sx={{
                    borderRadius: '8px',
                    padding: '8px 16px',
                    backgroundColor: theme.Colors.whiteLightGrey,
                    display: 'flex',
                    alignItems: 'center',
                    border:
                      parseInt(item.answer) === 2
                        ? '1px solid '
                        : '' || parseInt(item.userAnswer) === 2
                        ? '1px solid '
                        : '',
                    borderColor:
                      parseInt(item.answer) === 2
                        ? theme.Colors.darkGreen
                        : '' || parseInt(item.userAnswer) === 2
                        ? theme.Colors.redPrimary
                        : ''
                  }}
                >
                  <Typography>2.{quizDataDetails[index]?.option_2}</Typography>
                </Grid>
              )}
              {quizDataDetails[index]?.option_3 && (
                <Grid xs={12} sm={6}>
                  <Grid
                    sx={{
                      marginRight: '20px',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      backgroundColor: theme.Colors.whiteLightGrey,
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px',
                      border:
                        parseInt(item.answer) === 3
                          ? '1px solid '
                          : '' || parseInt(item.userAnswer) === 3
                          ? '1px solid '
                          : '',
                      borderColor:
                        parseInt(item.answer) === 3
                          ? theme.Colors.darkGreen
                          : '' || parseInt(item.userAnswer) === 3
                          ? theme.Colors.redPrimary
                          : ''
                    }}
                  >
                    <Typography>
                      3.{quizDataDetails[index]?.option_3}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {quizDataDetails[index]?.option_4 && (
                <Grid
                  xs={12}
                  sm={6}
                  sx={{
                    borderRadius: '8px',
                    padding: '8px 16px',
                    backgroundColor: theme.Colors.whiteLightGrey,
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                    border:
                      parseInt(item.answer) === 4
                        ? '1px solid '
                        : '' || parseInt(item.userAnswer) === 4
                        ? '1px solid '
                        : '',
                    borderColor:
                      parseInt(item.answer) === 4
                        ? theme.Colors.darkGreen
                        : '' || parseInt(item.userAnswer) === 4
                        ? theme.Colors.redPrimary
                        : ''
                  }}
                >
                  <Typography>4.{quizDataDetails[index]?.option_4}</Typography>
                </Grid>
              )}
            </Grid>

            {
              (index<quizDataDetails.length-1) &&
              <DividerLine
              marginValue={60}
              backgroundColor={theme.Colors.greyLightMedium}
            /> }
          </>
        );
      })}
      <Grid
        container
        sx={{
          justifyContent:"flex-end",
          padding:"30px 0px"
        }}
      >
        <ButtonComp
                buttonTextColor={theme.Colors.whitePure}
                buttonText={'Continue learning'}
                onClickButton={handleClickContinue}
  
        ></ButtonComp>
      </Grid>
    </Grid>
  );
};

export default memo(quizPreview);
