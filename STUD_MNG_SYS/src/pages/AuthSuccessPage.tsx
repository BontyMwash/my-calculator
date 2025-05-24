import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AuthSuccessPage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4" data-id="7rgg7y6dz" data-path="src/pages/AuthSuccessPage.tsx">
      <Card className="w-full max-w-md shadow-xl" data-id="9rckxa6a7" data-path="src/pages/AuthSuccessPage.tsx">
        <CardHeader className="text-center space-y-4" data-id="s0mtov5vm" data-path="src/pages/AuthSuccessPage.tsx">
          <div className="flex justify-center" data-id="0q8r9l6li" data-path="src/pages/AuthSuccessPage.tsx">
            <CheckCircle className="h-16 w-16 text-green-500" data-id="rvfj5b4ha" data-path="src/pages/AuthSuccessPage.tsx" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700" data-id="nnph8yuzx" data-path="src/pages/AuthSuccessPage.tsx">
            Email Verified Successfully!
          </CardTitle>
          <CardDescription className="text-gray-600" data-id="86tl0jmdq" data-path="src/pages/AuthSuccessPage.tsx">
            Your account has been verified successfully. You can now log in to the school management system.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4" data-id="y2rta7j4f" data-path="src/pages/AuthSuccessPage.tsx">
          <p className="text-sm text-gray-500" data-id="y0yzf5n7s" data-path="src/pages/AuthSuccessPage.tsx">
            Redirecting to login page in {countdown} seconds...
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" data-id="7lk7wxint" data-path="src/pages/AuthSuccessPage.tsx">

            Go to Login Now
          </Button>
        </CardContent>
      </Card>
    </div>);

};

export default AuthSuccessPage;