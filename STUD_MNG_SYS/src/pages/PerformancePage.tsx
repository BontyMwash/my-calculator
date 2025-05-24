import { useState, useEffect } from 'react';
import { useStudents } from '@/contexts/StudentContext';
import { useMarks } from '@/contexts/MarksContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Chart } from '@/components/ui/chart-wrapper';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define list of subjects - keep in sync with MarksPage
const SUBJECTS = [
'Mathematics',
'English',
'Science',
'History',
'Geography',
'Physics',
'Chemistry',
'Biology',
'Computer Science',
'Art',
'Music',
'Physical Education'];


// Define list of terms - keep in sync with MarksPage
const TERMS = ['First Term', 'Second Term', 'Final Term', 'Mid-Term', 'Annual'];

const PerformancePage = () => {
  const { students, getStudent } = useStudents();
  const { marks, getStudentMarks, getStudentSubjectMarks } = useMarks();
  const { user } = useAuth();

  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');

  // Performance data
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [progressData, setProgressData] = useState<any>(null);
  const [studentMarks, setStudentMarks] = useState<any[]>([]);

  // Set selected student to current user if role is student
  useEffect(() => {
    if (user?.role === 'student') {
      // Find student associated with current user (assuming username matches)
      const studentUser = students.find((s) => s.email === user.email);
      if (studentUser) {
        setSelectedStudent(studentUser.id);
      }
    } else if (students.length > 0 && !selectedStudent) {
      // Default to first student for other roles
      setSelectedStudent(students[0].id);
    }
  }, [user, students, selectedStudent]);

  // Update charts when selections change
  useEffect(() => {
    if (!selectedStudent) return;

    // Get filtered student marks
    const filteredMarks = selectedTerm ?
    marks.filter((mark) => mark.studentId === selectedStudent && mark.term === selectedTerm) :
    marks.filter((mark) => mark.studentId === selectedStudent);

    setStudentMarks(filteredMarks);

    // Performance across subjects
    const subjectPerformance = SUBJECTS.map((subject) => {
      const subjectMarks = filteredMarks.filter((mark) => mark.subject === subject);

      if (subjectMarks.length === 0) return { subject, average: 0 };

      const average = subjectMarks.reduce((sum, mark) => sum + mark.score / mark.maxScore * 100, 0) / subjectMarks.length;
      return { subject, average };
    }).filter((item) => item.average > 0);

    setPerformanceData({
      labels: subjectPerformance.map((item) => item.subject),
      datasets: [
      {
        label: 'Performance (%)',
        data: subjectPerformance.map((item) => item.average.toFixed(1)),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }]

    });

    // Progress over time (terms)
    // Group marks by term and calculate average for each term
    const termProgress: Record<string, {count: number;total: number;}> = {};

    filteredMarks.forEach((mark) => {
      if (!termProgress[mark.term]) {
        termProgress[mark.term] = { count: 0, total: 0 };
      }
      termProgress[mark.term].count++;
      termProgress[mark.term].total += mark.score / mark.maxScore * 100;
    });

    const progressDataArray = Object.entries(termProgress).map(([term, data]) => {
      return { term, average: data.total / data.count };
    });

    // Sort by term order
    progressDataArray.sort((a, b) => {
      const termAIndex = TERMS.indexOf(a.term);
      const termBIndex = TERMS.indexOf(b.term);
      return termAIndex - termBIndex;
    });

    setProgressData({
      labels: progressDataArray.map((item) => item.term),
      datasets: [
      {
        label: 'Average Score (%)',
        data: progressDataArray.map((item) => item.average.toFixed(1)),
        fill: false,
        backgroundColor: 'rgb(16, 185, 129)',
        borderColor: 'rgba(16, 185, 129, 0.8)',
        tension: 0.1
      }]

    });

  }, [selectedStudent, selectedTerm, marks]);

  // Calculate overall stats
  const calculateStats = () => {
    if (!studentMarks.length) return { average: 0, highest: 0, lowest: 0, passRate: 0 };

    const scores = studentMarks.map((mark) => mark.score / mark.maxScore * 100);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passRate = scores.filter((score) => score >= 50).length / scores.length * 100;

    return { average, highest, lowest, passRate };
  };

  const stats = calculateStats();

  // Function to get grade letter from percentage
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6" data-id="uzwag2srx" data-path="src/pages/PerformancePage.tsx">
      <div data-id="h48b6may4" data-path="src/pages/PerformancePage.tsx">
        <h2 className="text-3xl font-bold tracking-tight" data-id="7xz8y3a73" data-path="src/pages/PerformancePage.tsx">Student Performance</h2>
        <p className="text-muted-foreground" data-id="sr7owtv10" data-path="src/pages/PerformancePage.tsx">
          Detailed analysis of student performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="ux2hn4agp" data-path="src/pages/PerformancePage.tsx">
        {user?.role !== 'student' &&
        <div data-id="fqk2g3epb" data-path="src/pages/PerformancePage.tsx">
            <Label data-id="gh62z4r8p" data-path="src/pages/PerformancePage.tsx">Select Student</Label>
            <Select
            value={selectedStudent}
            onValueChange={setSelectedStudent} data-id="v3wvj7m8w" data-path="src/pages/PerformancePage.tsx">

              <SelectTrigger data-id="8gq6jldi2" data-path="src/pages/PerformancePage.tsx">
                <SelectValue placeholder="Select a student" data-id="hvit6fj7m" data-path="src/pages/PerformancePage.tsx" />
              </SelectTrigger>
              <SelectContent data-id="8j5yaiby9" data-path="src/pages/PerformancePage.tsx">
                {students.map((student) =>
              <SelectItem key={student.id} value={student.id} data-id="ys6uawsvo" data-path="src/pages/PerformancePage.tsx">
                    {student.name} ({student.grade})
                  </SelectItem>
              )}
              </SelectContent>
            </Select>
          </div>
        }
        <div data-id="8rswlyji4" data-path="src/pages/PerformancePage.tsx">
          <Label data-id="a85j1i2h2" data-path="src/pages/PerformancePage.tsx">Filter by Term</Label>
          <Select
            value={selectedTerm}
            onValueChange={setSelectedTerm} data-id="4pjghnv6p" data-path="src/pages/PerformancePage.tsx">

            <SelectTrigger data-id="xbs1gdncn" data-path="src/pages/PerformancePage.tsx">
              <SelectValue placeholder="All Terms" data-id="zq4esvj5l" data-path="src/pages/PerformancePage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="jfi7t26vw" data-path="src/pages/PerformancePage.tsx">
              <SelectItem value="" data-id="ibuuxa7uq" data-path="src/pages/PerformancePage.tsx">All Terms</SelectItem>
              {TERMS.map((term) =>
              <SelectItem key={term} value={term} data-id="u7h0kahm3" data-path="src/pages/PerformancePage.tsx">
                  {term}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedStudent &&
      <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-id="xot9y6rj4" data-path="src/pages/PerformancePage.tsx">
            <Card data-id="a2k0ggnv3" data-path="src/pages/PerformancePage.tsx">
              <CardHeader className="pb-2" data-id="2gcioo6zw" data-path="src/pages/PerformancePage.tsx">
                <CardTitle className="text-sm font-medium" data-id="hh113ondy" data-path="src/pages/PerformancePage.tsx">Average Score</CardTitle>
              </CardHeader>
              <CardContent data-id="8hgzdovog" data-path="src/pages/PerformancePage.tsx">
                <div className="text-2xl font-bold" data-id="k5b7rqinf" data-path="src/pages/PerformancePage.tsx">{stats.average.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1" data-id="mspr2qt4k" data-path="src/pages/PerformancePage.tsx">
                  Grade: {getGrade(stats.average)}
                </p>
              </CardContent>
            </Card>
            
            <Card data-id="y7dhpj5cc" data-path="src/pages/PerformancePage.tsx">
              <CardHeader className="pb-2" data-id="38tjm4zos" data-path="src/pages/PerformancePage.tsx">
                <CardTitle className="text-sm font-medium" data-id="qgmxkco0m" data-path="src/pages/PerformancePage.tsx">Highest Score</CardTitle>
              </CardHeader>
              <CardContent data-id="9hwurjp9k" data-path="src/pages/PerformancePage.tsx">
                <div className="text-2xl font-bold" data-id="y6oz5eerv" data-path="src/pages/PerformancePage.tsx">{stats.highest.toFixed(1)}%</div>
              </CardContent>
            </Card>
            
            <Card data-id="5dflgq1ds" data-path="src/pages/PerformancePage.tsx">
              <CardHeader className="pb-2" data-id="c9227h3jw" data-path="src/pages/PerformancePage.tsx">
                <CardTitle className="text-sm font-medium" data-id="h0pf7sh80" data-path="src/pages/PerformancePage.tsx">Lowest Score</CardTitle>
              </CardHeader>
              <CardContent data-id="nr3fmexfb" data-path="src/pages/PerformancePage.tsx">
                <div className="text-2xl font-bold" data-id="zk88kyc4v" data-path="src/pages/PerformancePage.tsx">{stats.lowest.toFixed(1)}%</div>
              </CardContent>
            </Card>
            
            <Card data-id="twjv4kek7" data-path="src/pages/PerformancePage.tsx">
              <CardHeader className="pb-2" data-id="i89utrhie" data-path="src/pages/PerformancePage.tsx">
                <CardTitle className="text-sm font-medium" data-id="7jrmbppf8" data-path="src/pages/PerformancePage.tsx">Pass Rate</CardTitle>
              </CardHeader>
              <CardContent data-id="ghj8qjefl" data-path="src/pages/PerformancePage.tsx">
                <div className="text-2xl font-bold" data-id="m28d4gynb" data-path="src/pages/PerformancePage.tsx">{stats.passRate.toFixed(1)}%</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" data-id="3ancmpujy" data-path="src/pages/PerformancePage.tsx">
            <TabsList className="grid w-full grid-cols-3" data-id="qpwmacb36" data-path="src/pages/PerformancePage.tsx">
              <TabsTrigger value="performance" data-id="neeozeupf" data-path="src/pages/PerformancePage.tsx">Subject Performance</TabsTrigger>
              <TabsTrigger value="progress" data-id="pmtr9a8ud" data-path="src/pages/PerformancePage.tsx">Progress Over Time</TabsTrigger>
              <TabsTrigger value="details" data-id="s5bcylbcv" data-path="src/pages/PerformancePage.tsx">Detailed Marks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" data-id="dwfqxc6gj" data-path="src/pages/PerformancePage.tsx">
              <Card data-id="hiq4berge" data-path="src/pages/PerformancePage.tsx">
                <CardHeader data-id="xkq47sb0g" data-path="src/pages/PerformancePage.tsx">
                  <CardTitle data-id="vur94vkyw" data-path="src/pages/PerformancePage.tsx">
                    Subject Performance
                    {selectedTerm && ` (${selectedTerm})`}
                  </CardTitle>
                </CardHeader>
                <CardContent data-id="23jc7t6qc" data-path="src/pages/PerformancePage.tsx">
                  {performanceData && performanceData.labels.length > 0 ?
                <div className="h-[400px]" data-id="ys3z9ls98" data-path="src/pages/PerformancePage.tsx">
                      <Chart
                    type="bar"
                    data={performanceData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Score (%)'
                          }
                        }
                      }
                    }} data-id="vzb6ivjoe" data-path="src/pages/PerformancePage.tsx" />

                    </div> :

                <div className="h-[400px] flex items-center justify-center" data-id="cf1sq40di" data-path="src/pages/PerformancePage.tsx">
                      <p className="text-muted-foreground" data-id="7rauz0i5o" data-path="src/pages/PerformancePage.tsx">No data available for the selected student.</p>
                    </div>
                }
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" data-id="zw5t3nsq9" data-path="src/pages/PerformancePage.tsx">
              <Card data-id="w4o466t67" data-path="src/pages/PerformancePage.tsx">
                <CardHeader data-id="hyg8tc9ib" data-path="src/pages/PerformancePage.tsx">
                  <CardTitle data-id="m79w4l7bb" data-path="src/pages/PerformancePage.tsx">Progress Over Time</CardTitle>
                </CardHeader>
                <CardContent data-id="ma5w1iu89" data-path="src/pages/PerformancePage.tsx">
                  {progressData && progressData.labels.length > 0 ?
                <div className="h-[400px]" data-id="cvpa9xbev" data-path="src/pages/PerformancePage.tsx">
                      <Chart
                    type="line"
                    data={progressData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Average Score (%)'
                          }
                        }
                      }
                    }} data-id="zbmu8e8e0" data-path="src/pages/PerformancePage.tsx" />

                    </div> :

                <div className="h-[400px] flex items-center justify-center" data-id="hdnowvss6" data-path="src/pages/PerformancePage.tsx">
                      <p className="text-muted-foreground" data-id="wkqoiceut" data-path="src/pages/PerformancePage.tsx">No data available to show progress over time.</p>
                    </div>
                }
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" data-id="tzo4ubl8r" data-path="src/pages/PerformancePage.tsx">
              <Card data-id="crnnz4ezs" data-path="src/pages/PerformancePage.tsx">
                <CardHeader data-id="qeqe5k6nr" data-path="src/pages/PerformancePage.tsx">
                  <CardTitle data-id="02owpliy7" data-path="src/pages/PerformancePage.tsx">Detailed Marks</CardTitle>
                </CardHeader>
                <CardContent data-id="fnbadko1k" data-path="src/pages/PerformancePage.tsx">
                  <div className="rounded-md border" data-id="ilif1yp3q" data-path="src/pages/PerformancePage.tsx">
                    <Table data-id="9jawf59qd" data-path="src/pages/PerformancePage.tsx">
                      <TableHeader data-id="61qm26png" data-path="src/pages/PerformancePage.tsx">
                        <TableRow data-id="4y051wbig" data-path="src/pages/PerformancePage.tsx">
                          <TableHead data-id="sxuaue2g8" data-path="src/pages/PerformancePage.tsx">Subject</TableHead>
                          <TableHead data-id="0sci0pu1r" data-path="src/pages/PerformancePage.tsx">Score</TableHead>
                          <TableHead data-id="njj8cnuax" data-path="src/pages/PerformancePage.tsx">Percentage</TableHead>
                          <TableHead data-id="f227pcwtl" data-path="src/pages/PerformancePage.tsx">Grade</TableHead>
                          <TableHead data-id="7p0mbiig5" data-path="src/pages/PerformancePage.tsx">Term</TableHead>
                          <TableHead data-id="n3vbyp2ya" data-path="src/pages/PerformancePage.tsx">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody data-id="d3xu0d7n9" data-path="src/pages/PerformancePage.tsx">
                        {studentMarks.length > 0 ?
                      studentMarks.map((mark) => {
                        const percentage = mark.score / mark.maxScore * 100;
                        return (
                          <TableRow key={mark.id} data-id="nua6ftiwr" data-path="src/pages/PerformancePage.tsx">
                                <TableCell className="font-medium" data-id="dvf7qjt0y" data-path="src/pages/PerformancePage.tsx">{mark.subject}</TableCell>
                                <TableCell data-id="iszx1qg8v" data-path="src/pages/PerformancePage.tsx">{mark.score}/{mark.maxScore}</TableCell>
                                <TableCell data-id="znrrqumht" data-path="src/pages/PerformancePage.tsx">{percentage.toFixed(1)}%</TableCell>
                                <TableCell data-id="go977zvuv" data-path="src/pages/PerformancePage.tsx">{getGrade(percentage)}</TableCell>
                                <TableCell data-id="cdfh2iteq" data-path="src/pages/PerformancePage.tsx">{mark.term}</TableCell>
                                <TableCell data-id="4t3g0rw27" data-path="src/pages/PerformancePage.tsx">{new Date(mark.date).toLocaleDateString()}</TableCell>
                              </TableRow>);

                      }) :

                      <TableRow data-id="3cj59eqwb" data-path="src/pages/PerformancePage.tsx">
                            <TableCell colSpan={6} className="h-24 text-center" data-id="rueug12a6" data-path="src/pages/PerformancePage.tsx">
                              No marks found for this student.
                            </TableCell>
                          </TableRow>
                      }
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      }
    </div>);

};

export default PerformancePage;