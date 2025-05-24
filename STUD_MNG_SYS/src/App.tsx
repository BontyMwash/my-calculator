import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import MarksPage from "./pages/MarksPage";
import AnalysisPage from "./pages/AnalysisPage";
import UserManagementPage from "./pages/UserManagementPage";
import PerformancePage from "./pages/PerformancePage";
import NotFound from "./pages/NotFound";
import AuthSuccessPage from "./pages/AuthSuccessPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ErrorBoundary from "./pages/ErrorBoundary";
import { StudentProvider } from "./contexts/StudentContext";
import { MarksProvider } from "./contexts/MarksContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: {children: React.ReactNode;}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" data-id="mqab8px04" data-path="src/App.tsx" />;
  }

  return <>{children}</>;
};

// Admin only route component
const AdminRoute = ({ children }: {children: React.ReactNode;}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" data-id="rdduw9etq" data-path="src/App.tsx" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" data-id="u7zmhjnkp" data-path="src/App.tsx" />;
  }

  return <>{children}</>;
};

const App = () =>
<QueryClientProvider client={queryClient} data-id="1zpm8rls0" data-path="src/App.tsx">
    <TooltipProvider data-id="fhqot4u5i" data-path="src/App.tsx">
      <AuthProvider data-id="cb6a8sjqj" data-path="src/App.tsx">
        <StudentProvider data-id="44dyqc8yd" data-path="src/App.tsx">
          <MarksProvider data-id="g70i1x1a3" data-path="src/App.tsx">
            <Toaster data-id="mjmfxmk85" data-path="src/App.tsx" />
            <HashRouter data-id="0odt0dnni" data-path="src/App.tsx">
              <ErrorBoundary data-id="41li61dsm" data-path="src/App.tsx">
                <Routes data-id="wmsxtxzlz" data-path="src/App.tsx">
                <Route path="/" element={<HomePage data-id="agvcdlri9" data-path="src/App.tsx" />} data-id="ufq73a8o9" data-path="src/App.tsx" />
                <Route path="/login" element={<LoginPage data-id="0csxhzai5" data-path="src/App.tsx" />} data-id="mzkfx1syg" data-path="src/App.tsx" />
                <Route path="/onauthsuccess" element={<AuthSuccessPage data-id="m3ht4cnhh" data-path="src/App.tsx" />} data-id="hyqqc2wbg" data-path="src/App.tsx" />
                <Route path="/resetpassword" element={<ResetPasswordPage data-id="3jvvmmi2l" data-path="src/App.tsx" />} data-id="zn2btub80" data-path="src/App.tsx" />
                
                {/* Dashboard routes */}
                <Route path="/dashboard" element={
                <ProtectedRoute data-id="jglge603x" data-path="src/App.tsx">
                    <DashboardLayout data-id="jq7j5jmwo" data-path="src/App.tsx" />
                  </ProtectedRoute>
                } data-id="420s8lb3t" data-path="src/App.tsx">
                  <Route index element={<DashboardPage data-id="kayn6av94" data-path="src/App.tsx" />} data-id="kwobis4vb" data-path="src/App.tsx" />
                  <Route path="students" element={<StudentsPage data-id="mae6nc6n4" data-path="src/App.tsx" />} data-id="ur2h7h5hu" data-path="src/App.tsx" />
                  <Route path="marks" element={<MarksPage data-id="l01hi984x" data-path="src/App.tsx" />} data-id="xez95t4o3" data-path="src/App.tsx" />
                  <Route path="analysis" element={<AnalysisPage data-id="2si2hwvsx" data-path="src/App.tsx" />} data-id="g1q7afha4" data-path="src/App.tsx" />
                  <Route path="performance" element={<PerformancePage data-id="w9hcfhz99" data-path="src/App.tsx" />} data-id="qadzqfv96" data-path="src/App.tsx" />
                  <Route path="users" element={
                  <AdminRoute data-id="ppz1q0thd" data-path="src/App.tsx">
                      <UserManagementPage data-id="3x14qzj8i" data-path="src/App.tsx" />
                    </AdminRoute>
                  } data-id="bn52oi4te" data-path="src/App.tsx" />
                </Route>
                
                <Route path="*" element={<NotFound data-id="hmd8uz82z" data-path="src/App.tsx" />} data-id="jctnlfzg0" data-path="src/App.tsx" />
                </Routes>
              </ErrorBoundary>
            </HashRouter>
          </MarksProvider>
        </StudentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>;



export default App;