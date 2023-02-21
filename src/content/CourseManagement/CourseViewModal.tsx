import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  useTheme
} from '@material-ui/core';
import {
  ButtonComp,
  DialogComp,
  DialogContentDetails,
  MuiAccordionComp,
  MuiConfirmModal
} from 'src/components';
import { useTranslation } from 'react-i18next';
import { getDateFormat } from 'src/Utils';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { toast } from 'react-hot-toast';
import {
  Add,
  Delete,
  Edit,
  PlayCircleFilledOutlined
} from '@material-ui/icons';
import AddNewQuizQA from './AddNewQuizQA';
import { CONFIRM_MODAL } from 'src/Config/constant';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 747,
      height: 505,
      padding: theme.spacing(2, 1, 2, 2),
      borderRadius: theme.MetricsSizes.regular
    },
    accordionClassName: {
      marginTop: 10
    },
    leftContentStyle: {
      color: theme.Colors.blueDark,
      fontWeight: 600
    },
    quizHeading: {
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.MetricsSizes.regular_xxx,
      color: theme.Colors.blueDark
    }
  };
});

type Props = { onClose: () => void; rowData: any };

const CourseViewModal = (props: Props) => {
  const { onClose, rowData } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [lessonData, setLessonData] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState<any[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [openVideo, setOpenVideo] = useState<any>({ open: false });
  const [openQuizModal, setOpenQuizModal] = useState<any>({
    open: false
  });
  const [confirmModal, setConfirmModal] = useState<any>({
    open: false
  });

  const fetchData = async () => {
    try {
      setLessonData([]);
      setSectionData([]);
      setQuizData([]);
      const response: any = await Promise.all([
        API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
          rowData?.id,
          LANGUAGE_ID.english
        ),
        API_SERVICES.sectionAndLessonService.getAllSection(
          rowData?.id,
          LANGUAGE_ID.english
        ),
        API_SERVICES.quizService.getAllQuiz(LANGUAGE_ID.english, rowData?.course_id)
      ]);
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.Lessons?.length) {
          setLessonData(response[0]?.data?.Lessons);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.Section?.length) {
          setSectionData(response[1]?.data?.Section);
        }
      }
      if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
        {
          if (response[2]?.data?.quiz?.length) {
            setQuizData(response[2]?.data?.quiz);
          }
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const onDeleteQuiz = (quizId: number) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };

    const onConfirmClick = async () => {
      const deleteQuiz: any = await API_SERVICES.quizService.deleteQuiz(
        quizId,
        {
          successMessage: 'Quiz Question and Answer deleted successfully!',
          failureMessage: 'Quiz couldnt been Deleted!'
        }
      );

      if (deleteQuiz?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete the Quiz Question?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const handleClose = () => {
    setOpenVideo({ open: false });
  };

  const renderCont = (url) => {
    return (
      <Grid>
        <video width="600" height="340" controls autoPlay={true}>
          <source src={url} type="video/mp4" />
        </video>
      </Grid>
    );
  };

  const handleCloseQuizModal = useCallback(() => {
    setOpenQuizModal({ open: false });
  }, []);

  const onClickAddOrEditQuiz = useCallback(
    async (type?: string, courseId?: number, quizId?: number) => {
      if (type === CONFIRM_MODAL.edit) {
        const response: any = await API_SERVICES.quizService.getQuizById(
          quizId
        );
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          setOpenQuizModal({
            open: true,
            type: type,
            rowData: response?.data,
            quizId: quizId,
            updateData: fetchData
          });
        }
        return;
      }
      setOpenQuizModal({
        open: true,
        courseId: courseId,
        type: CONFIRM_MODAL.create,
        updateData: fetchData
      });
    },
    []
  );

  useEffect(() => {
    fetchData()
  }, []);

  const getAccordionContents: any = React.useMemo(() => {
    return sectionData?.length
      ? sectionData.map((item, index) => {
          let getLessonData: any = lessonData.length
            ? lessonData.filter(
                (lessonItm) => lessonItm.section_id === item.section_id
              )
            : [];

          return {
            id: index + 1,
            renderAccordionTitle: () => (
              <Grid container alignItems="center" style={{ gap: '10px' }}>
                <Typography
                  variant="h4"
                  style={{
                    color: theme.Colors.blackPrimary,
                    fontWeight: 600
                  }}
                >{`Section:${index + 1} - ${item.section_name}`}</Typography>
              </Grid>
            ),
            accContentDetail: () => (
              <Grid container direction="column" spacing={2}>
                {getLessonData.length
                  ? getLessonData.map((item, index) => {
                      return (
                        <Grid
                          item
                          key={index}
                          container
                          xs={12}
                          style={{ gap: 10 }}
                          alignItems="center"
                        >
                          <PlayCircleFilledOutlined fontSize="medium" />
                          <Typography
                            variant="h5"
                            style={{
                              color: theme.Colors.blackPrimary,
                              fontWeight: 500
                            }}
                          >{`Lesson:${index + 1} - ${
                            item.lesson_name
                          }`}</Typography>
                          <Grid
                            item
                            xs
                            justifyContent="flex-end"
                            style={{ display: 'flex' }}
                          >
                            <ButtonComp
                              btnWidth={100}
                              height={25}
                              buttonFontSize={theme.MetricsSizes.small_x}
                              backgroundColor={theme.Colors.lightGrey}
                              buttonTextColor={theme.Colors.black}
                              buttonText={t('course.preview')}
                              onClickButton={() => {
                                setOpenVideo({
                                  open: true,
                                  dialogTitle: item.lesson_name,
                                  renderDialogContent: () =>
                                    renderCont(item.video_url)
                                });
                              }}
                            />
                          </Grid>
                        </Grid>
                      );
                    })
                  : null}
              </Grid>
            )
          };
        })
      : [];
  }, [sectionData, lessonData]);

  const getAccordionContentsForQuiz: any = React.useMemo(() => {
    const getQuizDatass = quizData.length
      ? quizData.filter((item) => item.course_id === rowData.course_id)
      : [];

    return getQuizDatass?.length
      ? getQuizDatass.map((item, index) => {
          return {
            id: index + 1,
            renderAccordionTitle: () => (
              <Grid container alignItems="center" style={{ gap: '10px' }}>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    onClickAddOrEditQuiz(
                      CONFIRM_MODAL.edit,
                      rowData.course_id,
                      item.quiz_id
                    );
                  }}
                  style={{ padding: 5 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteQuiz(item?.quiz_id);
                  }}
                  style={{ padding: 5 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
                <Typography
                  variant="h4"
                  style={{
                    color: theme.Colors.blackPrimary,
                    fontWeight: 600
                  }}
                >{`Question  :${index + 1} `}</Typography>
              </Grid>
            ),
            accContentDetail: () => (
              <Grid container direction="column" spacing={2}>
                {getQuizDatass.length ? (
                  <Grid
                    item
                    key={index}
                    container
                    xs={12}
                    style={{ gap: 10 }}
                    alignItems="center"
                  >
                    <Typography
                      variant="h5"
                      style={{
                        color: theme.Colors.blackPrimary,
                        fontWeight: 500
                      }}
                    >
                      <Grid container direction="row">
                        <Grid xs={12}>{`Question : ${item.question}`}</Grid>
                        <Grid xs={12}>{` Option 1 : ${item.option_1} `} </Grid>
                        <Grid xs={12}>{` Option 2 : ${item.option_2} `} </Grid>
                        <Grid xs={12}>{` Option 3 : ${item.option_3} `} </Grid>
                        <Grid xs={12}>{` Option 4 : ${item.option_4} `} </Grid>
                      </Grid>
                    </Typography>
                    <Grid
                      item
                      xs
                      justifyContent="flex-end"
                      style={{ display: 'flex' }}
                    ></Grid>
                  </Grid>
                ) : null}
              </Grid>
            )
          };
        })
      : [];
  }, [quizData]);

  const renderDialogContent = () => {
    const { getMonth, getDate, getYear } = getDateFormat(rowData?.updated_at);
    let contentDetails = [
      { content: 'Title', value: rowData?.course_name },
      { content: 'Description', value: rowData?.course_description },
      { content: 'Requirements', value: rowData?.requirements },
      { content: 'Chapter', value: rowData?.chapter },
      {
        content: 'Mentor Name',
        value: rowData?.mentor_name
      },
      { content: 'Course Level Id', value: rowData?.course_level_id },
      { content: 'Course Level Name', value: rowData?.course_level_name },
      {
        content: 'Category Name',
        value: rowData?.category_name
      },
      { content: 'SubCategory Name', value: rowData?.sub_category_name },
      {
        content: 'Fees',
        value: rowData?.amount
      },
      {
        content: 'Discount',
        value: rowData?.discount
      },
      {
        content: 'CourseType ',
        value: rowData?.course_type
      },
      {
        content: 'Cost Type',
        value: rowData?.cost_type
      },
      {
        content: 'Duration',
        value: rowData?.duration
      },
      {
        content: 'Starting Date',
        value: rowData?.starting_date
      },
      {
        content: 'Starting Time',
        value: rowData?.starting_time
      },
      {
        content: 'Ending Date',
        value: rowData?.ending_date
      },
      {
        content: 'Ending Time',
        value: rowData?.ending_time
      },
      {
        content: 'Mode',
        value: rowData?.course_mode
      },
      {
        content: 'Meeting Location',
        value: rowData?.meeting_location
      },
      {
        content: 'Meeting Link',
        value: rowData?.meeting_link
      },
      {
        content: 'Course Status',
        value: rowData?.course_status
      },
      {
        content: 'Course Update Date',
        value: `${getMonth} ${getDate}, ${getYear}`
      },
      {
        content: 'Course Image',
        value: <img src={rowData?.image_url} width={250} height={250} />
      }
    ];
    contentDetails = contentDetails.filter(
      (i) => i.value != 'undefined' && i.value != ''
    );

    return (
      <Grid container>
        <Grid item xs={12}>
          <DialogContentDetails contentDetails={contentDetails} />
        </Grid>
        {rowData?.course_type === 'Recorded Course' && (
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Typography variant="h4" className={classes.leftContentStyle}>
              {t('course.courseDetails')}
            </Typography>
            <MuiAccordionComp
              accordionOuterContainerClassName={classes.accordionClassName}
              config={getAccordionContents}
            />
          </Grid>
        )}
        <Grid xs={12}>
          <Typography
            className={classes.quizHeading}
            style={{ color: theme.Colors.blackMedium }}
          >
            Quiz Details
          </Typography>
        </Grid>
        <Grid>
          <ButtonComp
            buttonText="Add Quiz QA"
            buttonFontSize={theme.MetricsSizes.small_x}
            backgroundColor={theme.Colors.mediumGreen}
            height={theme.MetricsSizes.large}
            btnBorderRadius="5px"
            startIcon={<Add />}
            onClickButton={() =>
              onClickAddOrEditQuiz(CONFIRM_MODAL.create, rowData.course_id)
            }
          />

          <MuiAccordionComp
            accordionOuterContainerClassName={classes.accordionClassName}
            config={getAccordionContentsForQuiz}
          />
        </Grid>

        {openVideo && (
          <DialogComp
            open={true}
            dialogClasses={{ paper: classes.dialogPaper }}
            dialogTitleStyle={{
              color: theme.Colors.blackMedium
            }}
            onClose={handleClose}
            {...openVideo}
          />
        )}
        {openQuizModal.open ? (
          <AddNewQuizQA
            handleClose={handleCloseQuizModal}
            updateData={fetchData}
            {...openQuizModal}
          />
        ) : null}

        {confirmModal.open ? <MuiConfirmModal {...confirmModal} /> : null}
      </Grid>
    );
  };

  return (
    <DialogComp
      dialogTitle={rowData?.course_name}
      avatarImg={rowData?.image_url}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      dialogTitleStyle={{
        color: theme.Colors.blackMedium
      }}
      renderDialogContent={renderDialogContent}
    />
  );
};

export default CourseViewModal;
