import React, { useContext } from 'react';
import { StudentInfoContext } from 'src/contexts/StudentContext';

const useStudentInfo = () => {
  const userData = useContext(StudentInfoContext);
  return userData;
};

export default useStudentInfo;
