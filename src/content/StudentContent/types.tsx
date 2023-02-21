export interface CourseSubTitleDetailsProps {
    serialNumber: number;
    watched: number;
    title: string;
    duration: number;
    isPlaying: boolean;
}

export interface CourseTitleDetailsProps {
    serialNumber: number;
    title: string;
    completed: boolean;
    list: CourseSubTitleDetailsProps[];
  };

export interface CourseDetailsProps {
    title: string;
    lessons: number;
    remainDuration: number;
    list: CourseTitleDetailsProps[];
}