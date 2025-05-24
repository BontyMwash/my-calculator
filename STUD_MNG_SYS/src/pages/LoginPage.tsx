import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const { login, register, sendResetEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login Successful',
        description: 'Welcome to the School Management System'
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(registerEmail, registerPassword, registerName);
      toast({
        title: 'Registration Successful',
        description: 'Please check your email to verify your account.'
      });
      setShowRegister(false);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'Registration failed',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendResetEmail(forgotEmail);
      toast({
        title: 'Reset Email Sent',
        description: 'Please check your email for password reset instructions.'
      });
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send reset email',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4" data-id="3lcae91oa" data-path="src/pages/LoginPage.tsx">
        <Card className="w-full max-w-md shadow-xl" data-id="9dpcvw9of" data-path="src/pages/LoginPage.tsx">
          <CardHeader className="space-y-1" data-id="8436fi8tf" data-path="src/pages/LoginPage.tsx">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" data-id="4pxkv6r4w" data-path="src/pages/LoginPage.tsx">
              School Management System
            </CardTitle>
            <CardDescription className="text-center text-gray-600" data-id="o3zzpx6a9" data-path="src/pages/LoginPage.tsx">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent data-id="c3nyeao4r" data-path="src/pages/LoginPage.tsx">
            <form onSubmit={handleSubmit} className="space-y-4" data-id="vd66kht7g" data-path="src/pages/LoginPage.tsx">
              <div className="space-y-2" data-id="52b7tpgwr" data-path="src/pages/LoginPage.tsx">
                <Label htmlFor="email" className="text-sm font-medium" data-id="088hfmnk3" data-path="src/pages/LoginPage.tsx">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500" data-id="6llbaxu30" data-path="src/pages/LoginPage.tsx" />

              </div>
              <div className="space-y-2" data-id="xi6wobraq" data-path="src/pages/LoginPage.tsx">
                <Label htmlFor="password" className="text-sm font-medium" data-id="p6lfaaz9r" data-path="src/pages/LoginPage.tsx">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500" data-id="cxtppls2l" data-path="src/pages/LoginPage.tsx" />

              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                disabled={isLoading} data-id="0lysaj3ye" data-path="src/pages/LoginPage.tsx">

                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2" data-id="ew9qpy7lr" data-path="src/pages/LoginPage.tsx">
            <div className="flex justify-between w-full text-sm" data-id="ge0lgovze" data-path="src/pages/LoginPage.tsx">
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-800"
                onClick={() => setShowForgotPassword(true)} data-id="plutfqj3c" data-path="src/pages/LoginPage.tsx">

                Forgot password?
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-800"
                onClick={() => setShowRegister(true)} data-id="m59inpza3" data-path="src/pages/LoginPage.tsx">

                Create account
              </Button>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200" data-id="mrca5usfo" data-path="src/pages/LoginPage.tsx">
              <p className="text-sm text-blue-800 font-medium mb-2" data-id="k57w0i36g" data-path="src/pages/LoginPage.tsx">Demo Login Credentials:</p>
              <div className="text-xs text-blue-700 space-y-1" data-id="4326lpioz" data-path="src/pages/LoginPage.tsx">
                <p data-id="l6ag2c8kw" data-path="src/pages/LoginPage.tsx"><strong data-id="uxsfxdews" data-path="src/pages/LoginPage.tsx">Admin:</strong> admin@school.com / admin123</p>
                <p data-id="esdyfmla6" data-path="src/pages/LoginPage.tsx"><strong data-id="iuzty2zx5" data-path="src/pages/LoginPage.tsx">Teacher:</strong> teacher@school.com / teacher123</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Register Dialog */}
      <Dialog open={showRegister} onOpenChange={setShowRegister} data-id="fywgvha7r" data-path="src/pages/LoginPage.tsx">
        <DialogContent data-id="buw6bwkqw" data-path="src/pages/LoginPage.tsx">
          <DialogHeader data-id="2s5zghp9o" data-path="src/pages/LoginPage.tsx">
            <DialogTitle data-id="sdelj13rj" data-path="src/pages/LoginPage.tsx">Create Account</DialogTitle>
            <DialogDescription data-id="soy7ict93" data-path="src/pages/LoginPage.tsx">
              Register for a new account in the school management system.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4" data-id="t6edcu9sl" data-path="src/pages/LoginPage.tsx">
            <div className="space-y-2" data-id="6zc6lzr8k" data-path="src/pages/LoginPage.tsx">
              <Label htmlFor="register-name" data-id="wiqj3p9bw" data-path="src/pages/LoginPage.tsx">Full Name</Label>
              <Input
                id="register-name"
                placeholder="John Doe"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required data-id="defba6143" data-path="src/pages/LoginPage.tsx" />

            </div>
            <div className="space-y-2" data-id="k6aup5ofu" data-path="src/pages/LoginPage.tsx">
              <Label htmlFor="register-email" data-id="bqav6yea2" data-path="src/pages/LoginPage.tsx">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="john.doe@school.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required data-id="0n82pt00i" data-path="src/pages/LoginPage.tsx" />

            </div>
            <div className="space-y-2" data-id="ts5lawwmi" data-path="src/pages/LoginPage.tsx">
              <Label htmlFor="register-password" data-id="1qr63noyu" data-path="src/pages/LoginPage.tsx">Password</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required data-id="idg5bwqcs" data-path="src/pages/LoginPage.tsx" />

            </div>
            <DialogFooter data-id="a7twf8pq6" data-path="src/pages/LoginPage.tsx">
              <Button type="button" variant="outline" onClick={() => setShowRegister(false)} data-id="yt5zfq0n4" data-path="src/pages/LoginPage.tsx">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} data-id="rdcgemj24" data-path="src/pages/LoginPage.tsx">
                {isLoading ? 'Creating...' : 'Create Account'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword} data-id="xv7cp7e5m" data-path="src/pages/LoginPage.tsx">
        <DialogContent data-id="wsml4lrzo" data-path="src/pages/LoginPage.tsx">
          <DialogHeader data-id="8klwbw9q1" data-path="src/pages/LoginPage.tsx">
            <DialogTitle data-id="bzpexqpyx" data-path="src/pages/LoginPage.tsx">Reset Password</DialogTitle>
            <DialogDescription data-id="hnxxla2c7" data-path="src/pages/LoginPage.tsx">
              Enter your email address to receive password reset instructions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4" data-id="m4p1p0897" data-path="src/pages/LoginPage.tsx">
            <div className="space-y-2" data-id="jkldepxvi" data-path="src/pages/LoginPage.tsx">
              <Label htmlFor="forgot-email" data-id="gcb811ach" data-path="src/pages/LoginPage.tsx">Email</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="your.email@school.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required data-id="mljgg74qp" data-path="src/pages/LoginPage.tsx" />

            </div>
            <DialogFooter data-id="x683a55mn" data-path="src/pages/LoginPage.tsx">
              <Button type="button" variant="outline" onClick={() => setShowForgotPassword(false)} data-id="9tv7o2yxa" data-path="src/pages/LoginPage.tsx">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} data-id="x421iml4b" data-path="src/pages/LoginPage.tsx">
                {isLoading ? 'Sending...' : 'Send Reset Email'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>);

};



export default LoginPage;