import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Edit3, 
  Save, 
  X,
  Camera,
  Shield,
  Star,
  Clock,
  Building
} from 'lucide-react';
import DashLayout from '@/components/Dashboard/DashLayout';

const HRMSProfile = () => {
  // Profile data stored in state with dummy data
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@company.com',
    address: '123 Business Street, Suite 456, New York, NY 10001',
    role: 'Senior Software Developer',
    department: 'Engineering',
    employeeId: 'EMP-2024-001',
    joinDate: '2022-03-15',
    status: 'Active',
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save changes
  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  // Get initials for avatar
  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  // Additional profile stats (dummy data)
  const profileStats = [
    { label: 'Projects Completed', value: '24', icon: <Star className="w-4 h-4 text-yellow-500" /> },
    { label: 'Years Experience', value: '5+', icon: <Calendar className="w-4 h-4 text-blue-500" /> },
    { label: 'Team Members', value: '8', icon: <User className="w-4 h-4 text-green-500" /> },
    { label: 'Performance Score', value: '9.2/10', icon: <Shield className="w-4 h-4 text-purple-500" /> }
  ];

  return (
    <DashLayout>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6" style={{backgroundColor: '#E6E2FC'}}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Employee Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and settings</p>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-purple-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {getInitials()}
                </div>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full p-0 bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-lg text-purple-600 font-medium">{profileData.role}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <Clock className="w-3 h-3 mr-1" />
                      {profileData.status}
                    </Badge>
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      <Building className="w-3 h-3 mr-1" />
                      {profileData.department}
                    </Badge>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      ID: {profileData.employeeId}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 md:w-64">
                {profileStats.map((stat, index) => (
                  <Card key={index} className="p-3 bg-gray-50 border-gray-200">
                    <div className="flex items-center space-x-2">
                      {stat.icon}
                      <div>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                        <p className="font-semibold text-gray-800">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Form */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter first name"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{profileData.firstName}</span>
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter last name"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{profileData.lastName}</span>
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                {isEditing ? (
                  <select
                    value={editData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{profileData.gender}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-purple-600" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{profileData.phone}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-600" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter email address"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{profileData.email}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    rows="3"
                    placeholder="Enter full address"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{profileData.address}</span>
                  </div>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                  Role
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter job role"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{profileData.role}</span>
                  </div>
                )}
              </div>

              {/* Join Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                  Join Date
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-800">{new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
    </DashLayout>
  );
};

export default HRMSProfile;