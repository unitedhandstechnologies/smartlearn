import React, { useEffect, useState } from 'react';
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
  HTTP_STATUSES
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';

type Props = {
  onClickActionButton?: (row: any) => void;
  // onClickCancelOrAccept?: (row: any, statusId: number) => void;
  tableRowData?: any[];
  onClickAcceptCourse?: (row: any, course_status: string) => void;
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
          row?.course_status === COURSE_STATUS_NAME[2]
            ? 'Course Active successfully!'
            : 'Course Inactive Successfully'
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
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <ListItemCell
          avatarImg={row?.image_url}
          title={row?.course_name}
          titleStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        />
      )
    },
    {
      field: 'category_name',
      headerName: t('course.category'),
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      renderCell: ({ row }) => <ListItemCell title={row?.category_name} />
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

  const renderRowActions = () => {
    return [
      {
        text: 'Approve',
        onClick: (rowData: any) =>
          onClickAcceptCourse(rowData, COURSE_STATUS_NAME[1]),
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
      getRowActions={renderRowActions}
    />
  );
};

export default CourseManagementTable;
