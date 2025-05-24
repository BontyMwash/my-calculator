// Utility to initialize database with forms, streams, and subjects

const FORMS_TABLE_ID = 8979;
const STREAMS_TABLE_ID = 8980;
const SUBJECTS_TABLE_ID = 8981;
const USER_PROFILES_TABLE_ID = 8989;

export const initializeForms = async () => {
  const forms = [
  { name: 'Form 2', description: 'Second year of secondary education' },
  { name: 'Form 3', description: 'Third year of secondary education' },
  { name: 'Form 4', description: 'Fourth year of secondary education' }];


  for (const form of forms) {
    try {
      const { error } = await window.ezsite.apis.tableCreate(FORMS_TABLE_ID, form);
      if (error) {
        console.log('Form already exists or error:', error);
      }
    } catch (error) {
      console.log('Error creating form:', error);
    }
  }
};

export const initializeStreams = async () => {
  // Get existing forms first
  const { data: formsData, error: formsError } = await window.ezsite.apis.tablePage(FORMS_TABLE_ID, {
    PageNo: 1,
    PageSize: 10,
    OrderByField: 'ID',
    IsAsc: true
  });

  if (formsError || !formsData?.List) {
    console.error('Failed to fetch forms:', formsError);
    return;
  }

  const forms = formsData.List;

  // Define streams for each form
  const streamsByForm = {
    'Form 2': ['Edinburgh', 'Yale', 'Stanford', 'Harvard', 'Princeton', 'Zurich', 'Oxford', 'Cambridge'],
    'Form 3': ['Stanford', 'Edinburgh', 'Yale', 'Oxford', 'Cambridge', 'Harvard'],
    'Form 4': ['Stanford', 'Harvard', 'Yale', 'Oxford', 'Cambridge', 'Edinburgh']
  };

  for (const form of forms) {
    const streamNames = streamsByForm[form.name as keyof typeof streamsByForm];
    if (streamNames) {
      for (const streamName of streamNames) {
        try {
          const { error } = await window.ezsite.apis.tableCreate(STREAMS_TABLE_ID, {
            name: streamName,
            form_id: form.ID
          });
          if (error) {
            console.log('Stream already exists or error:', error);
          }
        } catch (error) {
          console.log('Error creating stream:', error);
        }
      }
    }
  }
};

export const initializeSubjects = async () => {
  const subjects = [
  // Core subjects
  { name: 'Mathematics', code: 'MATH', is_elective: false, elective_group: '' },
  { name: 'English', code: 'ENG', is_elective: false, elective_group: '' },
  { name: 'Kiswahili', code: 'KIS', is_elective: false, elective_group: '' },
  { name: 'History', code: 'HIST', is_elective: true, elective_group: 'Social Studies' },
  { name: 'Geography', code: 'GEOG', is_elective: true, elective_group: 'Social Studies' },
  { name: 'CRE', code: 'CRE', is_elective: false, elective_group: '' },
  { name: 'Biology', code: 'BIO', is_elective: true, elective_group: 'Sciences' },
  { name: 'Chemistry', code: 'CHEM', is_elective: false, elective_group: '' },
  { name: 'French', code: 'FRE', is_elective: true, elective_group: 'Languages' },
  { name: 'Physics', code: 'PHY', is_elective: true, elective_group: 'Sciences' },
  { name: 'Agriculture', code: 'AGR', is_elective: true, elective_group: 'Practical' },
  { name: 'Home Science', code: 'HSC', is_elective: true, elective_group: 'Practical' },
  { name: 'Business Studies', code: 'BST', is_elective: true, elective_group: 'Practical' },
  { name: 'Computer Studies', code: 'COMP', is_elective: true, elective_group: 'Practical' }];


  for (const subject of subjects) {
    try {
      const { error } = await window.ezsite.apis.tableCreate(SUBJECTS_TABLE_ID, subject);
      if (error) {
        console.log('Subject already exists or error:', error);
      }
    } catch (error) {
      console.log('Error creating subject:', error);
    }
  }
};

export const initializeDemoUsers = async () => {
  const demoUsers = [
  {
    email: 'admin@school.com',
    password: 'admin123',
    name: 'System Administrator',
    role: 'admin',
    first_name: 'System',
    last_name: 'Administrator'
  },
  {
    email: 'teacher@school.com',
    password: 'teacher123',
    name: 'John Teacher',
    role: 'teacher',
    first_name: 'John',
    last_name: 'Teacher'
  }];


  for (const user of demoUsers) {
    try {
      // Register the user
      const { error: registerError } = await window.ezsite.apis.register({
        email: user.email,
        password: user.password
      });

      if (registerError && !registerError.includes('already exists')) {
        console.log('User registration error:', registerError);
        continue;
      }

      // Login to get user info
      const { error: loginError } = await window.ezsite.apis.login({
        email: user.email,
        password: user.password
      });

      if (loginError) {
        console.log('User login error:', loginError);
        continue;
      }

      // Get user info
      const { data: userInfo, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError || !userInfo) {
        console.log('Failed to get user info:', userError);
        continue;
      }

      // Create user profile
      const { error: profileError } = await window.ezsite.apis.tableCreate(USER_PROFILES_TABLE_ID, {
        user_id: userInfo.ID,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: '',
        is_active: true
      });

      if (profileError && !profileError.includes('already exists')) {
        console.log('Profile creation error:', profileError);
      }

      // Logout after creating profile
      await window.ezsite.apis.logout();

    } catch (error) {
      console.log('Error creating demo user:', error);
    }
  }
};

export const initializeAllData = async () => {
  console.log('Initializing school data...');

  try {
    await initializeForms();
    console.log('Forms initialized');

    // Wait a bit for forms to be created
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await initializeStreams();
    console.log('Streams initialized');

    await initializeSubjects();
    console.log('Subjects initialized');

    await initializeDemoUsers();
    console.log('Demo users initialized');

    console.log('School data initialization complete');
  } catch (error) {
    console.error('Error initializing school data:', error);
  }
};