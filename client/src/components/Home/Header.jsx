// import { Button } from "@/components/ui/button";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// // Import icons from Lucide React
// import { BellIcon, MailIcon, UserIcon } from "lucide-react"; 
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <header className="flex justify-between items-center p-4 border-b bg-[var(--header)]  shadow-sm">
//       {/* Company Logo */}
//       <div className="flex items-center space-x-2">
//         {/* Replace with your actual logo image path */}
//         <img src="data:image/png;base64,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" alt="Your HRMS Logo" className="h-10 w-auto" />
//         {/* <span className="text-xl font-bold text-gray-800 hidden md:block">Your HRMS Name</span> Optional: Show name on larger screens */}
//       </div>

//       {/* Right Side: Icons Section */}
//       <div className="flex items-center space-x-2"> {/* Grouping icons for consistent spacing */}

//         {/* Notifications Icon with Tooltip */}
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button variant="ghost" size="icon" aria-label="Notifications">
//                 <BellIcon className="h-6 w-6 text-gray-600" />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>Notifications</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>

//         {/* Mail Icon with Tooltip */}
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button variant="ghost" size="icon" aria-label="Contact Us">
//                 <MailIcon className="h-6 w-6 text-gray-600" />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>Contact Us</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>

//         {/* Login Icon with Tooltip */}
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button variant="ghost" size="icon" aria-label="Login">
//                 <Link to='/login'>
//                 <UserIcon className="h-6 w-6 text-gray-600" />
//                 </Link>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//              <p>Login</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>

//       </div>
//     </header>
//   );
// }


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Users, 
  FileText, 
  Settings, 
  Clock,
  Fingerprint,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Header Component
const HRMSHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#', active: true },
    { name: 'About', href: '#', icon: <FileText className="w-4 h-4" /> },
    { name: 'login', href: '/login', icon: <Fingerprint /> },
    { name: 'Settings', href: '#', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-white shadow-md border-b-2 border-purple-100 sticky top-0 z-50" style={{backgroundColor: '#fefefe'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">HRMS Pro</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Human Resource Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative">
               
                  <Button 
                    variant="ghost" 
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                      item.active ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`
                      }>
                    {item.icon}
                    <Link to={item.href}>{item.name}</Link>
                  </Button>
              </div>
            ))}
          </nav>

          {/* User Profile & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
              <Clock className="w-3 h-3 mr-1" />
              Online
            </Badge>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Dashboard
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                      item.active ? 'text-purple-600 bg-purple-50' : 'text-gray-600'
                    }`}
                  >
                    {item.icon}
                    <Link to={item.href}>{item.name}</Link>
                  </Button>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 text-xs">
                      Online
                    </Badge>
                  </div>
                </div>
                <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Footer Component


// Main App Component
// const HRMSApp = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <HRMSHeader />
      
     
      
//       <HRMSFooter />
//     </div>
//   );
// };

export default HRMSHeader;