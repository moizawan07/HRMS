import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Briefcase, 
  UserCheck, 
  Grid3X3, 
  Table, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CompanyInvitesComponent = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [inviteData, setInviteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchInviteData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/companyInviteNotAccept`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const data = await response.json();
        setInviteData(data.data);
      } catch (err) {
        console.error('Error fetching invite data:', err);
        setError(err.message);
        
        // Fallback to sample data array
        setInviteData([
          {
            _id: "685d6d78ce9717d0c7fff3b9",
            firstName: "Munneb",
            lastName: "mayar",
            email: "muneebmayar@gmail.com",
            role: "admin",
            phoneNumber: "+921245779635",
            companyName: "Bykea",
            companyLogo: "https://via.placeholder.com/64x64/E6E2FC/8B5CF6?text=B",
            companySize: "301-900+",
            headquarters: "Pakistan",
            companyField: "Transportation",
            invitedBy: "owner",
            createdAt: "2025-06-26T15:55:36.666+00:00",
            updatedAt: "2025-06-26T15:55:36.666+00:00"
          },
          {
            _id: "685d6d78ce9717d0c7fff3c0",
            firstName: "Ahmed",
            lastName: "Ali",
            email: "ahmed.ali@techcorp.com",
            role: "hr_manager",
            phoneNumber: "+923001234567",
            companyName: "TechCorp Solutions",
            companyLogo: "https://via.placeholder.com/64x64/E6E2FC/8B5CF6?text=T",
            companySize: "51-200",
            headquarters: "Lahore, Pakistan",
            companyField: "Technology",
            invitedBy: "admin",
            createdAt: "2025-06-25T10:30:20.500+00:00",
            updatedAt: "2025-06-25T14:20:15.300+00:00"
          },
          {
            _id: "685d6d78ce9717d0c7fff3c1",
            firstName: "Sara",
            lastName: "Khan",
            email: "sara.khan@retailplus.com",
            role: "manager",
            phoneNumber: "+923219876543",
            companyName: "RetailPlus",
            companyLogo: "https://via.placeholder.com/64x64/E6E2FC/8B5CF6?text=R",
            companySize: "11-50",
            headquarters: "Islamabad, Pakistan",
            companyField: "Retail",
            invitedBy: "owner",
            createdAt: "2025-06-24T08:15:45.200+00:00",
            updatedAt: "2025-06-24T16:45:30.100+00:00"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchInviteData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading component
  const LoadingState = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
          <p className="text-gray-600 text-lg">Loading invite data...</p>
        </CardContent>
      </Card>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Data</h2>
          <p className="text-gray-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Grid view component
  const GridView = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Invites</p>
                <p className="text-2xl font-bold">{inviteData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Companies</p>
                <p className="text-2xl font-bold">{new Set(inviteData.map(invite => invite.companyName)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold">{inviteData.filter(invite => invite.role === 'admin').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Managers</p>
                <p className="text-2xl font-bold">{inviteData.filter(invite => invite.role.includes('manager')).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Invites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inviteData.map((invite) => (
          <Card key={invite._id} className="hover:shadow-lg transition-shadow">
            {/* Company Header */}
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <img 
                    src={invite.companyLogo} 
                    alt={invite.companyName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{invite.companyName}</h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{invite.headquarters}</span>
                  </div>
                </div>
                <Badge 
                  variant={invite.role === 'admin' ? 'default' : 'secondary'} 
                  className="capitalize"
                >
                  {invite.role.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4 space-y-4">
              {/* Admin Details */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Administrator</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Name</span>
                    <span className="text-sm font-medium">{invite.firstName} {invite.lastName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Invited By</span>
                    <span className="text-sm font-medium capitalize">{invite.invitedBy}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 truncate">{invite.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{invite.phoneNumber}</span>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Company Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Size</span>
                    <span className="text-sm font-medium">{invite.companySize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Industry</span>
                    <span className="text-sm font-medium">{invite.companyField}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {formatDate(invite.createdAt)}</span>
                  {/* <span>Updated: {formatDate(invite.updatedAt)}</span> */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Table view component
  const TableView = () => (
    <Card>
      <CardHeader>
        <CardTitle>All Company Invites ({inviteData.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium text-gray-600">Company</th>
                <th className="text-left p-3 font-medium text-gray-600">Administrator</th>
                <th className="text-left p-3 font-medium text-gray-600">Email</th>
                <th className="text-left p-3 font-medium text-gray-600">Phone</th>
                <th className="text-left p-3 font-medium text-gray-600">Role</th>
                <th className="text-left p-3 font-medium text-gray-600">Company Info</th>
                <th className="text-left p-3 font-medium text-gray-600">Invited By</th>
                <th className="text-left p-3 font-medium text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody>
              {inviteData.map((invite) => (
                <tr key={invite._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={invite.companyLogo} 
                        alt={invite.companyName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{invite.companyName}</p>
                        <p className="text-sm text-gray-500">{invite.headquarters}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{invite.firstName} {invite.lastName}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{invite.email}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{invite.phoneNumber}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge 
                      variant={invite.role === 'admin' ? 'default' : 'secondary'} 
                      className="capitalize"
                    >
                      {invite.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm font-medium">{invite.companySize} employees</p>
                      <p className="text-sm text-gray-500">{invite.companyField}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="capitalize text-sm">{invite.invitedBy}</span>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm">{formatDate(invite.createdAt)}</p>
                      {/* <p className="text-xs text-gray-500">Updated: {formatDate(invite.updatedAt)}</p> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error && inviteData.length === 0) {
    return <ErrorState />;
  }

  if (!inviteData || inviteData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center p-8">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Invites Found</h2>
            <p className="text-gray-600">There are no company invites to display.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Invites</h1>
              <p className="text-gray-600 mt-1">Manage and view company invitation details</p>
              {error && (
                <Alert className="mt-4 border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Using fallback data due to API error
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="flex items-center space-x-2"
              >
                <Grid3X3 className="w-4 h-4" />
                <span>Grid View</span>
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                onClick={() => setViewMode('table')}
                className="flex items-center space-x-2"
              >
                <Table className="w-4 h-4" />
                <span>Table View</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? <GridView /> : <TableView />}
      </div>
    </div>
  );
};

export default CompanyInvitesComponent;