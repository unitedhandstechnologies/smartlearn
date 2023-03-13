import React, { useContext, useEffect, useState } from 'react';
import MuiTable from 'src/components/MuiTable';
import ButtonComp from '../../components/ButtonComp/index';
import { CheckStatus, ListItemCell } from 'src/components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { DeleteOutlineSharp, EditOutlined } from '@material-ui/icons';
import {
  COURSE_STATUS_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  USER_TYPE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { UserInfoContext } from 'src/contexts/UserContext';

type Props = {
  onClickActionButton?: (row: any) => void;
  // onClickCancelOrAccept?: (row: any, statusId: number) => void;
  tableRowData?: any[];
  onClickAcceptCourse?: (row: any, statusId: Number) => void;
  onDeleteCourse?: (row: any) => void;
  onEditCourseDetais?: (row: any) => void;
  updateData?: () => void;
};

const CourseManagementTable = ({
  onClickActionButton,
  // onClickCancelOrAccept,
  tableRowData,
  onDeleteCourse,
  onClickAcceptCourse,
  updateData,
  onEditCourseDetais
}: Props) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [rowItems, setRowItems] = useState([]);
  const { userDetails } = useContext(UserInfoContext);
  const onChangeActive = async (row: any) => {
    const courseStatus =
      row?.course_status === COURSE_STATUS_NAME[1]
        ? COURSE_STATUS_NAME[2]
        : COURSE_STATUS_NAME[1];
    const response: any = await API_SERVICES.courseManagementService.update(
      row?.id,
      {
        data: { course_status: courseStatus },
        successMessage:
          row?.course_status === COURSE_STATUS_NAME[1]
            ? 'Course Inactive successfully!'
            : 'Course Active Successfully'
      }
    );
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      updateData();
    }
  };

  const columns = [
    {
      field: 'course_name',
      headerName: t('course.courseName'),
      flex: 3,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <ListItemCell
          avatarImg={row?.image_url}
          title={row?.course_name}
          titleStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '60%',
          }}
        />
      )
    },
    {
      field: 'category_name',
      headerName: t('course.category'),
      flex: 1.8,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <ListItemCell
          title={row?.category_name}
          titleStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        />
      )
    },
    {
      field: 'id',
      headerName: t('Category.subCategory'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.sub_category_name} />
    },

    // {
    //   field: 'mode',
    //   headerName: t('course.enrolledSection'),
    //   flex: 2,
    //   sortable: true,
    //   disableColumnMenu: true,
    //   renderCell: ({ row }) => (
    //     <ListItemCell
    //       title={row?.total_no_of_students ?? 0}
    //       //subTitle={row?.language_id}
    //     />
    //   )
    // },

    {
      field: 'amount',
      headerName: t('course.price'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return <ListItemCell title={row?.amount} />;
      }
    },
    {
      field: 'course_status',
      headerName: t('course.status'),
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <CheckStatus
          Value={row?.course_status === COURSE_STATUS_NAME[1] ? true : false}
          onClick={() => onChangeActive(row)}
        />
      )
    },

    {
      field: 'action',
      headerName: t('course.action'),
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <ButtonComp
          btnBorderRadius={theme.MetricsSizes.regular_x}
          buttonText={t('button.view')}
          buttonFontSize={theme.MetricsSizes.small_x}
          btnWidth={71}
          height={theme.MetricsSizes.regular_xxx}
          onClickButton={() => onClickActionButton(row)}
        />
      )
    }
  ];

  const renderRowActions = (row: { status_id: Number }) => {
    return [
      row?.status_id === 1 && {
        text: 'Approve',
        onClick: (rowData: any) => onClickAcceptCourse(rowData, 2),
        renderIcon: () => <AddCircleOutlineOutlinedIcon />
      },
      {
        text: t('edit'),
        onClick: (rowData) => onEditCourseDetais(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: 'Delete',
        onClick: (rowData: any) => onDeleteCourse(rowData),
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };
  const renderRowActionsMentor = (row: { status_id: Number }) => {
    return [
      {
        text: t('edit'),
        onClick: (rowData) => onEditCourseDetais(rowData),
        renderIcon: () => <EditOutlined />
      },
      {
        text: 'Delete',
        onClick: (rowData: any) => onDeleteCourse(rowData),
        renderIcon: () => <DeleteOutlineSharp />
      }
    ];
  };

  useEffect(() => {
    if (tableRowData?.length) {
      setRowItems(tableRowData);
    }
  }, [tableRowData]);

  return (
    <MuiTable
      title={t('course.courseDetails')}
      columns={columns}
      rows={rowItems}
      disableSelectionOnClick={true}
      autoHeight={true}
      hideFooterPagination={true}
      getRowActions={
        userDetails.user_type === USER_TYPE_ID.mentors
          ? renderRowActionsMentor
          : renderRowActions
      }
    />
  );
};

export default CourseManagementTable;
