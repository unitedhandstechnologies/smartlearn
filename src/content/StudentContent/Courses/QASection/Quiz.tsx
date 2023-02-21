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

type Props = {
  courseDetails: any[];
}

const Quiz = (props:Props) => {
  const {courseDetails} = props
  const theme = useTheme();
  const [quizData, setQuizData] = useState<any[]>([]);
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  console.log('courseDetails', courseDetails)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await API_SERVICES.quizService.getAllQuiz(
        courseDetails[0].course_id,
        LANGUAGE_ID.english
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        console.log('QUIZ response', response)
        if (response?.data?.quiz?.length) {
          // const filteredQuizData = response?.data?.quiz.filter(
          //   (item) => item.course_id === 1
          // );
          // console.log('filteredQuizData', filteredQuizData)
          // setQuizData(filteredQuizData);
          setQuizData(response?.data?.quiz)
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // const handleAnswerButtonClick = (isCorrect) =>{
  //   if(isCorrect === true) {
  //     setScore(score + 1);
  //     const nextQuestion = currentQuestion + 1;
  //     if(nextQuestion < questions.length){
  //     setCurrentQuestion(nextQuestion);
  //     } else {
  //       setShowScore(true);
  //     }
  //   }
  // };

  const handleClick = (item) => {
    // if(isCorrect === true) {
    //   setScore(score + 1);
    // }
    console.log('item', item);
    const nextQuestion = item.question + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Grid container>
        {quizData?.length
          ? quizData.slice(0, 1).map((item, index) => {
              return (
                <>
                  <Grid container direction='row'>
                    <Typography
                      style={{
                        // color: theme.Colors.blackPrimary,
                        fontWeight: 500,
                        fontSize: '24px'
                      }}
                    >{`Question  :${index + 1} `}</Typography>
                  </Grid>
                  <Grid container>
                    {quizData.length ? (
                      <Grid
                        item
                        key={index}
                        container
                        xs={12}
                      >
                        <Typography
                          variant="h5"
                          style={{
                            // color: theme.Colors.blackPrimary,
                            fontWeight: 500
                          }}
                        >
                          <Grid container>
                            <Grid
                              xs={12}
                              style={{ fontWeight: 500, fontSize: '16px' }}
                            >{`Question : ${item.question}`}</Grid>
                            <Grid item container>
                              <Grid xs={6}>
                                <ButtonComp
                                  buttonText={`Option 1 : ${item.option_1} `}
                                  backgroundColor="#F2F4F7"
                                  buttonFontSize={16}
                                  buttonFontWeight={400}
                                  buttonTextColor=" #3C414B"
                                  btnWidth="610px"
                                  btnBorderRadius="none"
                                  //  onClickButton={()=>handleAnswerButtonClick(answerOption.isCorrect)}
                                />
                              </Grid>
                              <Grid xs={6}>
                                <ButtonComp
                                  buttonText={` Option 2 : ${item.option_2} `}
                                  backgroundColor="#F2F4F7"
                                  buttonFontSize={16}
                                  buttonFontWeight={400}
                                  buttonTextColor=" #3C414B"
                                  btnWidth="610px"
                                  btnBorderRadius="none"
                                  //  onClickButton={()=>handleAnswerButtonClick(answerOption.isCorrect)}
                                />
                              </Grid>
                              <Grid xs={6} style={{marginTop:5}}>
                                <ButtonComp
                                  buttonText={` Option 3 : ${item.option_3} `}
                                  backgroundColor="#F2F4F7"
                                  buttonFontSize={16}
                                  buttonFontWeight={400}
                                  buttonTextColor=" #3C414B"
                                  btnWidth="610px"
                                  btnBorderRadius="none"
                                  //  onClickButton={()=>handleAnswerButtonClick(answerOption.isCorrect)}
                                />
                              </Grid>
                              <Grid xs={6} style={{marginTop:5}}>
                                <ButtonComp
                                  buttonText={` Option 4 : ${item.option_4} `}
                                  backgroundColor="#F2F4F7"
                                  buttonFontSize={16}
                                  buttonFontWeight={400}
                                  buttonTextColor=" #3C414B"
                                  btnWidth="610px"
                                  btnBorderRadius="none"
                                  //  onClickButton={()=>handleAnswerButtonClick(answerOption.isCorrect)}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Typography>
                        {/* <Grid
                          item
                          xs
                          justifyContent="flex-end"
                          style={{ display: 'flex' }}
                        ></Grid> */}
                      </Grid>
                    ) : null}
                  </Grid>
                  <Grid
                    item
                    container
                    style={{ paddingTop: 10 }}
                    justifyContent="flex-end"
                  >
                    <ButtonComp
                      height="40px"
                      buttonText="Next"
                      btnWidth="94px"
                      buttonFontSize={16}
                      buttonFontWeight={400}
                      btnBorderRadius="4px"
                      onClickButton={() => handleClick(item)}
                      endIcon={<ArrowForwardIcon fontSize="small" />}
                    />
                  </Grid>
                </>
              );
            })
          : []}
      </Grid>
    );
  }
};

{
  /* <Grid> */
}
{
  /* {showScore ? ( 
//     <Grid style={{padding:10}}>You scored {score} out of {questions}</Grid>
//   ) : (
//     <>
//       <Grid container spacing={1} style={{padding:10}}>
//       <Grid item xs={12} style={{fontWeight:500, fontSize:'24px'}}>Question {currentQuestion + 1}</Grid>
//         <Grid item xs={12} style={{fontWeight:500, fontSize:'16px'}}>{questions[currentQuestion].questionText}</Grid>
//       </Grid>
//       <Grid container spacing={1}>
//         {questions[currentQuestion].answerOptions.map(
//           (answerOption, index) => (
//             <Grid item key={index} xs={6}>
//               <ButtonComp
//                buttonText={answerOption.answerText}
//                backgroundColor='#F2F4F7'
//                buttonFontSize={16}
//                buttonFontWeight={400}
//                buttonTextColor=" #3C414B"
//                btnWidth="620px"
//                btnBorderRadius='none'
//                onClickButton={()=>handleAnswerButtonClick(answerOption.isCorrect)}
//                />
//             </Grid>
//           )
//         )}
//       </Grid>
// <Grid item container style={{paddingTop:10}} justifyContent='flex-end'>
// <ButtonComp
//   height="40px"
//   buttonText="Next"
//   btnWidth="94px"
//   buttonFontSize={16}
//   buttonFontWeight={400}
//   btnBorderRadius='4px'
//   onClickButton={handleClick}
//   endIcon={<ArrowForwardIcon fontSize="small" />}
// />
  // </Grid>*/
}

export default Quiz;
