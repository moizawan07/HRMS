import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Building2, Users, MapPin, Mail, User, Plus, Eye, Settings, MoreVertical } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button} from '@/components/ui/button';
import {  Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import DashLayout from '@/layouts/DashLayout';
import DashLoading from '@/components/Dashboard/Loading';

const DCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSize, setFilterSize] = useState('all');
  const [loading, setLoading] = useState(true);

  // Dummy data matching your API structure


  // API call simulation
 useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/getCompanies`);
        let resData = await res.json();

        if (res.status !== 200) throw new Error(resData.message);

        setCompanies(resData.data);
        setFilteredCompanies(resData.data);
        setLoading(false);

      } catch (error) {
        alert(error)
        setLoading(false)
      }
    };

    fetchCompanies();
  }, []);

  // Size conversion function
  const getCompanySizeText = (sizeRange) => {
    if (sizeRange === '1-20') return { text: 'Small', type: 'small' };
    if (sizeRange === '21-150') return { text: 'Medium', type: 'medium' };
    if (sizeRange === '151-300') return { text: 'Large', type: 'large' };
    if (sizeRange === '301-900') return { text: 'Enterprise', type: 'enterprise' };
    if (sizeRange === '901+') return { text: 'Corporation', type: 'corporation' };
    return { text: 'Unknown', type: 'unknown' };
  };

  // Filter functionality
  useEffect(() => {
    let filtered = companies;
    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.companyField.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.adminId.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterSize !== 'all') {
      filtered = filtered.filter(company => {
        const sizeInfo = getCompanySizeText(company.companySize);
        return sizeInfo.type === filterSize;
      });
    }
    setFilteredCompanies(filtered);
  }, [searchTerm, filterSize, companies]);

  const getSizeColor = (type) => {
    const colors = {
      small: 'bg-blue-50 text-blue-700 border-blue-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      large: 'bg-green-50 text-green-700 border-green-200',
      enterprise: 'bg-purple-50 text-purple-700 border-purple-200',
      corporation: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[type] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  if (loading) {
    return <DashLoading  pageName= "Companies"/>
  }

  return (
    <DashLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#E6E2FC] to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-2xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
                <p className="text-gray-600">Manage registered companies and admins</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Company</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Companies</p>
                <p className="text-3xl font-bold text-purple-600">{companies.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Companies</p>
                <p className="text-3xl font-bold text-green-600">{companies.filter(c => c.isActive).length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Admins</p>
                <p className="text-3xl font-bold text-blue-600">{companies.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Industries</p>
                <p className="text-3xl font-bold text-indigo-600">{[...new Set(companies.map(c => c.companyField))].length}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Settings className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={filterSize}
                  onChange={(e) => setFilterSize(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Sizes</option>
                  <option value="small">Small (1-20)</option>
                  <option value="medium">Medium (21-150)</option>
                  <option value="large">Large (151-300)</option>
                  <option value="enterprise">Enterprise (301-900)</option>
                  <option value="corporation">Corporation (901+)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-purple-600' : 'text-gray-500'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-purple-600' : 'text-gray-500'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Companies Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => {
              const sizeInfo = getCompanySizeText(company.companySize);
              return (
                <div key={company._id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-50 flex items-center justify-center">
                        <img 
                          src={company.companyLogo} 
                          alt={company.companyName}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div style={{ display: 'none' }} className="text-2xl font-bold text-purple-600">
                          {company.companyName.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{company.companyName}</h3>
                        <p className="text-gray-600 text-sm">{company.companyField}</p>
                      </div>
                    </div>
                    <MoreVertical className="h-5 w-5 text-gray-400 hover:text-purple-600 cursor-pointer" />
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Size</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSizeColor(sizeInfo.type)}`}>
                        {sizeInfo.text}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${company.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {company.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Range:</span>
                      <span className="text-sm font-semibold text-purple-600">{company.companySize}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{company.headquarters}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Admin Details</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{company.adminId.firstName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{company.adminId.email}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Field</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Size</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Admin</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCompanies.map((company) => {
                    const sizeInfo = getCompanySizeText(company.companySize);
                    return (
                      <tr key={company._id} className="hover:bg-purple-25 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-purple-50 flex items-center justify-center">
                              <img 
                                src={company.companyLogo} 
                                alt={company.companyName}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                              <div style={{ display: 'none' }} className="text-lg font-bold text-purple-600">
                                {company.companyName.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{company.companyName}</p>
                              <p className="text-sm text-gray-600">Joined {new Date(company.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{company.companyField}</td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSizeColor(sizeInfo.type)}`}>
                              {sizeInfo.text}
                            </span>
                            <p className="text-xs text-gray-500">{company.companySize}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{company.headquarters}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{company.adminId.firstName}</p>
                            <p className="text-sm text-gray-600">{company.adminId.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${company.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {company.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <MoreVertical className="h-5 w-5 text-purple-600 hover:text-purple-800 cursor-pointer" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Companies Found</h3>
            <p className="text-gray-600">No companies match your search criteria.</p>
          </div>
        )}
      </div>
      </div>
    </DashLayout>
  );
};

export default DCompanies;