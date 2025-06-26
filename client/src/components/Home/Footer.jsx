import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ChevronDown,
  Clock,
  Shield,
  Award
} from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Employee Directory', href: '#' },
    { name: 'Time Tracking', href: '#' },
    { name: 'Leave Management', href: '#' },
    { name: 'Performance Reviews', href: '#' },
    { name: 'Payroll Processing', href: '#' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'System Status', href: '#' },
    { name: 'Contact Support', href: '#' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security', href: '#' }
  ];

  const features = [
    { icon: <Shield className="w-5 h-5 text-green-500" />, text: 'Secure & Compliant' },
    { icon: <Award className="w-5 h-5 text-blue-500" />, text: 'Award Winning' },
    { icon: <Clock className="w-5 h-5 text-purple-500" />, text: '24/7 Support' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t-2 border-purple-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">HRMS Pro</h2>
                <p className="text-sm text-gray-500">HR Management System</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Streamline your HR processes with our comprehensive Human Resource Management System. 
              Manage employees, track attendance, process payroll, and more.
            </p>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {feature.icon}
                  <span className="text-sm text-gray-600">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-purple-600 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-purple-600 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">support@hrmspro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">123 Business St, Suite 100</span>
              </div>
            </div>
            
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Company</h4>
            <ul className="space-y-1">
              {companyLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-purple-600 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-500">
                © {currentYear} HRMS Pro. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Privacy Policy</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Terms of Service</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Security</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Follow us:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-purple-600">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-purple-600">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-purple-600">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-purple-600">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer