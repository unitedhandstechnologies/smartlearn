import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';
import { DialogComp, TextInputComponent } from 'src/components';
import { useTranslation } from 'react-i18next';
import DualActionButton from 'src/components/DualActionButton';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import { PercentageIcon } from 'src/Assets';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 600,
      padding: theme.spacing(2, 1, 2, 5),
      borderRadius: 18
    },
    contentStyle: {
      padding: theme.spacing(0, 10, 0, 0)
    },
    buttonStyle: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.MetricsSizes.tiny_xxx
    },
    textStyle: {
      color: theme.Colors.primary,
      fontWeight: theme.fontWeight.medium
    },
    buttonContainer: {
      paddingLeft: theme.spacing(2),
      alignSelf: 'flex-end'
    },
    percentage: {
      height: 15,
      width: 15
    }
  };
});

type Props = {
  onClose: () => void;
  updateData?: () => void;
  rowData?: any;
  type?: string;
};

const InstructorCommissionModal = (props: Props) => {
  const { onClose, updateData, rowData } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  const USER_INITIAL_DATA = {
    commission: rowData?.commission || 0
  };

  const edit = useEdit(USER_INITIAL_DATA);

  const handleCreate = async () => {
    try {
      let userData = { ...USER_INITIAL_DATA, ...edit.edits };
      const response: any = await API_SERVICES.instructorService.update(
        rowData?.id,
        {
          data: userData,
          successMessage: 'Mentor Commission updated successfully!'
        }
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        updateData();
        onClose();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const renderDialogContent = () => {
    return (
      <Grid container justifyContent="center">
        <Grid container spacing={1} className={classes.contentStyle}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <TextInputComponent
                inputLabel={'Commission'}
                labelColor={theme.Colors.primary}
                required
                value={edit.getValue('commission')}
                onChange={(e) =>
                  edit.update({
                    commission: Number(e.target.value)
                  })
                }
                iconEnd={<PercentageIcon className={classes.percentage} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const renderAction = () => {
    return (
      <DualActionButton
        onLeftButtonClick={onClose}
        onRightButtonClick={handleCreate}
        buttonText={t('save')}
      />
    );
  };

  return (
    <DialogComp
      dialogTitle={t('Instructor.editInstructorCommission')}
      open={true}
      onClose={onClose}
      dialogClasses={{ paper: classes.dialogPaper }}
      dialogTitleStyle={{
        color: theme.Colors.blackMedium
      }}
      renderDialogContent={renderDialogContent}
      renderAction={renderAction}
    />
  );
};

export default InstructorCommissionModal;
