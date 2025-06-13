import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"; // For message/notification lists

// Lucide Icons
import {
  Search,
  LayoutGrid, // For "4 grid icon"
  Settings,
  Mail, // For messages/email
  Bell, // For notifications
  User, // For profile icon
  UserCog, // For My Profile/Settings link in modal
  Activity, // For Status link in modal
  CreditCard, // For My Account link in modal
  Book, // For Knowledge Base link in modal
  LogOut, // For Logout link in modal
  MessageSquare, // Alternative for messages if Mail is too generic
} from "lucide-react";

// --- Dummy Data for Popovers ---

// Profile Dropdown Links
const profileLinks = [
  { name: "My Profile", icon: User, href: "/profile" },
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Status", icon: Activity, href: "/status" },
  { name: "My Account", icon: CreditCard, href: "/my-account" },
  { name: "Knowledge Base", icon: Book, href: "/knowledge-base" },
  // Logout will be handled separately as the last item
];

// Dummy Notification Data (Employee Requests)
const dummyNotifications = [
  { id: 1, type: "Leave Request", userName: "Alice Johnson", userAvatar: "/avatars/alice.jpg", time: "2 hours ago", status: "pending" },
  { id: 2, type: "Expense Approval", userName: "Bob Smith", userAvatar: "/avatars/bob.jpg", time: "1 day ago", status: "approved" },
  { id: 3, type: "Feedback Submission", userName: "Charlie Brown", userAvatar: "/avatars/charlie.jpg", time: "2 days ago", status: "new" },
  { id: 4, type: "Project Update", userName: "Diana Prince", userAvatar: "/avatars/diana.jpg", time: "3 days ago", status: "info" },
  { id: 5, type: "Meeting Reminder", userName: "Eve Adams", userAvatar: "/avatars/eve.jpg", time: "4 days ago", status: "info" },
];

// Dummy Message Data
const dummyMessages = [
  { id: 1, sender: "Manager John", avatar: "/avatars/john.jpg", subject: "Review Q2 Performance", snippet: "Hi, let's schedule a time to review...", time: "5 min ago" },
  { id: 2, sender: "HR Dept", avatar: "/avatars/hr.jpg", subject: "Payroll Information", snippet: "Your recent payroll statement is now available...", time: "1 hour ago" },
  { id: 3, sender: "Team Lead", avatar: "/avatars/lead.jpg", subject: "Project Phoenix Update", snippet: "The next phase of Project Phoenix will begin next week...", time: "Yesterday" },
];


export default function DashboardHeader() {
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);
  const [isNotificationsPopoverOpen, setIsNotificationsPopoverOpen] = useState(false);
  const [isMessagesPopoverOpen, setIsMessagesPopoverOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-18 px-6 rounded-2xl my-2 color  border-b border-gray-200 shadow-sm w-full">
      {/* Left Section: Search Input and Icons */}
      <div className="flex items-center space-x-4">
        {/* Search Input - Hidden on small screens */}
        <div className="relative flex items-center md:w-64">
          <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search dashboard..."
            className="pl-10 pr-4 py-2 border shadow-2xl shadow-purple-900 border-gray-300 rounded-lg focus:ring-hrms-primary focus:border-hrms-primary transition-all duration-200 hidden sm:flex h-10 text-base"
          />
        </div>
        
        {/* Icons (always visible) */}
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hidden md:inline-flex" aria-label="Dashboard Grid">
          <LayoutGrid className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hidden md:inline-flex" aria-label="Settings">
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Right Section: Message, Notification, Email, and Profile Icons */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Messages Popover */}
        <Popover open={isMessagesPopoverOpen} onOpenChange={setIsMessagesPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900" aria-label="Messages">
              <Mail className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4 sm:mr-0 z-50">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-lg">Messages</h4>
            </div>
            <ScrollArea className="h-[250px]">
              {dummyMessages.length > 0 ? (
                dummyMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.avatar} alt={msg.sender} />
                      <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{msg.sender} <span className="float-right text-xs text-gray-500">{msg.time}</span></p>
                      <p className="text-xs text-gray-600 truncate">{msg.subject}</p>
                      <p className="text-xs text-gray-500 truncate">{msg.snippet}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500 text-sm">No new messages.</p>
              )}
            </ScrollArea>
            <div className="p-2 border-t border-gray-200 text-center">
              <a href="/messages" className="text-sm text-hrms-primary-dark hover:underline">View All Messages</a>
            </div>
          </PopoverContent>
        </Popover>

        {/* Notifications Popover */}
        <Popover open={isNotificationsPopoverOpen} onOpenChange={setIsNotificationsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 relative" aria-label="Notifications">
              <Bell className="h-6 w-6" />
              {dummyNotifications.filter(n => n.status === "pending" || n.status === "new").length > 0 && (
                <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border border-white"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4 sm:mr-0 z-50">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-lg">Notifications</h4>
            </div>
            <ScrollArea className="h-[250px]">
              {dummyNotifications.length > 0 ? (
                dummyNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={notification.userAvatar} alt={notification.userName} />
                      <AvatarFallback>{notification.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="text-hrms-primary-dark font-bold">{notification.userName}</span>: {notification.type}
                        <span className="float-right text-xs text-gray-500">{notification.time}</span>
                      </p>
                      <p className={`text-xs ${notification.status === 'pending' ? 'text-red-500' : notification.status === 'new' ? 'text-blue-500' : 'text-gray-500'}`}>Status: {notification.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500 text-sm">No new notifications.</p>
              )}
            </ScrollArea>
            <div className="p-2 border-t border-gray-200 text-center">
              <a href="/notifications" className="text-sm text-hrms-primary-dark hover:underline">View All Notifications</a>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile Popover */}
        <Popover open={isProfilePopoverOpen} onOpenChange={setIsProfilePopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 overflow-hidden" aria-label="User Profile">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/user-profile.jpg" alt="User Profile" /> {/* Replace with actual user avatar */}
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0 mr-4 sm:mr-0 z-50"> {/* Adjusted width and margin */}
            <div className="p-4">
              <p className="font-semibold text-gray-900">John Doe</p> {/* Replace with actual user name */}
              <p className="text-sm text-gray-500">john.doe@example.com</p> {/* Replace with actual user email */}
            </div>
            <Separator className="my-1" />
            <div className="flex flex-col py-1">
              {profileLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href} // Use actual router links if you have one (e.g., <Link href={link.href}>)
                  className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200"
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </a>
              ))}
            </div>
            <Separator className="my-1" />
            <div className="py-1">
              <a
                href="/logout" // Use actual router link if you have one
                className="flex items-center gap-2 p-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </a>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}