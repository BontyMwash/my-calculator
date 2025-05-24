import { useState, useEffect } from 'react';
import { useAuth, User, UserRole } from '@/contexts/AuthContext';
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
import { MoreHorizontal, Plus, Search, Shield, Users, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfile {
  id: number;
  user_id: number;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: boolean;
  email?: string;
  name?: string;
}

const UserForm = ({
  onSubmit,
  onCancel,
  isLoading




}: {onSubmit: (data: any) => void;onCancel: () => void;isLoading: boolean;}) => {
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('teacher');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      password,
      firstName,
      lastName,
      email,
      phone,
      role
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-id="0pppg0ubo" data-path="src/pages/UserManagementPage.tsx">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="oj06ctwil" data-path="src/pages/UserManagementPage.tsx">
        <div className="space-y-2" data-id="dcwbc097a" data-path="src/pages/UserManagementPage.tsx">
          <Label htmlFor="firstName" data-id="0o0owet3o" data-path="src/pages/UserManagementPage.tsx">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required data-id="ge4pnbdyo" data-path="src/pages/UserManagementPage.tsx" />

        </div>
        <div className="space-y-2" data-id="11cch83w2" data-path="src/pages/UserManagementPage.tsx">
          <Label htmlFor="lastName" data-id="6oc5s409g" data-path="src/pages/UserManagementPage.tsx">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required data-id="9btod7ovj" data-path="src/pages/UserManagementPage.tsx" />

        </div>
        <div className="space-y-2" data-id="5e5z9z2xk" data-path="src/pages/UserManagementPage.tsx">
          <Label htmlFor="email" data-id="mdw0zkjko" data-path="src/pages/UserManagementPage.tsx">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@school.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required data-id="q4b12mv6u" data-path="src/pages/UserManagementPage.tsx" />

        </div>
        <div className="space-y-2" data-id="jqipbirwe" data-path="src/pages/UserManagementPage.tsx">
          <Label htmlFor="phone" data-id="zyfh9h0z7" data-path="src/pages/UserManagementPage.tsx">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} data-id="vsm4898ku" data-path="src/pages/UserManagementPage.tsx" />

        </div>
        <div className="space-y-2" data-id="n8r5922cx" data-path="src/pages/UserManagementPage.tsx">
          <Label htmlFor="password" data-id="2hdtx8oko" data-path="src/pages/UserManagementPage.tsx">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required data-id="8v3vraqr4" data-path="src/pages/UserManagementPage.tsx" />

        </div>
        <div className="space-y-2" data-id="5gatjlxe3" data-path="src/pages/UserManagementPage.tsx">
          <Label htmlFor="role" data-id="v6mcipp33" data-path="src/pages/UserManagementPage.tsx">Role</Label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
            required data-id="1v3jgzoq6" data-path="src/pages/UserManagementPage.tsx">

            <SelectTrigger data-id="nznf48tzy" data-path="src/pages/UserManagementPage.tsx">
              <SelectValue placeholder="Select a role" data-id="gtspo9ztq" data-path="src/pages/UserManagementPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="aeaj8ansq" data-path="src/pages/UserManagementPage.tsx">
              <SelectItem value="admin" data-id="8czck2zwe" data-path="src/pages/UserManagementPage.tsx">
                <div className="flex items-center" data-id="l8u2rebwv" data-path="src/pages/UserManagementPage.tsx">
                  <Shield className="mr-2 h-4 w-4" data-id="59fczwopy" data-path="src/pages/UserManagementPage.tsx" />
                  Admin
                </div>
              </SelectItem>
              <SelectItem value="teacher" data-id="icz6t2veo" data-path="src/pages/UserManagementPage.tsx">
                <div className="flex items-center" data-id="gr0hekygw" data-path="src/pages/UserManagementPage.tsx">
                  <Users className="mr-2 h-4 w-4" data-id="of74tfulf" data-path="src/pages/UserManagementPage.tsx" />
                  Teacher
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter data-id="sh5awefwy" data-path="src/pages/UserManagementPage.tsx">
        <Button type="button" variant="outline" onClick={onCancel} data-id="tuzv3c7yp" data-path="src/pages/UserManagementPage.tsx">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} data-id="r0wswldkj" data-path="src/pages/UserManagementPage.tsx">
          {isLoading ? 'Creating...' : 'Create User'}
        </Button>
      </DialogFooter>
    </form>);

};

const UserManagementPage = () => {
  const { register, createUserProfile, isAdmin } = useAuth();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { toast } = useToast();

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this page.',
        variant: 'destructive'
      });
    }
  }, [isAdmin, toast]);

  const fetchUserProfiles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await window.ezsite.apis.tablePage(8989, {
        "PageNo": 1,
        "PageSize": 50,
        "OrderByField": "id",
        "IsAsc": false
      });

      if (error) throw new Error(error);

      setUserProfiles(data?.List || []);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user profiles',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUserProfiles();
    }
  }, [isAdmin]);

  // Filter users based on search query
  const filteredUsers = userProfiles.filter(
    (user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = async (userData: any) => {
    setIsFormLoading(true);
    try {
      // First register the user
      await register(userData.email, userData.password, `${userData.firstName} ${userData.lastName}`);

      // Get the user info to get the user ID
      const { data: userInfo, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw new Error(userError);

      // Create the user profile with role information
      await createUserProfile(userInfo.ID, {
        role: userData.role,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        is_active: true
      });

      setIsAddDialogOpen(false);
      await fetchUserProfiles(); // Refresh the list

      toast({
        title: 'User Created',
        description: `${userData.firstName} ${userData.lastName} has been added as ${userData.role}.`
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create user',
        variant: 'destructive'
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const toggleUserStatus = async (userProfile: UserProfile) => {
    try {
      const { error } = await window.ezsite.apis.tableUpdate(8989, {
        id: userProfile.id,
        user_id: userProfile.user_id,
        role: userProfile.role,
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        phone: userProfile.phone,
        is_active: !userProfile.is_active
      });

      if (error) throw new Error(error);

      await fetchUserProfiles(); // Refresh the list

      toast({
        title: 'User Status Updated',
        description: `${userProfile.first_name} ${userProfile.last_name} has been ${!userProfile.is_active ? 'activated' : 'deactivated'}.`
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user status',
        variant: 'destructive'
      });
    }
  };

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'teacher':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3 mr-1" data-id="qf71q69cc" data-path="src/pages/UserManagementPage.tsx" />;
      case 'teacher':
        return <Users className="h-3 w-3 mr-1" data-id="7sncw4chj" data-path="src/pages/UserManagementPage.tsx" />;
      default:
        return null;
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64" data-id="sui2giwbl" data-path="src/pages/UserManagementPage.tsx">
        <div className="text-center" data-id="37svnmfaw" data-path="src/pages/UserManagementPage.tsx">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" data-id="12cdxhi7a" data-path="src/pages/UserManagementPage.tsx" />
          <h3 className="text-lg font-medium text-gray-900" data-id="dqtpb25xu" data-path="src/pages/UserManagementPage.tsx">Access Denied</h3>
          <p className="text-gray-500" data-id="f117gcmkg" data-path="src/pages/UserManagementPage.tsx">You need admin privileges to access this page.</p>
        </div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="ewpzm8mm5" data-path="src/pages/UserManagementPage.tsx">
      <div className="flex justify-between items-center" data-id="yfksil6il" data-path="src/pages/UserManagementPage.tsx">
        <div data-id="yul75eoxd" data-path="src/pages/UserManagementPage.tsx">
          <h2 className="text-3xl font-bold tracking-tight" data-id="7qeslpydx" data-path="src/pages/UserManagementPage.tsx">User Management</h2>
          <p className="text-gray-600" data-id="1tetdhl7e" data-path="src/pages/UserManagementPage.tsx">Manage teachers and admin accounts</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} data-id="ar2hvs1fp" data-path="src/pages/UserManagementPage.tsx">
          <Plus className="mr-2 h-4 w-4" data-id="x15ncvgvr" data-path="src/pages/UserManagementPage.tsx" />
          Add User
        </Button>
      </div>

      <Card data-id="2f3vgylwu" data-path="src/pages/UserManagementPage.tsx">
        <CardHeader data-id="junaigjqy" data-path="src/pages/UserManagementPage.tsx">
          <CardTitle className="flex items-center" data-id="ztq83yj21" data-path="src/pages/UserManagementPage.tsx">
            <Users className="mr-2 h-5 w-5" data-id="2tj3ow0oa" data-path="src/pages/UserManagementPage.tsx" />
            System Users
          </CardTitle>
          <div className="relative mt-2" data-id="c4xa7n4lz" data-path="src/pages/UserManagementPage.tsx">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" data-id="9s5f5kden" data-path="src/pages/UserManagementPage.tsx" />
            <Input
              placeholder="Search by name, email, or role..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} data-id="qigqpegsp" data-path="src/pages/UserManagementPage.tsx" />

          </div>
        </CardHeader>
        <CardContent data-id="pmqrv1yk1" data-path="src/pages/UserManagementPage.tsx">
          <div className="rounded-md border" data-id="1s1gexidz" data-path="src/pages/UserManagementPage.tsx">
            <Table data-id="wl0pb4aq9" data-path="src/pages/UserManagementPage.tsx">
              <TableHeader data-id="facbk1pez" data-path="src/pages/UserManagementPage.tsx">
                <TableRow data-id="kceadxiaa" data-path="src/pages/UserManagementPage.tsx">
                  <TableHead data-id="h2i5jj973" data-path="src/pages/UserManagementPage.tsx">Name</TableHead>
                  <TableHead data-id="zfu3qr0j4" data-path="src/pages/UserManagementPage.tsx">Email</TableHead>
                  <TableHead data-id="rrm07kgu2" data-path="src/pages/UserManagementPage.tsx">Phone</TableHead>
                  <TableHead data-id="zcbhc3y0q" data-path="src/pages/UserManagementPage.tsx">Role</TableHead>
                  <TableHead data-id="n3hpc2u0e" data-path="src/pages/UserManagementPage.tsx">Status</TableHead>
                  <TableHead className="text-right" data-id="r41b83ga8" data-path="src/pages/UserManagementPage.tsx">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-id="c7hogeorj" data-path="src/pages/UserManagementPage.tsx">
                {isLoading ?
                <TableRow data-id="z6fs2n4od" data-path="src/pages/UserManagementPage.tsx">
                    <TableCell colSpan={6} className="h-24 text-center" data-id="93hjvrogi" data-path="src/pages/UserManagementPage.tsx">
                      Loading users...
                    </TableCell>
                  </TableRow> :
                filteredUsers.length > 0 ?
                filteredUsers.map((user) =>
                <TableRow key={user.id} data-id="huvcnm8n8" data-path="src/pages/UserManagementPage.tsx">
                      <TableCell className="font-medium" data-id="ulh6n3uvr" data-path="src/pages/UserManagementPage.tsx">
                        {`${user.first_name} ${user.last_name}`}
                      </TableCell>
                      <TableCell data-id="h9oaw5nxp" data-path="src/pages/UserManagementPage.tsx">{user.email || 'N/A'}</TableCell>
                      <TableCell data-id="95u1pego8" data-path="src/pages/UserManagementPage.tsx">{user.phone || 'N/A'}</TableCell>
                      <TableCell data-id="7orqkngl7" data-path="src/pages/UserManagementPage.tsx">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeClass(user.role)}`} data-id="b52zbgorm" data-path="src/pages/UserManagementPage.tsx">
                          {getRoleIcon(user.role)}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell data-id="c6f9w6m6e" data-path="src/pages/UserManagementPage.tsx">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.is_active ?
                    'bg-green-100 text-green-800 border-green-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'}`
                    } data-id="f1f0w879h" data-path="src/pages/UserManagementPage.tsx">
                          {user.is_active ?
                      <>
                              <CheckCircle className="h-3 w-3 mr-1" data-id="ohfgbooit" data-path="src/pages/UserManagementPage.tsx" />
                              Active
                            </> :

                      <>
                              <XCircle className="h-3 w-3 mr-1" data-id="hjrztx82i" data-path="src/pages/UserManagementPage.tsx" />
                              Inactive
                            </>
                      }
                        </span>
                      </TableCell>
                      <TableCell className="text-right" data-id="c234mfbs6" data-path="src/pages/UserManagementPage.tsx">
                        <DropdownMenu data-id="umzeg7djb" data-path="src/pages/UserManagementPage.tsx">
                          <DropdownMenuTrigger asChild data-id="izf5l11oh" data-path="src/pages/UserManagementPage.tsx">
                            <Button variant="ghost" className="h-8 w-8 p-0" data-id="j8sm8vtdd" data-path="src/pages/UserManagementPage.tsx">
                              <MoreHorizontal className="h-4 w-4" data-id="9qa7vmkfb" data-path="src/pages/UserManagementPage.tsx" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" data-id="ne3y7wzek" data-path="src/pages/UserManagementPage.tsx">
                            <DropdownMenuLabel data-id="hlu70uufs" data-path="src/pages/UserManagementPage.tsx">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator data-id="jx0rcvul6" data-path="src/pages/UserManagementPage.tsx" />
                            <DropdownMenuItem onClick={() => toggleUserStatus(user)} data-id="bybjjhg3k" data-path="src/pages/UserManagementPage.tsx">
                              {user.is_active ? 'Deactivate' : 'Activate'} User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                ) :

                <TableRow data-id="wulmogv8b" data-path="src/pages/UserManagementPage.tsx">
                    <TableCell colSpan={6} className="h-24 text-center" data-id="2mni3cb1l" data-path="src/pages/UserManagementPage.tsx">
                      No users found.
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="y3zel3cn9" data-path="src/pages/UserManagementPage.tsx">
        <DialogContent className="sm:max-w-[600px]" data-id="l6cpg1nci" data-path="src/pages/UserManagementPage.tsx">
          <DialogHeader data-id="x0693jxbe" data-path="src/pages/UserManagementPage.tsx">
            <DialogTitle data-id="jro2nk4u5" data-path="src/pages/UserManagementPage.tsx">Add New User</DialogTitle>
            <DialogDescription data-id="wqc44ayku" data-path="src/pages/UserManagementPage.tsx">
              Create a new user account with specific access rights.
            </DialogDescription>
          </DialogHeader>
          <UserForm
            onSubmit={handleAddUser}
            onCancel={() => setIsAddDialogOpen(false)}
            isLoading={isFormLoading} data-id="qpwl0ivcb" data-path="src/pages/UserManagementPage.tsx" />

        </DialogContent>
      </Dialog>
    </div>);

};

export default UserManagementPage;