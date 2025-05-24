import { useState } from 'react';
import { useStudents, Student } from '@/contexts/StudentContext';
import { useMarks, Mark, Subject } from '@/contexts/MarksContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
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
import { Textarea } from '@/components/ui/textarea';

// Define exam types and terms
const EXAM_TYPES = ['CAT', 'Mid-term', 'Final', 'Assignment', 'Project', 'Practical'];
const TERMS = ['Term 1', 'Term 2', 'Term 3'];

const MarkForm = ({
  mark,
  students,
  subjects,
  onSubmit,
  onCancel






}: {mark?: Mark;students: Student[];subjects: Subject[];onSubmit: (data: Omit<Mark, 'ID'>) => void;onCancel: () => void;}) => {
  const [studentId, setStudentId] = useState<number>(mark?.student_id || 0);
  const [subjectId, setSubjectId] = useState<number>(mark?.subject_id || 0);
  const [score, setScore] = useState(mark?.score.toString() || '');
  const [maxScore, setMaxScore] = useState(mark?.max_score.toString() || '100');
  const [term, setTerm] = useState(mark?.term || '');
  const [examType, setExamType] = useState(mark?.exam_type || '');
  const [remarks, setRemarks] = useState(mark?.remarks || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !subjectId) {
      alert('Please select both student and subject');
      return;
    }

    onSubmit({
      student_id: studentId,
      subject_id: subjectId,
      teacher_id: 1, // Will need to get from current user context
      score: parseFloat(score),
      max_score: parseFloat(maxScore),
      term,
      exam_type: examType,
      remarks,
      date_recorded: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-id="hcajqtm09" data-path="src/pages/MarksPage.tsx">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="z9z4zvpqk" data-path="src/pages/MarksPage.tsx">
        <div className="space-y-2" data-id="ah6zwx0mj" data-path="src/pages/MarksPage.tsx">
          <Label htmlFor="student" data-id="2smct3sqs" data-path="src/pages/MarksPage.tsx">Student</Label>
          <Select
            value={studentId.toString()}
            onValueChange={(value) => setStudentId(parseInt(value))}
            required data-id="xp4azsebv" data-path="src/pages/MarksPage.tsx">

            <SelectTrigger data-id="iw9sguv0n" data-path="src/pages/MarksPage.tsx">
              <SelectValue placeholder="Select a student" data-id="32ikn33f2" data-path="src/pages/MarksPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="pm2l1q4z1" data-path="src/pages/MarksPage.tsx">
              {students.map((student) =>
              <SelectItem key={student.ID} value={student.ID.toString()} data-id="ed522n8d8" data-path="src/pages/MarksPage.tsx">
                  {student.name} ({student.formName} - {student.streamName})
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2" data-id="mkjhehl5a" data-path="src/pages/MarksPage.tsx">
          <Label htmlFor="subject" data-id="48jbjb4b6" data-path="src/pages/MarksPage.tsx">Subject</Label>
          <Select
            value={subjectId.toString()}
            onValueChange={(value) => setSubjectId(parseInt(value))}
            required data-id="90yq7itdp" data-path="src/pages/MarksPage.tsx">

            <SelectTrigger data-id="8bb2zhj2h" data-path="src/pages/MarksPage.tsx">
              <SelectValue placeholder="Select a subject" data-id="7t2aaqq4s" data-path="src/pages/MarksPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="2tnotd1u9" data-path="src/pages/MarksPage.tsx">
              {subjects.map((subject) =>
              <SelectItem key={subject.ID} value={subject.ID.toString()} data-id="36hke3p64" data-path="src/pages/MarksPage.tsx">
                  {subject.name} ({subject.code})
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2" data-id="ysp9p9zrz" data-path="src/pages/MarksPage.tsx">
          <Label htmlFor="score" data-id="upxz8hzll" data-path="src/pages/MarksPage.tsx">Score</Label>
          <Input
            id="score"
            type="number"
            min="0"
            max={maxScore}
            step="0.1"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required data-id="b1p201ntz" data-path="src/pages/MarksPage.tsx" />

        </div>
        <div className="space-y-2" data-id="7fsukt1aa" data-path="src/pages/MarksPage.tsx">
          <Label htmlFor="maxScore" data-id="mmq9vuacg" data-path="src/pages/MarksPage.tsx">Maximum Score</Label>
          <Input
            id="maxScore"
            type="number"
            min="1"
            step="0.1"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
            required data-id="d2cdgzcjy" data-path="src/pages/MarksPage.tsx" />

        </div>
        <div className="space-y-2" data-id="s1po7xuve" data-path="src/pages/MarksPage.tsx">
          <Label htmlFor="term" data-id="fmdfmd8fp" data-path="src/pages/MarksPage.tsx">Term</Label>
          <Select
            value={term}
            onValueChange={setTerm}
            required data-id="typ9v87mt" data-path="src/pages/MarksPage.tsx">

            <SelectTrigger data-id="2nrcwnii3" data-path="src/pages/MarksPage.tsx">
              <SelectValue placeholder="Select a term" data-id="t0l4pk5mw" data-path="src/pages/MarksPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="0fb5jxhkq" data-path="src/pages/MarksPage.tsx">
              {TERMS.map((t) =>
              <SelectItem key={t} value={t} data-id="ap3i0b278" data-path="src/pages/MarksPage.tsx">
                  {t}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2" data-id="r3l3r5l3l" data-path="src/pages/MarksPage.tsx">
          <Label htmlFor="examType" data-id="s9dfryq86" data-path="src/pages/MarksPage.tsx">Exam Type</Label>
          <Select
            value={examType}
            onValueChange={setExamType}
            required data-id="ssw57jcrb" data-path="src/pages/MarksPage.tsx">

            <SelectTrigger data-id="7o6fjcy1z" data-path="src/pages/MarksPage.tsx">
              <SelectValue placeholder="Select exam type" data-id="nt6ifhynz" data-path="src/pages/MarksPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="0vtquadqz" data-path="src/pages/MarksPage.tsx">
              {EXAM_TYPES.map((type) =>
              <SelectItem key={type} value={type} data-id="n7670570g" data-path="src/pages/MarksPage.tsx">
                  {type}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 col-span-2" data-id="bonxvxbui" data-path="src/pages/MarksPage.tsx">
          <Label htmlFor="remarks" data-id="hheax0ini" data-path="src/pages/MarksPage.tsx">Remarks</Label>
          <Textarea
            id="remarks"
            placeholder="Add comments about the performance"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)} data-id="tjoz11ugh" data-path="src/pages/MarksPage.tsx" />

        </div>
      </div>

      <DialogFooter data-id="9gruwjnu2" data-path="src/pages/MarksPage.tsx">
        <Button type="button" variant="outline" onClick={onCancel} data-id="6apfbx1wb" data-path="src/pages/MarksPage.tsx">
          Cancel
        </Button>
        <Button type="submit" data-id="26s48c3np" data-path="src/pages/MarksPage.tsx">Save Mark</Button>
      </DialogFooter>
    </form>);

};

const MarksPage = () => {
  const { students, loading: studentsLoading } = useStudents();
  const {
    marks,
    subjects,
    loading: marksLoading,
    addMark,
    updateMark,
    deleteMark
  } = useMarks();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMark, setCurrentMark] = useState<Mark | undefined>(undefined);
  const [studentFilter, setStudentFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [termFilter, setTermFilter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const loading = studentsLoading || marksLoading;

  // Filter marks based on filters
  const filteredMarks = marks.filter((mark) => {
    const student = students.find((s) => s.ID === mark.student_id);
    const subject = subjects.find((s) => s.ID === mark.subject_id);

    return (
      (studentFilter === '' || mark.student_id.toString() === studentFilter) && (
      subjectFilter === '' || mark.subject_id.toString() === subjectFilter) && (
      termFilter === '' || mark.term === termFilter));

  });

  const handleAddMark = async (markData: Omit<Mark, 'ID'>) => {
    setIsSubmitting(true);
    try {
      await addMark(markData);
      setIsAddDialogOpen(false);
      const student = students.find((s) => s.ID === markData.student_id);
      const subject = subjects.find((s) => s.ID === markData.subject_id);
      toast({
        title: 'Mark Added',
        description: `Mark added for ${student?.name} in ${subject?.name}.`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add mark. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMark = async (markData: Omit<Mark, 'ID'>) => {
    if (!currentMark) return;

    setIsSubmitting(true);
    try {
      await updateMark(currentMark.ID, markData);
      setIsEditDialogOpen(false);
      setCurrentMark(undefined);
      toast({
        title: 'Mark Updated',
        description: 'Mark has been updated successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update mark. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMark = async () => {
    if (!currentMark) return;

    setIsSubmitting(true);
    try {
      await deleteMark(currentMark.ID);
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Mark Deleted',
        description: 'Mark has been removed from the system.',
        variant: 'destructive'
      });
      setCurrentMark(undefined);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete mark. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (mark: Mark) => {
    setCurrentMark(mark);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (mark: Mark) => {
    setCurrentMark(mark);
    setIsDeleteDialogOpen(true);
  };

  const getPercentage = (score: number, maxScore: number) => {
    return (score / maxScore * 100).toFixed(1) + '%';
  };

  const getGrade = (score: number, maxScore: number) => {
    const percentage = score / maxScore * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" data-id="rdlcn930k" data-path="src/pages/MarksPage.tsx">
        <div className="text-center space-y-4" data-id="q7vh6it8k" data-path="src/pages/MarksPage.tsx">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" data-id="za6xdlyxa" data-path="src/pages/MarksPage.tsx" />
          <p className="text-gray-600" data-id="l5qq882x0" data-path="src/pages/MarksPage.tsx">Loading marks...</p>
        </div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="smsw30npt" data-path="src/pages/MarksPage.tsx">
      <div className="flex justify-between items-center" data-id="97k5h0kwi" data-path="src/pages/MarksPage.tsx">
        <div data-id="41bycq2sm" data-path="src/pages/MarksPage.tsx">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" data-id="wdol23lg6" data-path="src/pages/MarksPage.tsx">
            Marks Management
          </h2>
          <p className="text-muted-foreground mt-1" data-id="oj5bzlew3" data-path="src/pages/MarksPage.tsx">
            Record and manage student assessment scores
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700" data-id="pavzo2ftf" data-path="src/pages/MarksPage.tsx">

          <Plus className="mr-2 h-4 w-4" data-id="7dnrcspzp" data-path="src/pages/MarksPage.tsx" />
          Add Mark
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4" data-id="rw46zw4x9" data-path="src/pages/MarksPage.tsx">
        <Card data-id="ngve1f8bv" data-path="src/pages/MarksPage.tsx">
          <CardHeader className="pb-2" data-id="84umjdbfq" data-path="src/pages/MarksPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="2sc9s4ftj" data-path="src/pages/MarksPage.tsx">Total Marks</CardTitle>
          </CardHeader>
          <CardContent data-id="dl20iwph8" data-path="src/pages/MarksPage.tsx">
            <div className="text-2xl font-bold" data-id="n6kn3623p" data-path="src/pages/MarksPage.tsx">{marks.length}</div>
            <p className="text-xs text-muted-foreground" data-id="349d23cbq" data-path="src/pages/MarksPage.tsx">Recorded assessments</p>
          </CardContent>
        </Card>
        <Card data-id="7y8v4eot3" data-path="src/pages/MarksPage.tsx">
          <CardHeader className="pb-2" data-id="y440jcm9o" data-path="src/pages/MarksPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="lgwe8fnwf" data-path="src/pages/MarksPage.tsx">Students Assessed</CardTitle>
          </CardHeader>
          <CardContent data-id="obiq4lvqd" data-path="src/pages/MarksPage.tsx">
            <div className="text-2xl font-bold" data-id="9zpf2z6o4" data-path="src/pages/MarksPage.tsx">
              {new Set(marks.map((m) => m.student_id)).size}
            </div>
            <p className="text-xs text-muted-foreground" data-id="9krbhbodu" data-path="src/pages/MarksPage.tsx">Unique students</p>
          </CardContent>
        </Card>
        <Card data-id="vmbo3jxa8" data-path="src/pages/MarksPage.tsx">
          <CardHeader className="pb-2" data-id="hvougzpwk" data-path="src/pages/MarksPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="uhx4ilk9p" data-path="src/pages/MarksPage.tsx">Subjects</CardTitle>
          </CardHeader>
          <CardContent data-id="s7mmuz3pp" data-path="src/pages/MarksPage.tsx">
            <div className="text-2xl font-bold" data-id="joo3sy629" data-path="src/pages/MarksPage.tsx">{subjects.length}</div>
            <p className="text-xs text-muted-foreground" data-id="3c2nkxlf9" data-path="src/pages/MarksPage.tsx">Available subjects</p>
          </CardContent>
        </Card>
        <Card data-id="82i3rjy71" data-path="src/pages/MarksPage.tsx">
          <CardHeader className="pb-2" data-id="dn0bs6rc0" data-path="src/pages/MarksPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="c8ydrn6kv" data-path="src/pages/MarksPage.tsx">Average Score</CardTitle>
          </CardHeader>
          <CardContent data-id="4uktlplcx" data-path="src/pages/MarksPage.tsx">
            <div className="text-2xl font-bold" data-id="odb9k8i3v" data-path="src/pages/MarksPage.tsx">
              {marks.length > 0 ?
              (marks.reduce((sum, mark) => sum + mark.score / mark.max_score * 100, 0) / marks.length).toFixed(1) + '%' :
              '0%'
              }
            </div>
            <p className="text-xs text-muted-foreground" data-id="5du19k4mf" data-path="src/pages/MarksPage.tsx">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      <Card data-id="x14e900sa" data-path="src/pages/MarksPage.tsx">
        <CardHeader data-id="1k283ppdl" data-path="src/pages/MarksPage.tsx">
          <CardTitle data-id="vhmj3np6j" data-path="src/pages/MarksPage.tsx">Assessment Records</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2" data-id="zhyz2uasv" data-path="src/pages/MarksPage.tsx">
            <div data-id="60ysjx32q" data-path="src/pages/MarksPage.tsx">
              <Select value={studentFilter} onValueChange={setStudentFilter} data-id="gc3oz1ays" data-path="src/pages/MarksPage.tsx">
                <SelectTrigger data-id="0hm27uu8r" data-path="src/pages/MarksPage.tsx">
                  <SelectValue placeholder="Filter by student" data-id="qt1qe99x5" data-path="src/pages/MarksPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="w8ohgvrlj" data-path="src/pages/MarksPage.tsx">
                  <SelectItem value="" data-id="2bmivyrns" data-path="src/pages/MarksPage.tsx">All Students</SelectItem>
                  {students.map((student) =>
                  <SelectItem key={student.ID} value={student.ID.toString()} data-id="entgg7664" data-path="src/pages/MarksPage.tsx">
                      {student.name}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div data-id="xy57cmv07" data-path="src/pages/MarksPage.tsx">
              <Select value={subjectFilter} onValueChange={setSubjectFilter} data-id="x8hu1jtaf" data-path="src/pages/MarksPage.tsx">
                <SelectTrigger data-id="z4s0qonoy" data-path="src/pages/MarksPage.tsx">
                  <SelectValue placeholder="Filter by subject" data-id="0spnkz6gw" data-path="src/pages/MarksPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="c5g4yomhh" data-path="src/pages/MarksPage.tsx">
                  <SelectItem value="" data-id="tzb9d8d8q" data-path="src/pages/MarksPage.tsx">All Subjects</SelectItem>
                  {subjects.map((subject) =>
                  <SelectItem key={subject.ID} value={subject.ID.toString()} data-id="ikks30vlx" data-path="src/pages/MarksPage.tsx">
                      {subject.name}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div data-id="0m5l923m2" data-path="src/pages/MarksPage.tsx">
              <Select value={termFilter} onValueChange={setTermFilter} data-id="j1sq97pwm" data-path="src/pages/MarksPage.tsx">
                <SelectTrigger data-id="zxg0rg8jx" data-path="src/pages/MarksPage.tsx">
                  <SelectValue placeholder="Filter by term" data-id="uk63vid1b" data-path="src/pages/MarksPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="hgg2ad9wm" data-path="src/pages/MarksPage.tsx">
                  <SelectItem value="" data-id="i0f08l5hy" data-path="src/pages/MarksPage.tsx">All Terms</SelectItem>
                  {TERMS.map((term) =>
                  <SelectItem key={term} value={term} data-id="zv3i1apps" data-path="src/pages/MarksPage.tsx">
                      {term}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div data-id="kbwamdzp0" data-path="src/pages/MarksPage.tsx">
              <Button
                variant="outline"
                onClick={() => {
                  setStudentFilter('');
                  setSubjectFilter('');
                  setTermFilter('');
                }} data-id="yval0nabt" data-path="src/pages/MarksPage.tsx">

                Clear Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent data-id="6pm5fl0bh" data-path="src/pages/MarksPage.tsx">
          <div className="rounded-md border" data-id="dcnkowzdk" data-path="src/pages/MarksPage.tsx">
            <Table data-id="wgyxfocln" data-path="src/pages/MarksPage.tsx">
              <TableHeader data-id="x1obnb3h8" data-path="src/pages/MarksPage.tsx">
                <TableRow data-id="lahsxf3qk" data-path="src/pages/MarksPage.tsx">
                  <TableHead data-id="5j3ub6vbh" data-path="src/pages/MarksPage.tsx">Student</TableHead>
                  <TableHead data-id="rplzbs64t" data-path="src/pages/MarksPage.tsx">Subject</TableHead>
                  <TableHead data-id="bmkhrtlci" data-path="src/pages/MarksPage.tsx">Score</TableHead>
                  <TableHead data-id="cw1vh6tts" data-path="src/pages/MarksPage.tsx">Percentage</TableHead>
                  <TableHead data-id="db4vu1qvi" data-path="src/pages/MarksPage.tsx">Grade</TableHead>
                  <TableHead data-id="iq62cnbh6" data-path="src/pages/MarksPage.tsx">Term</TableHead>
                  <TableHead data-id="ewm7q795k" data-path="src/pages/MarksPage.tsx">Exam Type</TableHead>
                  <TableHead data-id="59qaowt6q" data-path="src/pages/MarksPage.tsx">Date</TableHead>
                  <TableHead className="w-[80px]" data-id="m3jomxom1" data-path="src/pages/MarksPage.tsx">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-id="x3s5iyjzb" data-path="src/pages/MarksPage.tsx">
                {filteredMarks.length > 0 ?
                filteredMarks.map((mark) => {
                  const student = students.find((s) => s.ID === mark.student_id);
                  const subject = subjects.find((s) => s.ID === mark.subject_id);
                  return (
                    <TableRow key={mark.ID} data-id="4rf219rnl" data-path="src/pages/MarksPage.tsx">
                        <TableCell className="font-medium" data-id="4s6s2oe6w" data-path="src/pages/MarksPage.tsx">
                          {student?.name || 'Unknown'}
                        </TableCell>
                        <TableCell data-id="9f6du3hw8" data-path="src/pages/MarksPage.tsx">{subject?.name || 'Unknown'}</TableCell>
                        <TableCell data-id="sm2hexykq" data-path="src/pages/MarksPage.tsx">{mark.score}/{mark.max_score}</TableCell>
                        <TableCell data-id="fzp3wnrbr" data-path="src/pages/MarksPage.tsx">{getPercentage(mark.score, mark.max_score)}</TableCell>
                        <TableCell data-id="f51r9ywqz" data-path="src/pages/MarksPage.tsx">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                        getGrade(mark.score, mark.max_score) === 'A+' || getGrade(mark.score, mark.max_score) === 'A' ?
                        'bg-green-100 text-green-800' :
                        getGrade(mark.score, mark.max_score) === 'B' || getGrade(mark.score, mark.max_score) === 'C' ?
                        'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`
                        } data-id="m7ol0wvg4" data-path="src/pages/MarksPage.tsx">
                            {getGrade(mark.score, mark.max_score)}
                          </span>
                        </TableCell>
                        <TableCell data-id="4gbkq984t" data-path="src/pages/MarksPage.tsx">{mark.term}</TableCell>
                        <TableCell data-id="6zl3ovug9" data-path="src/pages/MarksPage.tsx">{mark.exam_type}</TableCell>
                        <TableCell data-id="wtjjg7u2t" data-path="src/pages/MarksPage.tsx">
                          {new Date(mark.date_recorded).toLocaleDateString()}
                        </TableCell>
                        <TableCell data-id="vri851tth" data-path="src/pages/MarksPage.tsx">
                          <DropdownMenu data-id="00clpv3pi" data-path="src/pages/MarksPage.tsx">
                            <DropdownMenuTrigger asChild data-id="8ilx5gvii" data-path="src/pages/MarksPage.tsx">
                              <Button variant="ghost" className="h-8 w-8 p-0" data-id="0lx1hd1l8" data-path="src/pages/MarksPage.tsx">
                                <span className="sr-only" data-id="tqz3npcjj" data-path="src/pages/MarksPage.tsx">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" data-id="psdjpjmyc" data-path="src/pages/MarksPage.tsx" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" data-id="n7m2l9s5y" data-path="src/pages/MarksPage.tsx">
                              <DropdownMenuLabel data-id="kgj1wox23" data-path="src/pages/MarksPage.tsx">Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator data-id="f8z5iu5vi" data-path="src/pages/MarksPage.tsx" />
                              <DropdownMenuItem onClick={() => openEditDialog(mark)} data-id="ufoo81smf" data-path="src/pages/MarksPage.tsx">
                                Edit Mark
                              </DropdownMenuItem>
                              <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => openDeleteDialog(mark)} data-id="5yvtmizx0" data-path="src/pages/MarksPage.tsx">

                                Delete Mark
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>);

                }) :

                <TableRow data-id="f69d05bfj" data-path="src/pages/MarksPage.tsx">
                    <TableCell colSpan={9} className="h-24 text-center" data-id="1j6lbkw63" data-path="src/pages/MarksPage.tsx">
                      {studentFilter || subjectFilter || termFilter ?
                    'No marks found matching your filters.' :
                    'No marks recorded yet.'}
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Mark Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="hp1h7brd2" data-path="src/pages/MarksPage.tsx">
        <DialogContent className="sm:max-w-[600px]" data-id="7jfztvmas" data-path="src/pages/MarksPage.tsx">
          <DialogHeader data-id="8d1242sjq" data-path="src/pages/MarksPage.tsx">
            <DialogTitle data-id="mh5vw2drr" data-path="src/pages/MarksPage.tsx">Add New Assessment Mark</DialogTitle>
            <DialogDescription data-id="6cmbacngw" data-path="src/pages/MarksPage.tsx">
              Record a new assessment score for a student.
            </DialogDescription>
          </DialogHeader>
          <MarkForm
            students={students}
            subjects={subjects}
            onSubmit={handleAddMark}
            onCancel={() => setIsAddDialogOpen(false)} data-id="ze1projch" data-path="src/pages/MarksPage.tsx" />

        </DialogContent>
      </Dialog>

      {/* Edit Mark Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} data-id="9ls95p1l5" data-path="src/pages/MarksPage.tsx">
        <DialogContent className="sm:max-w-[600px]" data-id="8avwbandr" data-path="src/pages/MarksPage.tsx">
          <DialogHeader data-id="twcx71ibh" data-path="src/pages/MarksPage.tsx">
            <DialogTitle data-id="kimbyllfq" data-path="src/pages/MarksPage.tsx">Edit Assessment Mark</DialogTitle>
            <DialogDescription data-id="ct6iqtwi0" data-path="src/pages/MarksPage.tsx">
              Update the assessment score details.
            </DialogDescription>
          </DialogHeader>
          {currentMark &&
          <MarkForm
            mark={currentMark}
            students={students}
            subjects={subjects}
            onSubmit={handleEditMark}
            onCancel={() => setIsEditDialogOpen(false)} data-id="zkgeiqqbu" data-path="src/pages/MarksPage.tsx" />

          }
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} data-id="1gxnpmvae" data-path="src/pages/MarksPage.tsx">
        <DialogContent data-id="ljwunse23" data-path="src/pages/MarksPage.tsx">
          <DialogHeader data-id="ng6zfa4sv" data-path="src/pages/MarksPage.tsx">
            <DialogTitle data-id="w2lkok0w5" data-path="src/pages/MarksPage.tsx">Confirm Mark Deletion</DialogTitle>
            <DialogDescription data-id="g7pp9pxgl" data-path="src/pages/MarksPage.tsx">
              Are you sure you want to delete this assessment mark? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter data-id="gcod9h1gx" data-path="src/pages/MarksPage.tsx">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting} data-id="kb47m250y" data-path="src/pages/MarksPage.tsx">

              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteMark}
              disabled={isSubmitting} data-id="nyq8jb4bt" data-path="src/pages/MarksPage.tsx">

              {isSubmitting ? 'Deleting...' : 'Delete Mark'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

};

export default MarksPage;