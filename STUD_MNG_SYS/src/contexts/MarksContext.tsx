import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const MARKS_TABLE_ID = 8985;
const SUBJECTS_TABLE_ID = 8981;
const TEACHERS_TABLE_ID = 8983;

export interface Mark {
  ID: number;
  student_id: number;
  subject_id: number;
  teacher_id: number;
  score: number;
  max_score: number;
  term: string;
  exam_type: string;
  remarks: string;
  date_recorded: string;
  subjectName?: string;
  studentName?: string;
  teacherName?: string;
}

export interface Subject {
  ID: number;
  name: string;
  code: string;
  is_elective: boolean;
  elective_group: string;
}

export interface Teacher {
  ID: number;
  user_id: number;
  employee_number: string;
  department: string;
  specialization: string;
  phone: string;
  hire_date: string;
}

interface MarksContextType {
  marks: Mark[];
  subjects: Subject[];
  teachers: Teacher[];
  loading: boolean;
  addMark: (mark: Omit<Mark, 'ID'>) => Promise<void>;
  updateMark: (id: number, mark: Omit<Mark, 'ID'>) => Promise<void>;
  deleteMark: (id: number) => Promise<void>;
  getStudentMarks: (studentId: number) => Mark[];
  getSubjectMarks: (subjectId: number) => Mark[];
  getStudentSubjectMarks: (studentId: number, subjectId: number) => Mark[];
  getAverageScore: (studentId: number, subjectId?: number) => number;
  getHighestScore: (studentId: number, subjectId?: number) => number;
  getLowestScore: (studentId: number, subjectId?: number) => number;
  getClassAverage: (subjectId?: number) => number;
  getElectiveSubjects: () => Subject[];
  getElectiveGroups: () => string[];
  getSubjectsByGroup: (group: string) => Subject[];
  loadMarks: () => Promise<void>;
  loadSubjects: () => Promise<void>;
}

const MarksContext = createContext<MarksContextType | undefined>(undefined);

export const MarksProvider = ({ children }: {children: ReactNode;}) => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubjects = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(SUBJECTS_TABLE_ID, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'name',
        IsAsc: true
      });

      if (!error && data?.List) {
        setSubjects(data.List);
      }
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const loadTeachers = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(TEACHERS_TABLE_ID, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'ID',
        IsAsc: true
      });

      if (!error && data?.List) {
        setTeachers(data.List);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const loadMarks = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(MARKS_TABLE_ID, {
        PageNo: 1,
        PageSize: 10000,
        OrderByField: 'date_recorded',
        IsAsc: false
      });

      if (!error && data?.List) {
        // Enrich marks with subject and student names
        const enrichedMarks = data.List.map((mark: Mark) => {
          const subject = subjects.find((s) => s.ID === mark.subject_id);
          return {
            ...mark,
            subjectName: subject?.name || ''
          };
        });
        setMarks(enrichedMarks);
      }
    } catch (error) {
      console.error('Error loading marks:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await loadSubjects();
      await loadTeachers();
      await loadMarks();
      setLoading(false);
    };

    initializeData();
  }, []);

  // Re-load marks when subjects change
  useEffect(() => {
    if (subjects.length > 0) {
      loadMarks();
    }
  }, [subjects]);

  const addMark = async (mark: Omit<Mark, 'ID'>) => {
    try {
      const { error } = await window.ezsite.apis.tableCreate(MARKS_TABLE_ID, {
        ...mark,
        date_recorded: new Date().toISOString()
      });
      if (error) throw new Error(error);
      await loadMarks();
    } catch (error) {
      console.error('Error adding mark:', error);
      throw error;
    }
  };

  const updateMark = async (id: number, updatedMark: Omit<Mark, 'ID'>) => {
    try {
      const { error } = await window.ezsite.apis.tableUpdate(MARKS_TABLE_ID, {
        ID: id,
        ...updatedMark
      });
      if (error) throw new Error(error);
      await loadMarks();
    } catch (error) {
      console.error('Error updating mark:', error);
      throw error;
    }
  };

  const deleteMark = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(MARKS_TABLE_ID, { ID: id });
      if (error) throw new Error(error);
      await loadMarks();
    } catch (error) {
      console.error('Error deleting mark:', error);
      throw error;
    }
  };

  const getStudentMarks = (studentId: number) => {
    return marks.filter((mark) => mark.student_id === studentId);
  };

  const getSubjectMarks = (subjectId: number) => {
    return marks.filter((mark) => mark.subject_id === subjectId);
  };

  const getStudentSubjectMarks = (studentId: number, subjectId: number) => {
    return marks.filter(
      (mark) => mark.student_id === studentId && mark.subject_id === subjectId
    );
  };

  const getAverageScore = (studentId: number, subjectId?: number) => {
    const filteredMarks = subjectId ?
    getStudentSubjectMarks(studentId, subjectId) :
    getStudentMarks(studentId);

    if (filteredMarks.length === 0) return 0;

    const sum = filteredMarks.reduce((acc, mark) => acc + mark.score / mark.max_score * 100, 0);
    return sum / filteredMarks.length;
  };

  const getHighestScore = (studentId: number, subjectId?: number) => {
    const filteredMarks = subjectId ?
    getStudentSubjectMarks(studentId, subjectId) :
    getStudentMarks(studentId);

    if (filteredMarks.length === 0) return 0;

    return Math.max(...filteredMarks.map((mark) => mark.score / mark.max_score * 100));
  };

  const getLowestScore = (studentId: number, subjectId?: number) => {
    const filteredMarks = subjectId ?
    getStudentSubjectMarks(studentId, subjectId) :
    getStudentMarks(studentId);

    if (filteredMarks.length === 0) return 0;

    return Math.min(...filteredMarks.map((mark) => mark.score / mark.max_score * 100));
  };

  const getClassAverage = (subjectId?: number) => {
    const filteredMarks = subjectId ?
    getSubjectMarks(subjectId) :
    marks;

    if (filteredMarks.length === 0) return 0;

    const sum = filteredMarks.reduce((acc, mark) => acc + mark.score / mark.max_score * 100, 0);
    return sum / filteredMarks.length;
  };

  const getElectiveSubjects = () => {
    return subjects.filter((subject) => subject.is_elective);
  };

  const getElectiveGroups = () => {
    const groups = new Set(subjects.filter((s) => s.is_elective).map((s) => s.elective_group));
    return Array.from(groups).filter((group) => group !== '');
  };

  const getSubjectsByGroup = (group: string) => {
    return subjects.filter((subject) => subject.elective_group === group);
  };

  return (
    <MarksContext.Provider
      value={{
        marks,
        subjects,
        teachers,
        loading,
        addMark,
        updateMark,
        deleteMark,
        getStudentMarks,
        getSubjectMarks,
        getStudentSubjectMarks,
        getAverageScore,
        getHighestScore,
        getLowestScore,
        getClassAverage,
        getElectiveSubjects,
        getElectiveGroups,
        getSubjectsByGroup,
        loadMarks,
        loadSubjects
      }} data-id="gr7au0dar" data-path="src/contexts/MarksContext.tsx">
      {children}
    </MarksContext.Provider>);


};

export const useMarks = () => {
  const context = useContext(MarksContext);
  if (context === undefined) {
    throw new Error('useMarks must be used within a MarksProvider');
  }
  return context;
};