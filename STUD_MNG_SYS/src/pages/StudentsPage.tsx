import { useState } from 'react';
import { useStudents, Student, Form, Stream } from '@/contexts/StudentContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle } from
'@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { MoreHorizontal, Plus, Search, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentForm = ({
  student,
  forms,
  streams,
  onSubmit,
  onCancel






}: {student?: Student;forms: Form[];streams: Stream[];onSubmit: (data: Omit<Student, 'ID'>) => void;onCancel: () => void;}) => {
  const [name, setName] = useState(student?.name || '');
  const [email, setEmail] = useState(student?.email || '');
  const [admissionNumber, setAdmissionNumber] = useState(student?.admission_number || '');
  const [formId, setFormId] = useState<number>(student?.form_id || 0);
  const [streamId, setStreamId] = useState<number>(student?.stream_id || 0);
  const [contactNumber, setContactNumber] = useState(student?.contact_number || '');
  const [address, setAddress] = useState(student?.address || '');
  const [enrollmentDate, setEnrollmentDate] = useState(
    student?.enrollment_date ? student.enrollment_date.split('T')[0] : new Date().toISOString().split('T')[0]
  );

  const availableStreams = streams.filter((stream) => stream.form_id === formId);

  const handleFormChange = (value: string) => {
    const newFormId = parseInt(value);
    setFormId(newFormId);
    setStreamId(0); // Reset stream when form changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId || !streamId) {
      alert('Please select both form and stream');
      return;
    }

    onSubmit({
      name,
      email,
      admission_number: admissionNumber,
      form_id: formId,
      stream_id: streamId,
      contact_number: contactNumber,
      address,
      enrollment_date: new Date(enrollmentDate).toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-id="gco85dq8i" data-path="src/pages/StudentsPage.tsx">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="j8rx7dlpz" data-path="src/pages/StudentsPage.tsx">
        <div className="space-y-2" data-id="gqx3m338v" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="name" data-id="az3pgzx1b" data-path="src/pages/StudentsPage.tsx">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required data-id="rwrzpm0cy" data-path="src/pages/StudentsPage.tsx" />

        </div>
        <div className="space-y-2" data-id="5i1wmx5dh" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="email" data-id="68antj5ux" data-path="src/pages/StudentsPage.tsx">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@school.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required data-id="ioe4603h2" data-path="src/pages/StudentsPage.tsx" />

        </div>
        <div className="space-y-2" data-id="1s6mjq54x" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="admission" data-id="e50jfd4hm" data-path="src/pages/StudentsPage.tsx">Admission Number</Label>
          <Input
            id="admission"
            placeholder="ADM001"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            required data-id="96gr2zfs3" data-path="src/pages/StudentsPage.tsx" />

        </div>
        <div className="space-y-2" data-id="mgpkgkna3" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="form" data-id="anhoocxkb" data-path="src/pages/StudentsPage.tsx">Form</Label>
          <Select value={formId.toString()} onValueChange={handleFormChange} data-id="p9ga1x0a5" data-path="src/pages/StudentsPage.tsx">
            <SelectTrigger data-id="wxomd1d56" data-path="src/pages/StudentsPage.tsx">
              <SelectValue placeholder="Select form" data-id="4cwl0ay1x" data-path="src/pages/StudentsPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="zudnlb9bj" data-path="src/pages/StudentsPage.tsx">
              {forms.map((form) =>
              <SelectItem key={form.ID} value={form.ID.toString()} data-id="j9klp2l6c" data-path="src/pages/StudentsPage.tsx">
                  {form.name}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2" data-id="zy8rxte0e" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="stream" data-id="tmh98bs3h" data-path="src/pages/StudentsPage.tsx">Stream</Label>
          <Select value={streamId.toString()} onValueChange={(value) => setStreamId(parseInt(value))} data-id="gaftxeouz" data-path="src/pages/StudentsPage.tsx">
            <SelectTrigger data-id="asub9cbgs" data-path="src/pages/StudentsPage.tsx">
              <SelectValue placeholder="Select stream" data-id="bqm086yq8" data-path="src/pages/StudentsPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="eo1wkai1y" data-path="src/pages/StudentsPage.tsx">
              {availableStreams.map((stream) =>
              <SelectItem key={stream.ID} value={stream.ID.toString()} data-id="q770zvb97" data-path="src/pages/StudentsPage.tsx">
                  {stream.name}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2" data-id="fbbufxfef" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="enrollmentDate" data-id="2vvqsr2e8" data-path="src/pages/StudentsPage.tsx">Enrollment Date</Label>
          <Input
            id="enrollmentDate"
            type="date"
            value={enrollmentDate}
            onChange={(e) => setEnrollmentDate(e.target.value)}
            required data-id="hvcsteqz5" data-path="src/pages/StudentsPage.tsx" />

        </div>
        <div className="space-y-2" data-id="k9s1j9q94" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="contactNumber" data-id="tvsydox7y" data-path="src/pages/StudentsPage.tsx">Contact Number</Label>
          <Input
            id="contactNumber"
            placeholder="+254 712 345 678"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required data-id="4fj1gj1ge" data-path="src/pages/StudentsPage.tsx" />

        </div>
        <div className="space-y-2" data-id="k6uspvo7k" data-path="src/pages/StudentsPage.tsx">
          <Label htmlFor="address" data-id="mm2izk2nq" data-path="src/pages/StudentsPage.tsx">Address</Label>
          <Input
            id="address"
            placeholder="123 Main St, Nairobi"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required data-id="kmbalxxbg" data-path="src/pages/StudentsPage.tsx" />

        </div>
      </div>

      <DialogFooter data-id="w1j6ik30d" data-path="src/pages/StudentsPage.tsx">
        <Button type="button" variant="outline" onClick={onCancel} data-id="m2us8w6lf" data-path="src/pages/StudentsPage.tsx">
          Cancel
        </Button>
        <Button type="submit" data-id="jwxwriqvv" data-path="src/pages/StudentsPage.tsx">Save Student</Button>
      </DialogFooter>
    </form>);

};

const StudentsPage = () => {
  const { isAdmin } = useAuth();
  const {
    students,
    forms,
    streams,
    loading,
    addStudent,
    updateStudent,
    deleteStudent
  } = useStudents();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.admission_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.formName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.streamName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = async (studentData: Omit<Student, 'ID'>) => {
    setIsSubmitting(true);
    try {
      await addStudent(studentData);
      setIsAddDialogOpen(false);
      toast({
        title: 'Student Added',
        description: `${studentData.name} has been enrolled successfully.`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add student. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditStudent = async (studentData: Omit<Student, 'ID'>) => {
    if (!currentStudent) return;

    setIsSubmitting(true);
    try {
      await updateStudent(currentStudent.ID, studentData);
      setIsEditDialogOpen(false);
      setCurrentStudent(undefined);
      toast({
        title: 'Student Updated',
        description: `${studentData.name} has been updated successfully.`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update student. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!currentStudent) return;

    setIsSubmitting(true);
    try {
      await deleteStudent(currentStudent.ID);
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Student Deleted',
        description: `${currentStudent.name} has been removed from the system.`,
        variant: 'destructive'
      });
      setCurrentStudent(undefined);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete student. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (student: Student) => {
    setCurrentStudent(student);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (student: Student) => {
    setCurrentStudent(student);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" data-id="1tfqh1mld" data-path="src/pages/StudentsPage.tsx">
        <div className="text-center space-y-4" data-id="p7q4ori42" data-path="src/pages/StudentsPage.tsx">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" data-id="hjr9lz3sk" data-path="src/pages/StudentsPage.tsx" />
          <p className="text-gray-600" data-id="uegy1cilt" data-path="src/pages/StudentsPage.tsx">Loading students...</p>
        </div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="e47clul7s" data-path="src/pages/StudentsPage.tsx">
      <div className="flex justify-between items-center" data-id="igj0epve0" data-path="src/pages/StudentsPage.tsx">
        <div data-id="a65w62zg9" data-path="src/pages/StudentsPage.tsx">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" data-id="un1bcrm6s" data-path="src/pages/StudentsPage.tsx">
            Student Management
          </h2>
          <p className="text-muted-foreground mt-1" data-id="pbw664l7w" data-path="src/pages/StudentsPage.tsx">
            Manage student enrollments and information
          </p>
        </div>
        {isAdmin &&
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700" data-id="1bjuzi80g" data-path="src/pages/StudentsPage.tsx">

            <Plus className="mr-2 h-4 w-4" data-id="chqy6tsnm" data-path="src/pages/StudentsPage.tsx" />
            Enroll Student
          </Button>
        }
      </div>

      <div className="grid gap-4 md:grid-cols-3" data-id="nl9idwepz" data-path="src/pages/StudentsPage.tsx">
        <Card data-id="g97i4irp7" data-path="src/pages/StudentsPage.tsx">
          <CardHeader className="pb-2" data-id="equmpgc21" data-path="src/pages/StudentsPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="cfjo1kjnx" data-path="src/pages/StudentsPage.tsx">Total Students</CardTitle>
          </CardHeader>
          <CardContent data-id="oo23mhyde" data-path="src/pages/StudentsPage.tsx">
            <div className="text-2xl font-bold" data-id="di4f3ia8o" data-path="src/pages/StudentsPage.tsx">{students.length}</div>
            <p className="text-xs text-muted-foreground" data-id="h9nf85agu" data-path="src/pages/StudentsPage.tsx">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card data-id="rax2q9qbs" data-path="src/pages/StudentsPage.tsx">
          <CardHeader className="pb-2" data-id="m3nugzidk" data-path="src/pages/StudentsPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="gpkvdn2lg" data-path="src/pages/StudentsPage.tsx">Forms</CardTitle>
          </CardHeader>
          <CardContent data-id="6q64c8op7" data-path="src/pages/StudentsPage.tsx">
            <div className="text-2xl font-bold" data-id="m94mdyjnr" data-path="src/pages/StudentsPage.tsx">{forms.length}</div>
            <p className="text-xs text-muted-foreground" data-id="71ah58ta4" data-path="src/pages/StudentsPage.tsx">Academic levels</p>
          </CardContent>
        </Card>
        <Card data-id="wko66pavh" data-path="src/pages/StudentsPage.tsx">
          <CardHeader className="pb-2" data-id="l8tx86yvc" data-path="src/pages/StudentsPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="r5cs5zsyw" data-path="src/pages/StudentsPage.tsx">Streams</CardTitle>
          </CardHeader>
          <CardContent data-id="xpiokvwn7" data-path="src/pages/StudentsPage.tsx">
            <div className="text-2xl font-bold" data-id="phtc48ufg" data-path="src/pages/StudentsPage.tsx">{streams.length}</div>
            <p className="text-xs text-muted-foreground" data-id="eixe0xwzr" data-path="src/pages/StudentsPage.tsx">Available classes</p>
          </CardContent>
        </Card>
      </div>

      <Card data-id="b1mwcwaeh" data-path="src/pages/StudentsPage.tsx">
        <CardHeader data-id="7f1d5rbox" data-path="src/pages/StudentsPage.tsx">
          <CardTitle data-id="cpgrbd3le" data-path="src/pages/StudentsPage.tsx">Student Directory</CardTitle>
          <div className="relative mt-2" data-id="l57nvpijw" data-path="src/pages/StudentsPage.tsx">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" data-id="8dxr56ycb" data-path="src/pages/StudentsPage.tsx" />
            <Input
              placeholder="Search by name, email, admission number, form, or stream..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} data-id="lsozgaewd" data-path="src/pages/StudentsPage.tsx" />

          </div>
        </CardHeader>
        <CardContent data-id="nztdgzvqv" data-path="src/pages/StudentsPage.tsx">
          <div className="rounded-md border" data-id="hf6hfash1" data-path="src/pages/StudentsPage.tsx">
            <Table data-id="72fphsfr9" data-path="src/pages/StudentsPage.tsx">
              <TableHeader data-id="bpxl67las" data-path="src/pages/StudentsPage.tsx">
                <TableRow data-id="xy4a49z6k" data-path="src/pages/StudentsPage.tsx">
                  <TableHead data-id="a0b5njumn" data-path="src/pages/StudentsPage.tsx">Name</TableHead>
                  <TableHead data-id="j4gkdpa2r" data-path="src/pages/StudentsPage.tsx">Admission No.</TableHead>
                  <TableHead data-id="uho03xt0j" data-path="src/pages/StudentsPage.tsx">Form</TableHead>
                  <TableHead data-id="jyzlbv4yk" data-path="src/pages/StudentsPage.tsx">Stream</TableHead>
                  <TableHead data-id="ae96om6s8" data-path="src/pages/StudentsPage.tsx">Email</TableHead>
                  <TableHead data-id="4n30m0k4n" data-path="src/pages/StudentsPage.tsx">Contact</TableHead>
                  <TableHead className="w-[80px]" data-id="yg8zd54wh" data-path="src/pages/StudentsPage.tsx">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-id="b2qh1o6d0" data-path="src/pages/StudentsPage.tsx">
                {filteredStudents.length > 0 ?
                filteredStudents.map((student) =>
                <TableRow key={student.ID} data-id="9fwluegqa" data-path="src/pages/StudentsPage.tsx">
                      <TableCell className="font-medium" data-id="opndcomce" data-path="src/pages/StudentsPage.tsx">{student.name}</TableCell>
                      <TableCell data-id="udst2vjur" data-path="src/pages/StudentsPage.tsx">{student.admission_number}</TableCell>
                      <TableCell data-id="qc73rm734" data-path="src/pages/StudentsPage.tsx">{student.formName}</TableCell>
                      <TableCell data-id="r3tn46zie" data-path="src/pages/StudentsPage.tsx">{student.streamName}</TableCell>
                      <TableCell data-id="milpnihg5" data-path="src/pages/StudentsPage.tsx">{student.email}</TableCell>
                      <TableCell data-id="wg1b995mo" data-path="src/pages/StudentsPage.tsx">{student.contact_number}</TableCell>
                      <TableCell data-id="g9o44qq78" data-path="src/pages/StudentsPage.tsx">
                        <DropdownMenu data-id="869vhhrxq" data-path="src/pages/StudentsPage.tsx">
                          <DropdownMenuTrigger asChild data-id="7y46pnlf9" data-path="src/pages/StudentsPage.tsx">
                            <Button variant="ghost" className="h-8 w-8 p-0" data-id="eds64wjit" data-path="src/pages/StudentsPage.tsx">
                              <span className="sr-only" data-id="uxw43ybj0" data-path="src/pages/StudentsPage.tsx">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" data-id="gcpkp1mb5" data-path="src/pages/StudentsPage.tsx" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" data-id="ksxbdebxj" data-path="src/pages/StudentsPage.tsx">
                            <DropdownMenuLabel data-id="tirhppo0l" data-path="src/pages/StudentsPage.tsx">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator data-id="yfd35lt2h" data-path="src/pages/StudentsPage.tsx" />
                            {isAdmin &&
                        <>
                                <DropdownMenuItem onClick={() => openEditDialog(student)} data-id="i6ck0b98v" data-path="src/pages/StudentsPage.tsx">
                                  Edit Student
                                </DropdownMenuItem>
                                <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => openDeleteDialog(student)} data-id="990o820ex" data-path="src/pages/StudentsPage.tsx">

                                  Delete Student
                                </DropdownMenuItem>
                              </>
                        }
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                ) :

                <TableRow data-id="604sie3za" data-path="src/pages/StudentsPage.tsx">
                    <TableCell colSpan={7} className="h-24 text-center" data-id="eui03gpfa" data-path="src/pages/StudentsPage.tsx">
                      {searchQuery ? 'No students found matching your search.' : 'No students enrolled yet.'}
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="v494fha5b" data-path="src/pages/StudentsPage.tsx">
        <DialogContent className="sm:max-w-[600px]" data-id="epbhoy6lh" data-path="src/pages/StudentsPage.tsx">
          <DialogHeader data-id="0rnbjuw5c" data-path="src/pages/StudentsPage.tsx">
            <DialogTitle data-id="g1m451m46" data-path="src/pages/StudentsPage.tsx">Enroll New Student</DialogTitle>
            <DialogDescription data-id="r1qmhhrdq" data-path="src/pages/StudentsPage.tsx">
              Add a new student to the school management system.
            </DialogDescription>
          </DialogHeader>
          <StudentForm
            forms={forms}
            streams={streams}
            onSubmit={handleAddStudent}
            onCancel={() => setIsAddDialogOpen(false)} data-id="vtphdjoeo" data-path="src/pages/StudentsPage.tsx" />

        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} data-id="wvh5vph8e" data-path="src/pages/StudentsPage.tsx">
        <DialogContent className="sm:max-w-[600px]" data-id="pcorg9bmp" data-path="src/pages/StudentsPage.tsx">
          <DialogHeader data-id="2vmkqd9yh" data-path="src/pages/StudentsPage.tsx">
            <DialogTitle data-id="mo6afctla" data-path="src/pages/StudentsPage.tsx">Edit Student Information</DialogTitle>
            <DialogDescription data-id="uvw2rp0yk" data-path="src/pages/StudentsPage.tsx">
              Update student details in the system.
            </DialogDescription>
          </DialogHeader>
          {currentStudent &&
          <StudentForm
            student={currentStudent}
            forms={forms}
            streams={streams}
            onSubmit={handleEditStudent}
            onCancel={() => setIsEditDialogOpen(false)} data-id="efcrdkp0z" data-path="src/pages/StudentsPage.tsx" />

          }
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} data-id="hqnmal79d" data-path="src/pages/StudentsPage.tsx">
        <DialogContent data-id="19wgwra06" data-path="src/pages/StudentsPage.tsx">
          <DialogHeader data-id="bwhkym1p6" data-path="src/pages/StudentsPage.tsx">
            <DialogTitle data-id="z2i864f0s" data-path="src/pages/StudentsPage.tsx">Confirm Student Removal</DialogTitle>
            <DialogDescription data-id="8egk157ps" data-path="src/pages/StudentsPage.tsx">
              Are you sure you want to remove {currentStudent?.name} from the system? 
              This will also remove all associated marks and records. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter data-id="9oey6yf99" data-path="src/pages/StudentsPage.tsx">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting} data-id="5vg4qwmuv" data-path="src/pages/StudentsPage.tsx">

              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteStudent}
              disabled={isSubmitting} data-id="onlqscwto" data-path="src/pages/StudentsPage.tsx">

              {isSubmitting ? 'Removing...' : 'Remove Student'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

};

export default StudentsPage;