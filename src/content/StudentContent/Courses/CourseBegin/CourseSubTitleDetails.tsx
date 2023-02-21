import { memo } from 'react';
import { Box, Typography } from '@mui/material';

import CircularProgressWithLabel from 'src/content/StudentContent/Courses/CourseBegin/CircularProgressWithLable';
import { CourseSubTitleDetailsProps } from 'src/content/StudentContent/types';

const CourseSubTitleDetails = ({
  watched,
  serialNumber,
  title,
  duration
}: CourseSubTitleDetailsProps) => {
  return (
    <Box display={'flex'}>
      <CircularProgressWithLabel title={serialNumber} value={watched} />
      <Box>
        <Typography>{title}</Typography>
        <Typography>{duration}</Typography>
      </Box>
    </Box>
  );
};

export default memo(CourseSubTitleDetails);
