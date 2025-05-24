import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STUDENTS_TABLE_ID = 8982;
const FORMS_TABLE_ID = 8979;
const STREAMS_TABLE_ID = 8980;

export interface Student {
  ID: number;
  name: string;
  email: string;
  admission_number: string;
  form_id: number;
  stream_id: number;
  contact_number: string;
  address: string;
  enrollment_date: string;
  formName?: string;
  streamName?: string;
}

export interface Form {
  ID: number;
  name: string;
  description: string;
}

export interface Stream {
  ID: number;
  name: string;
  form_id: number;
}

interface StudentContextType {
  students: Student[];
  forms: Form[];
  streams: Stream[];
  loading: boolean;
  addStudent: (student: Omit<Student, 'ID'>) => Promise<void>;
  updateStudent: (id: number, student: Omit<Student, 'ID'>) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  getStudent: (id: number) => Student | undefined;
  getStreamsByForm: (formId: number) => Stream[];
  loadStudents: () => Promise<void>;
  loadForms: () => Promise<void>;
  loadStreams: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: {children: ReactNode;}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  const loadForms = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(FORMS_TABLE_ID, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'ID',
        IsAsc: true
      });

      if (!error && data?.List) {
        setForms(data.List);
      }
    } catch (error) {
      console.error('Error loading forms:', error);
    }
  };

  const loadStreams = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(STREAMS_TABLE_ID, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'form_id',
        IsAsc: true
      });

      if (!error && data?.List) {
        setStreams(data.List);
      }
    } catch (error) {
      console.error('Error loading streams:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(STUDENTS_TABLE_ID, {
        PageNo: 1,
        PageSize: 1000,
        OrderByField: 'ID',
        IsAsc: true
      });

      if (!error && data?.List) {
        // Enrich students with form and stream names
        const enrichedStudents = data.List.map((student: Student) => {
          const form = forms.find((f) => f.ID === student.form_id);
          const stream = streams.find((s) => s.ID === student.stream_id);
          return {
            ...student,
            formName: form?.name || '',
            streamName: stream?.name || ''
          };
        });
        setStudents(enrichedStudents);
      }
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await loadForms();
      await loadStreams();
      await loadStudents();
      setLoading(false);
    };

    initializeData();
  }, []);

  // Re-load students when forms or streams change
  useEffect(() => {
    if (forms.length > 0 && streams.length > 0) {
      loadStudents();
    }
  }, [forms, streams]);

  const addStudent = async (student: Omit<Student, 'ID'>) => {
    try {
      const { error } = await window.ezsite.apis.tableCreate(STUDENTS_TABLE_ID, student);
      if (error) throw new Error(error);
      await loadStudents();
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };

  const updateStudent = async (id: number, updatedStudent: Omit<Student, 'ID'>) => {
    try {
      const { error } = await window.ezsite.apis.tableUpdate(STUDENTS_TABLE_ID, {
        ID: id,
        ...updatedStudent
      });
      if (error) throw new Error(error);
      await loadStudents();
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(STUDENTS_TABLE_ID, { ID: id });
      if (error) throw new Error(error);
      await loadStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  };

  const getStudent = (id: number) => {
    return students.find((student) => student.ID === id);
  };

  const getStreamsByForm = (formId: number) => {
    return streams.filter((stream) => stream.form_id === formId);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        forms,
        streams,
        loading,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudent,
        getStreamsByForm,
        loadStudents,
        loadForms,
        loadStreams
      }} data-id="7t0z0ok8f" data-path="src/contexts/StudentContext.tsx">
      {children}
    </StudentContext.Provider>);


};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};