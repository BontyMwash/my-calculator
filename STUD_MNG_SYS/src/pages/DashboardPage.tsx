import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useStudents } from '@/contexts/StudentContext';
import { useMarks } from '@/contexts/MarksContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, TrendingUp, Award, RefreshCw, ClipboardList, BarChart } from 'lucide-react';
import { initializeAllData } from '@/utils/initializeData';
import { useToast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const { students, forms, streams, loading: studentsLoading } = useStudents();
  const { marks, subjects, getClassAverage, loading: marksLoading } = useMarks();
  const { toast } = useToast();

  const loading = studentsLoading || marksLoading;
  const totalStudents = students.length;
  const totalMarks = marks.length;
  const classAverage = getClassAverage();
  const totalSubjects = subjects.length;
  const totalForms = forms.length;
  const totalStreams = streams.length;

  const handleInitializeData = async () => {
    try {
      await initializeAllData();
      toast({
        title: 'Data Initialized',
        description: 'School forms, streams, and subjects have been set up successfully.'
      });
      // Refresh the page to load new data
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Initialization Failed',
        description: 'Failed to initialize school data. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" data-id="cha5bj9cv" data-path="src/pages/DashboardPage.tsx">
        <div className="text-center space-y-4" data-id="9xepfbv27" data-path="src/pages/DashboardPage.tsx">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" data-id="yqfr6kbwk" data-path="src/pages/DashboardPage.tsx" />
          <p className="text-gray-600" data-id="5ynpp07w9" data-path="src/pages/DashboardPage.tsx">Loading dashboard...</p>
        </div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="lrk0lo8vh" data-path="src/pages/DashboardPage.tsx">
      <div className="flex items-center justify-between" data-id="jqe28ui4r" data-path="src/pages/DashboardPage.tsx">
        <div data-id="z4yotix2w" data-path="src/pages/DashboardPage.tsx">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" data-id="3foco0pg6" data-path="src/pages/DashboardPage.tsx">
            School Management Dashboard
          </h1>
          <p className="text-muted-foreground mt-1" data-id="e7jr8yuc1" data-path="src/pages/DashboardPage.tsx">
            Welcome back, {user?.Name || 'User'}!
          </p>
        </div>
        {totalForms === 0 &&
        <Button onClick={handleInitializeData} className="bg-blue-600 hover:bg-blue-700" data-id="gvvajl1ay" data-path="src/pages/DashboardPage.tsx">
            Initialize School Data
          </Button>
        }
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-id="vz84dluo6" data-path="src/pages/DashboardPage.tsx">
        <Card className="border-l-4 border-l-blue-500" data-id="c49a1tt25" data-path="src/pages/DashboardPage.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="vpwyfprlx" data-path="src/pages/DashboardPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="yzioxqiev" data-path="src/pages/DashboardPage.tsx">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" data-id="4w76eh8qe" data-path="src/pages/DashboardPage.tsx" />
          </CardHeader>
          <CardContent data-id="lxq0m0ohe" data-path="src/pages/DashboardPage.tsx">
            <div className="text-2xl font-bold" data-id="w8g54rg22" data-path="src/pages/DashboardPage.tsx">{totalStudents}</div>
            <p className="text-xs text-muted-foreground" data-id="55aix1ddr" data-path="src/pages/DashboardPage.tsx">
              Enrolled across {totalForms} forms
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500" data-id="20xbyke4i" data-path="src/pages/DashboardPage.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="wbv4eymkp" data-path="src/pages/DashboardPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="nunu6kkjo" data-path="src/pages/DashboardPage.tsx">
              Subjects
            </CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" data-id="vb1or1hpt" data-path="src/pages/DashboardPage.tsx" />
          </CardHeader>
          <CardContent data-id="i9q17e9l7" data-path="src/pages/DashboardPage.tsx">
            <div className="text-2xl font-bold" data-id="g9kkkxkh2" data-path="src/pages/DashboardPage.tsx">{totalSubjects}</div>
            <p className="text-xs text-muted-foreground" data-id="7sfnh1nfk" data-path="src/pages/DashboardPage.tsx">
              Including electives
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500" data-id="d79lqav1x" data-path="src/pages/DashboardPage.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="1arl8k0h3" data-path="src/pages/DashboardPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="yu2o8rqlu" data-path="src/pages/DashboardPage.tsx">
              Class Average
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" data-id="72990ity3" data-path="src/pages/DashboardPage.tsx" />
          </CardHeader>
          <CardContent data-id="rsd3gkfgt" data-path="src/pages/DashboardPage.tsx">
            <div className="text-2xl font-bold" data-id="io44jeqqi" data-path="src/pages/DashboardPage.tsx">{classAverage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground" data-id="ku8p7sbn6" data-path="src/pages/DashboardPage.tsx">
              Overall performance
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500" data-id="cqtax3nas" data-path="src/pages/DashboardPage.tsx">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" data-id="vcstt9mbv" data-path="src/pages/DashboardPage.tsx">
            <CardTitle className="text-sm font-medium" data-id="o60bycs0b" data-path="src/pages/DashboardPage.tsx">
              Total Assessments
            </CardTitle>
            <Award className="h-4 w-4 text-purple-600" data-id="ge6ea3y38" data-path="src/pages/DashboardPage.tsx" />
          </CardHeader>
          <CardContent data-id="6uo65jp04" data-path="src/pages/DashboardPage.tsx">
            <div className="text-2xl font-bold" data-id="epuyjnu58" data-path="src/pages/DashboardPage.tsx">{totalMarks}</div>
            <p className="text-xs text-muted-foreground" data-id="ct68wv18m" data-path="src/pages/DashboardPage.tsx">
              Recorded marks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-id="k9hznp7b5" data-path="src/pages/DashboardPage.tsx">
        <Card data-id="i74he9ybe" data-path="src/pages/DashboardPage.tsx">
          <CardHeader data-id="aruopx4fm" data-path="src/pages/DashboardPage.tsx">
            <CardTitle className="text-blue-700" data-id="2r8impfa8" data-path="src/pages/DashboardPage.tsx">Forms & Streams</CardTitle>
            <CardDescription data-id="a3tuu7hbb" data-path="src/pages/DashboardPage.tsx">School organizational structure</CardDescription>
          </CardHeader>
          <CardContent data-id="hhy4fzit6" data-path="src/pages/DashboardPage.tsx">
            <div className="space-y-2" data-id="hqcojvhi6" data-path="src/pages/DashboardPage.tsx">
              <div className="flex justify-between" data-id="bw0v4f5tq" data-path="src/pages/DashboardPage.tsx">
                <span className="text-sm font-medium" data-id="ye7dhqggw" data-path="src/pages/DashboardPage.tsx">Forms:</span>
                <span className="text-sm" data-id="ax26xmhof" data-path="src/pages/DashboardPage.tsx">{totalForms}</span>
              </div>
              <div className="flex justify-between" data-id="gzzci3i4r" data-path="src/pages/DashboardPage.tsx">
                <span className="text-sm font-medium" data-id="0y4einjjf" data-path="src/pages/DashboardPage.tsx">Streams:</span>
                <span className="text-sm" data-id="ag03nkhv4" data-path="src/pages/DashboardPage.tsx">{totalStreams}</span>
              </div>
              {forms.map((form) =>
              <div key={form.ID} className="text-xs text-muted-foreground ml-2" data-id="k8as4mipt" data-path="src/pages/DashboardPage.tsx">
                  {form.name}: {streams.filter((s) => s.form_id === form.ID).length} streams
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card data-id="zd5o255vj" data-path="src/pages/DashboardPage.tsx">
          <CardHeader data-id="8cw2hdy3q" data-path="src/pages/DashboardPage.tsx">
            <CardTitle className="text-green-700" data-id="k584qttuc" data-path="src/pages/DashboardPage.tsx">Subject Distribution</CardTitle>
            <CardDescription data-id="riuuuv9b9" data-path="src/pages/DashboardPage.tsx">Core and elective subjects</CardDescription>
          </CardHeader>
          <CardContent data-id="nu9vjk0pn" data-path="src/pages/DashboardPage.tsx">
            <div className="space-y-2" data-id="35j5g7b4c" data-path="src/pages/DashboardPage.tsx">
              <div className="flex justify-between" data-id="r2angegsx" data-path="src/pages/DashboardPage.tsx">
                <span className="text-sm font-medium" data-id="s6xfdg6aa" data-path="src/pages/DashboardPage.tsx">Core Subjects:</span>
                <span className="text-sm" data-id="uy7i1a9s3" data-path="src/pages/DashboardPage.tsx">{subjects.filter((s) => !s.is_elective).length}</span>
              </div>
              <div className="flex justify-between" data-id="j6qs79v4e" data-path="src/pages/DashboardPage.tsx">
                <span className="text-sm font-medium" data-id="cvcl3qe3b" data-path="src/pages/DashboardPage.tsx">Electives:</span>
                <span className="text-sm" data-id="2zsdifzva" data-path="src/pages/DashboardPage.tsx">{subjects.filter((s) => s.is_elective).length}</span>
              </div>
              <div className="text-xs text-muted-foreground" data-id="42ye2o634" data-path="src/pages/DashboardPage.tsx">
                Elective groups: Sciences, Social Studies, Practical, Languages
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="vmiis3tod" data-path="src/pages/DashboardPage.tsx">
          <CardHeader data-id="33o30i7tg" data-path="src/pages/DashboardPage.tsx">
            <CardTitle className="text-purple-700" data-id="0was78li0" data-path="src/pages/DashboardPage.tsx">Quick Actions</CardTitle>
            <CardDescription data-id="dx8052uvj" data-path="src/pages/DashboardPage.tsx">Common tasks</CardDescription>
          </CardHeader>
          <CardContent data-id="b5q7g7f86" data-path="src/pages/DashboardPage.tsx">
            <div className="grid grid-cols-2 gap-2" data-id="ux5gx3gus" data-path="src/pages/DashboardPage.tsx">
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col h-16 w-full"
                onClick={() => window.location.href = '/dashboard/students'} data-id="4na8nzndw" data-path="src/pages/DashboardPage.tsx">

                <Users className="h-4 w-4 mb-1" data-id="d8nlvbjku" data-path="src/pages/DashboardPage.tsx" />
                <span className="text-xs" data-id="gmt3pakbt" data-path="src/pages/DashboardPage.tsx">Students</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col h-16 w-full"
                onClick={() => window.location.href = '/dashboard/marks'} data-id="yxla7w8ba" data-path="src/pages/DashboardPage.tsx">

                <ClipboardList className="h-4 w-4 mb-1" data-id="1e01zt64y" data-path="src/pages/DashboardPage.tsx" />
                <span className="text-xs" data-id="thqgzs0af" data-path="src/pages/DashboardPage.tsx">Marks</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col h-16 w-full"
                onClick={() => window.location.href = '/dashboard/analysis'} data-id="vrhopvcq9" data-path="src/pages/DashboardPage.tsx">

                <BarChart className="h-4 w-4 mb-1" data-id="x5p91edze" data-path="src/pages/DashboardPage.tsx" />
                <span className="text-xs" data-id="88dpv74i3" data-path="src/pages/DashboardPage.tsx">Analysis</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col h-16 w-full"
                onClick={() => window.location.href = '/dashboard/performance'} data-id="0c7z12643" data-path="src/pages/DashboardPage.tsx">

                <Award className="h-4 w-4 mb-1" data-id="36yi9vkri" data-path="src/pages/DashboardPage.tsx" />
                <span className="text-xs" data-id="85ttc0cal" data-path="src/pages/DashboardPage.tsx">Performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default DashboardPage;