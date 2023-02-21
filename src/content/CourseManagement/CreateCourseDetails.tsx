import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core';
import { ButtonComp, MuiAccordionComp, MuiConfirmModal } from 'src/components';
import {
  Add,
  Delete,
  DeleteTwoTone,
  Edit,
  EditTwoTone,
  PlayCircleFilledOutlined
} from '@material-ui/icons';
import { API_SERVICES } from 'src/Services';
import { toast } from 'react-hot-toast';
import { CONFIRM_MODAL, HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import AddNewSectionModal from './AddNewSectionModal';
import AddNewLessonModal from './AddNewLessonModal';
import { useTranslation } from 'react-i18next';
import AddNewQuizQA from './AddNewQuizQA';

const useStyles = makeStyles(() => ({
  accordionClassName: {
    marginTop: 10
  }
}));

const CreateCourseDetails = ({ courseRef }: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [lessonData, setLessonData] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState<any[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [openSectionModal, setOpenSectionModal] = useState<any>({
    open: false
  });
  const [openLessonModal, setOpenLessonModal] = useState<any>({
    open: false
  });
  const [openQuizModal, setOpenQuizModal] = useState<any>({
    open: false
  });
  const [confirmModal, setConfirmModal] = useState<any>({
    open: false
  });

  const fetchSectionData = async () => {
    try {
      setSectionData([]);
      const response: any =
        await API_SERVICES.sectionAndLessonService.getAllSection(
          courseRef.current[0].courseId,
          LANGUAGE_ID.english
        );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.Section) {
          courseRef.current[0].chapter = response.data.Section.length;
          setSectionData(response.data.Section);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const fetchLessonData = async () => {
    try {
      setLessonData([]);
      const response: any =
        await API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
          courseRef.current[0].courseId,
          LANGUAGE_ID.english
        );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.Lessons) {
          courseRef.current[0].section = response.data.Lessons.length;
          setLessonData(response.data.Lessons);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    fetchSectionData();
    fetchLessonData();
  }, []);

  const onClickAddOrEditSection = useCallback(
    async (type: string, sectionId?: number) => {
      if (type === CONFIRM_MODAL.edit) {
        const response: any =
          await API_SERVICES.sectionAndLessonService.getBySectionId(sectionId);
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          setOpenSectionModal({
            open: true,
            courseId: sectionId,
            rowData: response.data,
            type: type
          });
        }
        return;
      }
      setOpenSectionModal({
        open: true,
        courseId: courseRef.current[0].courseId,
        type: type
      });
    },
    []
  );

  const handleCloseSectionModal = useCallback(() => {
    setOpenSectionModal({ open: false });
  }, []);

  const handleCloseLessonModal = useCallback(() => {
    setOpenLessonModal({ open: false });
  }, []);

/*   const handleCloseQuizModal = useCallback(() => {
    setOpenQuizModal({ open: false });
  }, []); */

  const onDeleteSection = (sectionId: number) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any =
        await API_SERVICES.sectionAndLessonService.deleteSection(sectionId, {
          successMessage: 'Section deleted successfully!'
        });

      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchSectionData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete the Section?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const onDeleteLesson = (lessonId: number) => {
    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    const onConfirmClick = async () => {
      const deleteUserRes: any =
        await API_SERVICES.sectionAndLessonService.deleteLesson(lessonId, {
          successMessage: 'Lesson deleted successfully!'
        });

      if (deleteUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
        onCancelClick();
        fetchLessonData();
      }
    };
    let props = {
      color: theme.Colors.redPrimary,
      description: 'Are you sure want to delete the lesson?',
      title: t('delete'),
      iconType: CONFIRM_MODAL.delete
    };
    setConfirmModal({ open: true, onConfirmClick, onCancelClick, ...props });
  };

  const onClickAddOrEditLesson = useCallback(
    async (sectionId?: number, lessonId?: number, type?: string) => {
      const courseId = courseRef?.current[0]?.courseId;
      if (type === CONFIRM_MODAL.edit) {
        const response: any =
          await API_SERVICES.sectionAndLessonService.getLessonById(lessonId);
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          setOpenLessonModal({
            open: true,
            type: type,
            rowData: response?.data
          });
        }
        return;
      }
      setOpenLessonModal({
        open: true,
        courseId: courseId,
        sectionId: sectionId,
        type: CONFIRM_MODAL.create
      });
    },
    []
  );

/*   const onClickAddOrEditQuiz = useCallback(
    async (sectionId?: number, lessonId?: number, type?: string) => {
      const courseId = courseRef?.current[0]?.courseId;
      if (type === CONFIRM_MODAL.edit) {
         const response: any =
          await API_SERVICES.sectionAndLessonService.getLessonById(lessonId);
        if ( response?.status < HTTP_STATUSES.BAD_REQUEST ) {
          setOpenQuizModal({
            open: true,
            type: type,
            //rowData: response?.data
          });
        }
        return;
      }
      setOpenQuizModal({
        open: true,
        courseId: courseId,
        sectionId: sectionId,
        type: CONFIRM_MODAL.create
      });
    },
    []
  ); */

  const getAccordionContents: any = React.useMemo(() => {
    return sectionData?.length
      ? sectionData.map((item, index) => {
          let getLessonData: any = lessonData.length
            ? lessonData.filter(
                (lessonItm) => lessonItm.section_id === item.section_id
              )
            : [];
          let getQuizData: any = quizData.length
            ? quizData.filter(
                (quizItm) => quizItm.section_id === item.section_id
              )
            : [];
          return {
            id: index + 1,
            renderAccordionTitle: () => (
              <Grid container alignItems="center" style={{ gap: '10px' }}>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    onClickAddOrEditSection(
                      CONFIRM_MODAL.edit,
                      item?.section_id
                    );
                  }}
                  style={{ padding: 5 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteSection(item?.section_id);
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
                >{`Section:${index + 1} - ${item.section_name}`}</Typography>
              </Grid>
            ),
            accContentDetail: () => (
              <Grid container direction="column" spacing={2}>
                {/* {courseRef.current[0].section ===
                getLessonData.length ? null : ( */}
                <Grid item xs={12}>
                  <ButtonComp
                    // buttonText={`Add new Lesson ${getLessonData.length} / ${courseRef.current[0].section}`}
                    buttonText="Add new Lesson"
                    buttonFontSize={theme.MetricsSizes.small_x}
                    backgroundColor={theme.Colors.mediumGreen}
                    height={theme.MetricsSizes.large}
                    btnBorderRadius="5px"
                    startIcon={<Add />}
                    onClickButton={() =>
                      onClickAddOrEditLesson(
                        item.section_id,
                        item.lesson_id,
                        CONFIRM_MODAL.create
                      )
                    }
                  />
                </Grid>
                {/* )} */}
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
                            container
                            justifyContent="flex-end"
                            style={{ gap: 10 }}
                          >
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                onClickAddOrEditLesson(
                                  item.section_id,
                                  item.lesson_id,
                                  CONFIRM_MODAL.edit
                                );
                              }}
                              style={{ padding: 5 }}
                            >
                              <EditTwoTone fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                onDeleteLesson(item?.lesson_id);
                              }}
                              style={{ padding: 5 }}
                            >
                              <DeleteTwoTone fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      );
                    })
                  : null}
                 {/*  <Grid item xs={12}>
                  <ButtonComp
                    // buttonText={`Add new Lesson ${getLessonData.length} / ${courseRef.current[0].section}`}
                    buttonText="Add Quiz QA"
                    buttonFontSize={theme.MetricsSizes.small_x}
                    backgroundColor={theme.Colors.lightGreen}
                    height={theme.MetricsSizes.large}
                    btnBorderRadius="5px"
                    startIcon={<Add />}
                    onClickButton={() =>
                      onClickAddOrEditQuiz(
                        item.section_id,
                        item.lesson_id,
                        CONFIRM_MODAL.create
                      )
                    }
                  />
                </Grid>
                {getQuizData.length
                  ? getQuizData.map((item, index) => {
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
                          >{`Ouiz:${index + 1} - ${
                            item.question
                          }`}</Typography>
                          <Typography
                            variant="h5"
                            style={{
                              color: theme.Colors.blackPrimary,
                              fontWeight: 500
                            }}
                          >{`a) ${index + 1} - ${
                            item.option1
                          }`
                          }</Typography>
                          <Grid
                            item
                            xs
                            container
                            justifyContent="flex-end"
                            style={{ gap: 10 }}
                          >
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                onClickAddOrEditLesson(
                                  item.section_id,
                                  item.lesson_id,
                                  CONFIRM_MODAL.edit
                                );
                              }}
                              style={{ padding: 5 }}
                            >
                              <EditTwoTone fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                onDeleteLesson(item?.quiz_id);
                              }}
                              style={{ padding: 5 }}
                            >
                              <DeleteTwoTone fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      );
                    })
                  : null} */}
              </Grid>
            )
          };
        })
      : [];
  }, [sectionData, lessonData, quizData]);

  return (
    <>
      <Grid container direction="column" spacing={2} style={{ marginTop: 10 }}>
        {/* {courseRef.current[0].chapter === sectionData.length ? null : ( */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{
              color: theme.Colors.blackPrimary,
              fontWeight: 500
            }}
          >{`Section Count: ${
            courseRef?.current[0]?.chapter ?? 0
          }`}</Typography>
          <Typography
            variant="h5"
            style={{
              color: theme.Colors.blackPrimary,
              fontWeight: 500,
              marginTop: 10
            }}
          >{`Lesson Count: ${courseRef?.current[0]?.section ?? 0}`}</Typography>
        </Grid>

        <Grid item xs={12}>
          <ButtonComp
            buttonText="Add new section"
            buttonFontSize={theme.MetricsSizes.small_x}
            height={theme.MetricsSizes.large}
            btnBorderRadius="5px"
            startIcon={<Add />}
            onClickButton={() => onClickAddOrEditSection(CONFIRM_MODAL.create)}
          />
        </Grid>
        {/* )} */}
        <Grid item xs={10}>
          <MuiAccordionComp
            accordionOuterContainerClassName={classes.accordionClassName}
            config={getAccordionContents}
          />
        </Grid>
      </Grid>
      {openSectionModal.open ? (
        <AddNewSectionModal
          onClose={handleCloseSectionModal}
          updateData={fetchSectionData}
          {...openSectionModal}
        />
      ) : null}
      {openLessonModal.open ? (
        <AddNewLessonModal
          handleClose={handleCloseLessonModal}
          updateData={fetchLessonData}
          {...openLessonModal}
        />
      ) : null}
{/*       {openQuizModal.open ? (
        <AddNewQuizQA
          handleClose={handleCloseQuizModal}
          updateData={fetchLessonData}
          {...openQuizModal}
        />
      ) : null} */}
      
      {confirmModal.open ? <MuiConfirmModal {...confirmModal} /> : null}
    </>
  );
};

export default React.memo(CreateCourseDetails);
