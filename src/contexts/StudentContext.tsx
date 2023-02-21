import React, { useState } from 'react';

export type StudentDetails = {
  id: number;
  // first_name: string;
  // last_name: string;
  // phone_number: string;
  // social_information_url: string;
  // user_type: number;
  // status_id: number;
  // user_name: string;
  // password: string;
  // created_at: string;
  // updated_at: string;
  // permissions: number[];
};

export type StudentInfo = {
  studentDetails: StudentDetails;
  updateStudentInfo: any;
  loggedInUser: any;
};

export const INITIAL_STATE: StudentInfo = {
  studentDetails: {
    id: 0
    // first_name: '',
    // last_name: '',
    // phone_number: '',
    // social_information_url: '',
    // user_type: 0,
    // status_id: 0,
    // user_name: '',
    // password: '',
    // created_at: '',
    // updated_at: '',
    // permissions: []
  },
  updateStudentInfo: () => undefined,
  loggedInUser: false
};

export const StudentInfoContext = React.createContext({
  ...INITIAL_STATE
});

type Props = {
  children: any;
};

export const StudentInfoProvider = ({ children }: Props) => {
  const [studentDetails, setStudentDetails] = useState<StudentDetails>(
    INITIAL_STATE.studentDetails
  );
  const [loginUserUrl, setLoginUserUrl] = useState<boolean>(
    INITIAL_STATE.loggedInUser
  );
  const updateStudentDetails = (id: number) => {
    console.log(id, 'login test');
    if (id === 2) {
      setLoginUserUrl(true);
    }
  };

  const contextValue = React.useMemo(() => {
    return {
      studentDetails: studentDetails,
      updateStudentInfo: updateStudentDetails,
      loggedInUser: loginUserUrl
    };
  }, [studentDetails, setStudentDetails, loginUserUrl]);

  return (
    <StudentInfoContext.Provider value={contextValue}>
      {children}
    </StudentInfoContext.Provider>
  );
};
