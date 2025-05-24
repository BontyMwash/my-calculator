import { useState, useEffect } from 'react';
import { useStudents } from '@/contexts/StudentContext';
import { useMarks } from '@/contexts/MarksContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Chart } from '@/components/ui/chart-wrapper';

const TERMS = ['Term 1', 'Term 2', 'Term 3'];

const AnalysisPage = () => {
  const { students, forms, streams, loading: studentsLoading } = useStudents();
  const {
    marks,
    subjects,
    getElectiveGroups,
    getSubjectsByGroup,
    getElectiveSubjects,
    loading: marksLoading
  } = useMarks();

  const [subjectFilter, setSubjectFilter] = useState('');
  const [termFilter, setTermFilter] = useState('');
  const [formFilter, setFormFilter] = useState('');
  const [electiveGroupFilter, setElectiveGroupFilter] = useState('');

  // Data for charts
  const [subjectsData, setSubjectsData] = useState<any>(null);
  const [electivesData, setElectivesData] = useState<any>(null);
  const [formsData, setFormsData] = useState<any>(null);
  const [electiveGroupsData, setElectiveGroupsData] = useState<any>(null);

  const loading = studentsLoading || marksLoading;

  // Calculate data for charts
  useEffect(() => {
    if (loading) return;

    // Subject performance analysis
    const subjectScores = subjects.map((subject) => {
      const subjectMarks = marks.filter((mark) =>
      mark.subject_id === subject.ID && (
      termFilter === '' || mark.term === termFilter) && (
      formFilter === '' || (() => {
        const student = students.find((s) => s.ID === mark.student_id);
        return student?.form_id.toString() === formFilter;
      })())
      );

      if (subjectMarks.length === 0) return { subject: subject.name, average: 0, isElective: subject.is_elective };

      const average = subjectMarks.reduce((sum, mark) => sum + mark.score / mark.max_score * 100, 0) / subjectMarks.length;
      return { subject: subject.name, average, isElective: subject.is_elective };
    }).filter((item) => item.average > 0);

    subjectScores.sort((a, b) => b.average - a.average);

    setSubjectsData({
      labels: subjectScores.map((item) => item.subject),
      datasets: [
      {
        label: 'Average Score (%)',
        data: subjectScores.map((item) => item.average.toFixed(1)),
        backgroundColor: subjectScores.map((item) =>
        item.isElective ? 'rgba(139, 92, 246, 0.6)' : 'rgba(59, 130, 246, 0.6)'
        ),
        borderColor: subjectScores.map((item) =>
        item.isElective ? 'rgba(139, 92, 246, 1)' : 'rgba(59, 130, 246, 1)'
        ),
        borderWidth: 1
      }]

    });

    // Elective subjects analysis
    const electiveSubjects = getElectiveSubjects();
    const electiveScores = electiveSubjects.map((subject) => {
      const subjectMarks = marks.filter((mark) =>
      mark.subject_id === subject.ID && (
      termFilter === '' || mark.term === termFilter)
      );

      if (subjectMarks.length === 0) return { subject: subject.name, average: 0, group: subject.elective_group };

      const average = subjectMarks.reduce((sum, mark) => sum + mark.score / mark.max_score * 100, 0) / subjectMarks.length;
      return { subject: subject.name, average, group: subject.elective_group };
    }).filter((item) => item.average > 0);

    electiveScores.sort((a, b) => b.average - a.average);

    setElectivesData({
      labels: electiveScores.map((item) => item.subject),
      datasets: [
      {
        label: 'Average Score (%)',
        data: electiveScores.map((item) => item.average.toFixed(1)),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1
      }]

    });

    // Forms performance analysis
    const formScores = forms.map((form) => {
      const formStudents = students.filter((s) => s.form_id === form.ID);
      const formStudentIds = formStudents.map((s) => s.ID);
      const formMarks = marks.filter((mark) =>
      formStudentIds.includes(mark.student_id) && (
      termFilter === '' || mark.term === termFilter) && (
      subjectFilter === '' || mark.subject_id.toString() === subjectFilter)
      );

      if (formMarks.length === 0) return { form: form.name, average: 0, count: formStudents.length };

      const average = formMarks.reduce((sum, mark) => sum + mark.score / mark.max_score * 100, 0) / formMarks.length;
      return { form: form.name, average, count: formStudents.length };
    }).filter((item) => item.average > 0);

    setFormsData({
      labels: formScores.map((item) => item.form),
      datasets: [
      {
        label: 'Average Score (%)',
        data: formScores.map((item) => item.average.toFixed(1)),
        backgroundColor: 'rgba(245, 158, 11, 0.6)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1
      }]

    });

    // Elective groups analysis
    const electiveGroups = getElectiveGroups();
    const groupScores = electiveGroups.map((group) => {
      const groupSubjects = getSubjectsByGroup(group);
      const groupSubjectIds = groupSubjects.map((s) => s.ID);
      const groupMarks = marks.filter((mark) =>
      groupSubjectIds.includes(mark.subject_id) && (
      termFilter === '' || mark.term === termFilter)
      );

      if (groupMarks.length === 0) return { group, average: 0, subjectCount: groupSubjects.length };

      const average = groupMarks.reduce((sum, mark) => sum + mark.score / mark.max_score * 100, 0) / groupMarks.length;
      return { group, average, subjectCount: groupSubjects.length };
    }).filter((item) => item.average > 0);

    setElectiveGroupsData({
      labels: groupScores.map((item) => item.group),
      datasets: [
      {
        label: 'Average Score (%)',
        data: groupScores.map((item) => item.average.toFixed(1)),
        backgroundColor: [
        'rgba(239, 68, 68, 0.6)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(168, 85, 247, 0.6)',
        'rgba(6, 182, 212, 0.6)'],

        borderColor: [
        'rgba(239, 68, 68, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(6, 182, 212, 1)'],

        borderWidth: 1
      }]

    });

  }, [marks, students, subjects, forms, subjectFilter, termFilter, formFilter, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" data-id="yybyw4fo4" data-path="src/pages/AnalysisPage.tsx">
        <div className="text-center space-y-4" data-id="sstyw2sgt" data-path="src/pages/AnalysisPage.tsx">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-blue-600 border-t-transparent rounded-full" data-id="2nj2gvc6b" data-path="src/pages/AnalysisPage.tsx"></div>
          <p className="text-gray-600" data-id="bmttq1isa" data-path="src/pages/AnalysisPage.tsx">Loading analysis...</p>
        </div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="1p3dynorr" data-path="src/pages/AnalysisPage.tsx">
      <div data-id="x85rln0pn" data-path="src/pages/AnalysisPage.tsx">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" data-id="fbxbh4eh1" data-path="src/pages/AnalysisPage.tsx">
          Performance Analysis
        </h2>
        <p className="text-muted-foreground mt-1" data-id="m1cfofxc6" data-path="src/pages/AnalysisPage.tsx">
          Comprehensive analysis of student performance across subjects, forms, and electives
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="txk94sh5h" data-path="src/pages/AnalysisPage.tsx">
        <div data-id="zybqwamjo" data-path="src/pages/AnalysisPage.tsx">
          <Label data-id="o6273d3fe" data-path="src/pages/AnalysisPage.tsx">Filter by Subject</Label>
          <Select value={subjectFilter} onValueChange={setSubjectFilter} data-id="9qm040vwc" data-path="src/pages/AnalysisPage.tsx">
            <SelectTrigger data-id="fj1pvk788" data-path="src/pages/AnalysisPage.tsx">
              <SelectValue placeholder="All Subjects" data-id="uhwc7wrn7" data-path="src/pages/AnalysisPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="t325t7mbl" data-path="src/pages/AnalysisPage.tsx">
              <SelectItem value="" data-id="da7hv7uj3" data-path="src/pages/AnalysisPage.tsx">All Subjects</SelectItem>
              {subjects.map((subject) =>
              <SelectItem key={subject.ID} value={subject.ID.toString()} data-id="89lgqkhv4" data-path="src/pages/AnalysisPage.tsx">
                  {subject.name}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div data-id="ug48687mv" data-path="src/pages/AnalysisPage.tsx">
          <Label data-id="lwsahhdsf" data-path="src/pages/AnalysisPage.tsx">Filter by Term</Label>
          <Select value={termFilter} onValueChange={setTermFilter} data-id="8lzceoqfr" data-path="src/pages/AnalysisPage.tsx">
            <SelectTrigger data-id="udk76sazt" data-path="src/pages/AnalysisPage.tsx">
              <SelectValue placeholder="All Terms" data-id="0gga10pwt" data-path="src/pages/AnalysisPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="6ckfw9nt0" data-path="src/pages/AnalysisPage.tsx">
              <SelectItem value="" data-id="9aa948yxt" data-path="src/pages/AnalysisPage.tsx">All Terms</SelectItem>
              {TERMS.map((term) =>
              <SelectItem key={term} value={term} data-id="c6nc125qo" data-path="src/pages/AnalysisPage.tsx">
                  {term}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div data-id="p2b223bm1" data-path="src/pages/AnalysisPage.tsx">
          <Label data-id="84u9fchi7" data-path="src/pages/AnalysisPage.tsx">Filter by Form</Label>
          <Select value={formFilter} onValueChange={setFormFilter} data-id="y52a1ulfp" data-path="src/pages/AnalysisPage.tsx">
            <SelectTrigger data-id="5plubhc48" data-path="src/pages/AnalysisPage.tsx">
              <SelectValue placeholder="All Forms" data-id="e3ei17trg" data-path="src/pages/AnalysisPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="ip5fx579g" data-path="src/pages/AnalysisPage.tsx">
              <SelectItem value="" data-id="qubp6f012" data-path="src/pages/AnalysisPage.tsx">All Forms</SelectItem>
              {forms.map((form) =>
              <SelectItem key={form.ID} value={form.ID.toString()} data-id="wwusp6j7w" data-path="src/pages/AnalysisPage.tsx">
                  {form.name}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div data-id="6842ab7y2" data-path="src/pages/AnalysisPage.tsx">
          <Label data-id="xl75r2nkq" data-path="src/pages/AnalysisPage.tsx">Elective Group</Label>
          <Select value={electiveGroupFilter} onValueChange={setElectiveGroupFilter} data-id="29904oleq" data-path="src/pages/AnalysisPage.tsx">
            <SelectTrigger data-id="mrrjqy39e" data-path="src/pages/AnalysisPage.tsx">
              <SelectValue placeholder="All Groups" data-id="wkh13rqti" data-path="src/pages/AnalysisPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="ansjetavy" data-path="src/pages/AnalysisPage.tsx">
              <SelectItem value="" data-id="kkcj1bak7" data-path="src/pages/AnalysisPage.tsx">All Groups</SelectItem>
              {getElectiveGroups().map((group) =>
              <SelectItem key={group} value={group} data-id="px06h58bt" data-path="src/pages/AnalysisPage.tsx">
                  {group}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="subjects" className="w-full" data-id="8nauutuzt" data-path="src/pages/AnalysisPage.tsx">
        <TabsList className="grid w-full grid-cols-4" data-id="z923inlb8" data-path="src/pages/AnalysisPage.tsx">
          <TabsTrigger value="subjects" data-id="z4qzywcfx" data-path="src/pages/AnalysisPage.tsx">Subject Analysis</TabsTrigger>
          <TabsTrigger value="electives" data-id="7lqed5o0b" data-path="src/pages/AnalysisPage.tsx">Elective Analysis</TabsTrigger>
          <TabsTrigger value="forms" data-id="og3ny2lfe" data-path="src/pages/AnalysisPage.tsx">Form Comparison</TabsTrigger>
          <TabsTrigger value="elective-groups" data-id="gewh4ikz3" data-path="src/pages/AnalysisPage.tsx">Elective Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subjects" data-id="vwjoicy0s" data-path="src/pages/AnalysisPage.tsx">
          <Card data-id="oea8uy7qn" data-path="src/pages/AnalysisPage.tsx">
            <CardHeader data-id="gmivq3w14" data-path="src/pages/AnalysisPage.tsx">
              <CardTitle data-id="sf8ei3qrv" data-path="src/pages/AnalysisPage.tsx">Subject Performance Analysis</CardTitle>
              <CardDescription data-id="pkayx6g8k" data-path="src/pages/AnalysisPage.tsx">
                Average performance across all subjects (Core subjects in blue, Electives in purple)
              </CardDescription>
            </CardHeader>
            <CardContent data-id="smoo9htbe" data-path="src/pages/AnalysisPage.tsx">
              {subjectsData && subjectsData.labels.length > 0 ?
              <div className="h-[400px]" data-id="eropzzruu" data-path="src/pages/AnalysisPage.tsx">
                  <Chart
                  type="bar"
                  data={subjectsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Average Score (%)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Subjects'
                        }
                      }
                    }
                  }} data-id="yp4u5sm45" data-path="src/pages/AnalysisPage.tsx" />

                </div> :

              <div className="h-[400px] flex items-center justify-center" data-id="g5l9podrq" data-path="src/pages/AnalysisPage.tsx">
                  <p className="text-muted-foreground" data-id="ys97qxdpf" data-path="src/pages/AnalysisPage.tsx">No data available for the selected filters.</p>
                </div>
              }
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="electives" data-id="4y074j2mz" data-path="src/pages/AnalysisPage.tsx">
          <Card data-id="0vc8dhe6t" data-path="src/pages/AnalysisPage.tsx">
            <CardHeader data-id="a0jl3e2c3" data-path="src/pages/AnalysisPage.tsx">
              <CardTitle data-id="wnbtxypmo" data-path="src/pages/AnalysisPage.tsx">Elective Subjects Performance</CardTitle>
              <CardDescription data-id="oklbfng64" data-path="src/pages/AnalysisPage.tsx">
                Performance analysis for elective subjects only
              </CardDescription>
            </CardHeader>
            <CardContent data-id="x6bwblqcf" data-path="src/pages/AnalysisPage.tsx">
              {electivesData && electivesData.labels.length > 0 ?
              <div className="h-[400px]" data-id="wq5hh352j" data-path="src/pages/AnalysisPage.tsx">
                  <Chart
                  type="bar"
                  data={electivesData}
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
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Elective Subjects'
                        }
                      }
                    }
                  }} data-id="e92c1hd31" data-path="src/pages/AnalysisPage.tsx" />

                </div> :

              <div className="h-[400px] flex items-center justify-center" data-id="sxwj1341c" data-path="src/pages/AnalysisPage.tsx">
                  <p className="text-muted-foreground" data-id="fm1jwrsoe" data-path="src/pages/AnalysisPage.tsx">No elective subject data available.</p>
                </div>
              }
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forms" data-id="wt8v4btyy" data-path="src/pages/AnalysisPage.tsx">
          <Card data-id="6j3vzu2cj" data-path="src/pages/AnalysisPage.tsx">
            <CardHeader data-id="9tf5b2fx1" data-path="src/pages/AnalysisPage.tsx">
              <CardTitle data-id="8hrlezgg0" data-path="src/pages/AnalysisPage.tsx">Performance by Form</CardTitle>
              <CardDescription data-id="gcp74ou7d" data-path="src/pages/AnalysisPage.tsx">
                Comparison of average performance across different forms
              </CardDescription>
            </CardHeader>
            <CardContent data-id="znbh06hlh" data-path="src/pages/AnalysisPage.tsx">
              {formsData && formsData.labels.length > 0 ?
              <div className="h-[400px]" data-id="7qkscpnn8" data-path="src/pages/AnalysisPage.tsx">
                  <Chart
                  type="bar"
                  data={formsData}
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
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Forms'
                        }
                      }
                    }
                  }} data-id="66t32bvwj" data-path="src/pages/AnalysisPage.tsx" />

                </div> :

              <div className="h-[400px] flex items-center justify-center" data-id="cd811zmvo" data-path="src/pages/AnalysisPage.tsx">
                  <p className="text-muted-foreground" data-id="9stb60lrq" data-path="src/pages/AnalysisPage.tsx">No form data available.</p>
                </div>
              }
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="elective-groups" data-id="vyudt5c9t" data-path="src/pages/AnalysisPage.tsx">
          <Card data-id="f97c5826l" data-path="src/pages/AnalysisPage.tsx">
            <CardHeader data-id="wn9b6thcv" data-path="src/pages/AnalysisPage.tsx">
              <CardTitle data-id="bedo13640" data-path="src/pages/AnalysisPage.tsx">Elective Groups Performance</CardTitle>
              <CardDescription data-id="a069h3mtx" data-path="src/pages/AnalysisPage.tsx">
                Performance comparison across different elective subject groups
              </CardDescription>
            </CardHeader>
            <CardContent data-id="myfxry0ak" data-path="src/pages/AnalysisPage.tsx">
              {electiveGroupsData && electiveGroupsData.labels.length > 0 ?
              <div className="h-[400px]" data-id="a27sl8kvf" data-path="src/pages/AnalysisPage.tsx">
                  <Chart
                  type="doughnut"
                  data={electiveGroupsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }} data-id="vjiyfo6xn" data-path="src/pages/AnalysisPage.tsx" />

                </div> :

              <div className="h-[400px] flex items-center justify-center" data-id="rvyr010ex" data-path="src/pages/AnalysisPage.tsx">
                  <p className="text-muted-foreground" data-id="ti78ucz5j" data-path="src/pages/AnalysisPage.tsx">No elective group data available.</p>
                </div>
              }
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" data-id="sc5o600p5" data-path="src/pages/AnalysisPage.tsx">
        <Card data-id="03roxg2r4" data-path="src/pages/AnalysisPage.tsx">
          <CardHeader className="pb-2" data-id="24xt7vs21" data-path="src/pages/AnalysisPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="88s79akkn" data-path="src/pages/AnalysisPage.tsx">Total Students</CardTitle>
          </CardHeader>
          <CardContent data-id="ae5utkdzq" data-path="src/pages/AnalysisPage.tsx">
            <div className="text-2xl font-bold" data-id="i4511hq87" data-path="src/pages/AnalysisPage.tsx">{students.length}</div>
            <p className="text-xs text-muted-foreground" data-id="omgynr8es" data-path="src/pages/AnalysisPage.tsx">Across {forms.length} forms</p>
          </CardContent>
        </Card>
        
        <Card data-id="wxxj2at1f" data-path="src/pages/AnalysisPage.tsx">
          <CardHeader className="pb-2" data-id="dj6jygcxz" data-path="src/pages/AnalysisPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="9r1hhlk4p" data-path="src/pages/AnalysisPage.tsx">Total Subjects</CardTitle>
          </CardHeader>
          <CardContent data-id="5jf43kl0r" data-path="src/pages/AnalysisPage.tsx">
            <div className="text-2xl font-bold" data-id="iu2xjvcdz" data-path="src/pages/AnalysisPage.tsx">{subjects.length}</div>
            <p className="text-xs text-muted-foreground" data-id="mchqzwvud" data-path="src/pages/AnalysisPage.tsx">{getElectiveSubjects().length} electives</p>
          </CardContent>
        </Card>
        
        <Card data-id="6jars9ora" data-path="src/pages/AnalysisPage.tsx">
          <CardHeader className="pb-2" data-id="nuqo9kd5u" data-path="src/pages/AnalysisPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="4auvvohdb" data-path="src/pages/AnalysisPage.tsx">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent data-id="easwnzxgy" data-path="src/pages/AnalysisPage.tsx">
            <div className="text-2xl font-bold" data-id="lyqx1efsj" data-path="src/pages/AnalysisPage.tsx">{marks.length}</div>
            <p className="text-xs text-muted-foreground" data-id="uuc88pys9" data-path="src/pages/AnalysisPage.tsx">Recorded marks</p>
          </CardContent>
        </Card>
        
        <Card data-id="8s18unbnx" data-path="src/pages/AnalysisPage.tsx">
          <CardHeader className="pb-2" data-id="aidt147yn" data-path="src/pages/AnalysisPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="fmqgzkjhk" data-path="src/pages/AnalysisPage.tsx">Average Score</CardTitle>
          </CardHeader>
          <CardContent data-id="7kmsj0ovj" data-path="src/pages/AnalysisPage.tsx">
            <div className="text-2xl font-bold" data-id="gmv2eral6" data-path="src/pages/AnalysisPage.tsx">
              {marks.length > 0 ?
              (marks.reduce((sum, mark) => sum + mark.score / mark.max_score * 100, 0) / marks.length).toFixed(1) + '%' :
              '0%'}
            </div>
            <p className="text-xs text-muted-foreground" data-id="pwl2kzn4k" data-path="src/pages/AnalysisPage.tsx">Overall performance</p>
          </CardContent>
        </Card>
        
        <Card data-id="vxpytd7u5" data-path="src/pages/AnalysisPage.tsx">
          <CardHeader className="pb-2" data-id="jkuv9tgxi" data-path="src/pages/AnalysisPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="ohc614z29" data-path="src/pages/AnalysisPage.tsx">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent data-id="uzzfqwrn8" data-path="src/pages/AnalysisPage.tsx">
            <div className="text-2xl font-bold" data-id="ymr9virrl" data-path="src/pages/AnalysisPage.tsx">
              {marks.length > 0 ?
              (marks.filter((mark) => mark.score / mark.max_score >= 0.5).length / marks.length * 100).toFixed(1) + '%' :
              '0%'}
            </div>
            <p className="text-xs text-muted-foreground" data-id="6pfap9rlj" data-path="src/pages/AnalysisPage.tsx">≥50% threshold</p>
          </CardContent>
        </Card>
      </div>

      {/* Elective Analysis Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="e3i1dkkrc" data-path="src/pages/AnalysisPage.tsx">
        <Card data-id="tvm1z85ev" data-path="src/pages/AnalysisPage.tsx">
          <CardHeader data-id="xg1yo9aop" data-path="src/pages/AnalysisPage.tsx">
            <CardTitle data-id="y6okok0rq" data-path="src/pages/AnalysisPage.tsx">Elective Subject Combinations</CardTitle>
            <CardDescription data-id="48c0vdlip" data-path="src/pages/AnalysisPage.tsx">Most popular elective combinations</CardDescription>
          </CardHeader>
          <CardContent data-id="sr72lofs7" data-path="src/pages/AnalysisPage.tsx">
            <div className="space-y-2" data-id="9cines3u4" data-path="src/pages/AnalysisPage.tsx">
              {getElectiveGroups().map((group) => {
                const groupSubjects = getSubjectsByGroup(group);
                return (
                  <div key={group} className="flex justify-between items-center p-2 bg-gray-50 rounded" data-id="h1j7m21jd" data-path="src/pages/AnalysisPage.tsx">
                    <span className="font-medium" data-id="9bz804vir" data-path="src/pages/AnalysisPage.tsx">{group}</span>
                    <span className="text-sm text-muted-foreground" data-id="pc43z3rna" data-path="src/pages/AnalysisPage.tsx">
                      {groupSubjects.length} subjects
                    </span>
                  </div>);

              })}
            </div>
          </CardContent>
        </Card>

        <Card data-id="z1q3ieefp" data-path="src/pages/AnalysisPage.tsx">
          <CardHeader data-id="ethdu2w8p" data-path="src/pages/AnalysisPage.tsx">
            <CardTitle data-id="txnb2xhkm" data-path="src/pages/AnalysisPage.tsx">Performance Trends</CardTitle>
            <CardDescription data-id="mqj9wcb0w" data-path="src/pages/AnalysisPage.tsx">Key insights from the data</CardDescription>
          </CardHeader>
          <CardContent data-id="sqtkrtf5c" data-path="src/pages/AnalysisPage.tsx">
            <div className="space-y-3" data-id="92bs1chwa" data-path="src/pages/AnalysisPage.tsx">
              <div className="flex items-center justify-between" data-id="93g6egz0e" data-path="src/pages/AnalysisPage.tsx">
                <span className="text-sm" data-id="a5gz9zcm0" data-path="src/pages/AnalysisPage.tsx">Best Performing Form:</span>
                <span className="font-medium" data-id="wmnym8b5u" data-path="src/pages/AnalysisPage.tsx">
                  {forms.length > 0 ? forms[0]?.name : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between" data-id="yuvm5r117" data-path="src/pages/AnalysisPage.tsx">
                <span className="text-sm" data-id="vnpyyn16r" data-path="src/pages/AnalysisPage.tsx">Most Popular Elective Group:</span>
                <span className="font-medium" data-id="46hvzsyyn" data-path="src/pages/AnalysisPage.tsx">
                  {getElectiveGroups().length > 0 ? getElectiveGroups()[0] : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between" data-id="q0avo86qw" data-path="src/pages/AnalysisPage.tsx">
                <span className="text-sm" data-id="tp0ehvg7n" data-path="src/pages/AnalysisPage.tsx">Total Elective Groups:</span>
                <span className="font-medium" data-id="lznw6ve7b" data-path="src/pages/AnalysisPage.tsx">{getElectiveGroups().length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default AnalysisPage;