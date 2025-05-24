import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast({
        title: 'Invalid Reset Link',
        description: 'The password reset link is invalid or has expired.',
        variant: 'destructive'
      });
      navigate('/login');
    }
  }, [token, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive'
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token!, password);
      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been reset successfully. You can now log in with your new password.'
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Password Reset Failed',
        description: error instanceof Error ? error.message : 'Failed to reset password',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4" data-id="25777a77f" data-path="src/pages/ResetPasswordPage.tsx">
      <Card className="w-full max-w-md shadow-xl" data-id="4alqf3xg4" data-path="src/pages/ResetPasswordPage.tsx">
        <CardHeader className="text-center space-y-4" data-id="po9vrogxg" data-path="src/pages/ResetPasswordPage.tsx">
          <div className="flex justify-center" data-id="d7o9p5bf5" data-path="src/pages/ResetPasswordPage.tsx">
            <Lock className="h-12 w-12 text-blue-600" data-id="h081mb4m7" data-path="src/pages/ResetPasswordPage.tsx" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900" data-id="4rfmzskt2" data-path="src/pages/ResetPasswordPage.tsx">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-gray-600" data-id="447mhyk0o" data-path="src/pages/ResetPasswordPage.tsx">
            Enter your new password below to complete the reset process.
          </CardDescription>
        </CardHeader>
        <CardContent data-id="qayqpma3j" data-path="src/pages/ResetPasswordPage.tsx">
          <form onSubmit={handleSubmit} className="space-y-4" data-id="mjqpy91ve" data-path="src/pages/ResetPasswordPage.tsx">
            <div className="space-y-2" data-id="ctlule9hb" data-path="src/pages/ResetPasswordPage.tsx">
              <Label htmlFor="password" className="text-sm font-medium" data-id="vrr52tk83" data-path="src/pages/ResetPasswordPage.tsx">New Password</Label>
              <div className="relative" data-id="iin6aov1t" data-path="src/pages/ResetPasswordPage.tsx">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10" data-id="8v2dgkyi4" data-path="src/pages/ResetPasswordPage.tsx" />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)} data-id="bsxpbthtm" data-path="src/pages/ResetPasswordPage.tsx">

                  {showPassword ?
                  <EyeOff className="h-4 w-4 text-gray-400" data-id="tk64vkt2i" data-path="src/pages/ResetPasswordPage.tsx" /> :

                  <Eye className="h-4 w-4 text-gray-400" data-id="awcegl0xo" data-path="src/pages/ResetPasswordPage.tsx" />
                  }
                </Button>
              </div>
            </div>
            <div className="space-y-2" data-id="ulgrp5gx1" data-path="src/pages/ResetPasswordPage.tsx">
              <Label htmlFor="confirmPassword" className="text-sm font-medium" data-id="bmruadf9l" data-path="src/pages/ResetPasswordPage.tsx">Confirm New Password</Label>
              <div className="relative" data-id="j7ftary8o" data-path="src/pages/ResetPasswordPage.tsx">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10" data-id="hwnznms7k" data-path="src/pages/ResetPasswordPage.tsx" />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} data-id="p9rp37lbz" data-path="src/pages/ResetPasswordPage.tsx">

                  {showConfirmPassword ?
                  <EyeOff className="h-4 w-4 text-gray-400" data-id="2a5kgkmgp" data-path="src/pages/ResetPasswordPage.tsx" /> :

                  <Eye className="h-4 w-4 text-gray-400" data-id="peq43j6nl" data-path="src/pages/ResetPasswordPage.tsx" />
                  }
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              disabled={isLoading} data-id="r366bb85b" data-path="src/pages/ResetPasswordPage.tsx">

              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>);

};

export default ResetPasswordPage;