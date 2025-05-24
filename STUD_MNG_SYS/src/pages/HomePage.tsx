import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col" data-id="dgktn0elg" data-path="src/pages/HomePage.tsx">
      <header className="py-6 px-8 border-b bg-white" data-id="5b6rjkmz2" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto flex justify-between items-center" data-id="jr3p8bvi1" data-path="src/pages/HomePage.tsx">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="a30170brk" data-path="src/pages/HomePage.tsx">
            Student Management System
          </h1>
          <nav className="space-x-4" data-id="qws1kzf17" data-path="src/pages/HomePage.tsx">
            <Button variant="link" asChild data-id="zoyx2x7im" data-path="src/pages/HomePage.tsx">
              <Link to="/" data-id="zhpmb6n7s" data-path="src/pages/HomePage.tsx">Home</Link>
            </Button>
            {isAuthenticated ?
            <Button variant="default" asChild data-id="ilucb5bus" data-path="src/pages/HomePage.tsx">
                <Link to="/dashboard" data-id="yo4fq8dzl" data-path="src/pages/HomePage.tsx">Dashboard</Link>
              </Button> :

            <Button variant="default" asChild data-id="nv7sig5rs" data-path="src/pages/HomePage.tsx">
                <Link to="/login" data-id="sf1zcfb1e" data-path="src/pages/HomePage.tsx">Login</Link>
              </Button>
            }
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4 flex flex-col items-center justify-center" data-id="7g1zw4qx6" data-path="src/pages/HomePage.tsx">
        <section className="text-center max-w-3xl mx-auto" data-id="6lmp43hkv" data-path="src/pages/HomePage.tsx">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="c8f8n0pjg" data-path="src/pages/HomePage.tsx">
            Student Management System
          </h2>
          <p className="text-xl text-gray-600 mb-8" data-id="z64y912ij" data-path="src/pages/HomePage.tsx">
            A comprehensive platform for managing students, tracking performance, and analyzing academic progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="nqd3unimg" data-path="src/pages/HomePage.tsx">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => navigate('/login')} data-id="jrkxpnmwz" data-path="src/pages/HomePage.tsx">

              Get Started
            </Button>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mt-16" data-id="6dgd7gwbe" data-path="src/pages/HomePage.tsx">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-id="xsf5qocpv" data-path="src/pages/HomePage.tsx">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4" data-id="ulbjmvfei" data-path="src/pages/HomePage.tsx">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id="07igm33y2" data-path="src/pages/HomePage.tsx">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-id="bfrizuc7j" data-path="src/pages/HomePage.tsx" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" data-id="dapt5yls3" data-path="src/pages/HomePage.tsx">Student Management</h3>
            <p className="text-gray-600" data-id="jsavp0t3y" data-path="src/pages/HomePage.tsx">Add, update, and manage student information in a centralized database.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-id="c4vvwtmmn" data-path="src/pages/HomePage.tsx">
            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4" data-id="uhvm01m0c" data-path="src/pages/HomePage.tsx">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id="l7s627p3y" data-path="src/pages/HomePage.tsx">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-id="9ht4fxfo7" data-path="src/pages/HomePage.tsx" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" data-id="yg1z1sc34" data-path="src/pages/HomePage.tsx">Performance Tracking</h3>
            <p className="text-gray-600" data-id="zhy1v9iv3" data-path="src/pages/HomePage.tsx">Record and monitor student marks across subjects and academic terms.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all" data-id="odwgl06hw" data-path="src/pages/HomePage.tsx">
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4" data-id="bwl5a6jgf" data-path="src/pages/HomePage.tsx">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id="ja70eufu4" data-path="src/pages/HomePage.tsx">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-id="6kryw6al1" data-path="src/pages/HomePage.tsx" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" data-id="ah673wud0" data-path="src/pages/HomePage.tsx">Analytical Insights</h3>
            <p className="text-gray-600" data-id="d5qipwi1l" data-path="src/pages/HomePage.tsx">Gain valuable insights with detailed analytics and performance reports.</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-white" data-id="pt51h4omo" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4 text-center text-gray-500" data-id="oao66qxen" data-path="src/pages/HomePage.tsx">
          <p data-id="4910afdat" data-path="src/pages/HomePage.tsx">© {new Date().getFullYear()} Student Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>);

};

export default HomePage;