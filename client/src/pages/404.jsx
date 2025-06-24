import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600"></div>
            <span className="text-xl font-semibold text-gray-900">Brand</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <p>Home</p>
            <p>Products</p>
            <p>Support</p>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Illustration */}
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center mb-8">
                <AlertTriangle className="w-16 h-16 text-violet-500" strokeWidth={1.5} />
              </div>
              {/* Subtle decoration */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full" style={{backgroundColor: '#E6E2FC'}}></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-violet-200"></div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12 space-y-4">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
              The page you're looking for doesn't exist or has been moved to another location.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for content..."
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 

            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 hover:from-violet-600 hover:to-purple-700 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
             <Link to="/"> Back to Home</Link>
            </button>
            
            <button className="inline-flex items-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50">
              <RefreshCw className="w-5 h-5 mr-2" />
              Reload Page
            </button>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <p className="text-gray-500 font-medium">Popular pages you might be looking for:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Dashboard', desc: 'Main overview' },
                { name: 'Products', desc: 'Browse catalog' },
                { name: 'Documentation', desc: 'API guides' },
                { name: 'Support', desc: 'Get help' }
              ].map((item) => (
                <p
                  key={item.name}
                  className="group p-4 border border-gray-100 rounded-xl hover:border-violet-200 hover:bg-violet-50 transition-all duration-200"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            Need immediate assistance? Contact our{' '}
            <span className="text-violet-600 hover:text-violet-700 font-medium">support team</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
