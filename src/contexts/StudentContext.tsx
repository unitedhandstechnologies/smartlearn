import React, { useEffect, useState } from 'react';

export type StudentDetails = {
  id: number;
  first_name: string;
  last_name: string;
  email_id: string;
  dob: string;
  gender: string;
  image_url: string;
  language_id: number;
  phone_number: string;
  qualification: string;
  role: string;
  social_information_url: string;
  user_type: number;
  status_id: number;
  user_name: string;
  password: string;
  created_at: string;
  updated_at: string;
  permissions: number[];
};

export type StudentInfo = {
  studentDetails: StudentDetails;
  updateStudentInfo: React.Dispatch<React.SetStateAction<StudentDetails>>;
};

export const INITIAL_STATE: StudentInfo = {
  studentDetails: {
    id: 0,
    first_name: '',
    last_name: '',
    email_id: '',
    dob: '',
    gender: '',
    image_url: '',
    language_id: 0,
    phone_number: '',
    qualification: '',
    role: '',
    social_information_url: '',
    user_type: 0,
    status_id: 0,
    user_name: '',
    password: '',
    created_at: '',
    updated_at: '',
    permissions: []
  },
  updateStudentInfo: () => undefined
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

  const contextValue = React.useMemo(() => {
    return {
      studentDetails: studentDetails,
      updateStudentInfo: setStudentDetails
    };
  }, [studentDetails, setStudentDetails]);

  return (
    <StudentInfoContext.Provider value={contextValue}>
      {children}
    </StudentInfoContext.Provider>
  );
};
