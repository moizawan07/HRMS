
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Info, TrendingUp, Users, Calendar, Award } from "lucide-react"; // Example icons for content

export  function LeftRightCards() {
  // Dummy data for the first card (e.g., Recent Activities)
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: "New Employee", name: "Sarah Khan", avatar: "/avatars/sarah.jpg", time: "5 mins ago", icon: Users },
    { id: 2, type: "Leave Approved", name: "Ahmed Ali", avatar: "/avatars/ahmed.jpg", time: "1 hour ago", icon: Calendar },
    { id: 3, type: "Performance Review", name: "Fatima Raza", avatar: "/avatars/fatima.jpg", time: "Yesterday", icon: Award },
    { id: 4, type: "Project Update", name: "Zainab Malik", avatar: "/avatars/zainab.jpg", time: "2 days ago", icon: TrendingUp },
    { id: 5, type: "HR Policy Added", name: "Admin", avatar: "/avatars/admin.jpg", time: "3 days ago", icon: Info },
  ]);

  // Dummy data for the second card (e.g., Upcoming Events)
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: "Team Meeting", date: "June 15, 2025", time: "10:00 AM", location: "Conference Room A" },
    { id: 2, title: "HR Workshop: New Policies", date: "June 18, 2025", time: "02:00 PM", location: "Online (Zoom)" },
    { id: 3, title: "Employee of the Month Ceremony", date: "June 20, 2025", time: "04:00 PM", location: "Main Auditorium" },
    { id: 4, title: "Company Holiday - Eid al-Adha", date: "June 28, 2025", time: "All Day", location: "N/A" },
  ]);

  // Example of how you might update state (e.g., fetch new activities)
  useEffect(() => {
    // In a real application, you would fetch data here
    // For demonstration, let's simulate adding a new activity after a delay
    const timer = setTimeout(() => {
      setRecentActivities(prev => [
        { id: prev.length + 1, type: "New Request", name: "Ali Hassan", avatar: "/avatars/ali.jpg", time: "Just now", icon: PlusCircle },
        ...prev
      ]);
    }, 5000); // Add a new activity after 5 seconds

    return () => clearTimeout(timer);
  }, []); // Run once on mount

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6"> {/* Responsive flex container */}
      {/* Card 1: Recent Activities */}
      <Card className="flex-1 min-w-0"> {/* flex-1 allows it to grow and shrink, min-w-0 for proper shrinking */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5 text-gray-600" />
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px] pr-4"> {/* Added pr-4 for internal scrollbar padding */}
            {recentActivities.length > 0 ? (
              recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.avatar} alt={activity.name} />
                    <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 flex justify-between items-center">
                      <span><activity.icon className="h-4 w-4 inline-block mr-1 text-hrms-primary-dark" /> {activity.type}</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </p>
                    <p className="text-sm text-gray-600">{activity.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No recent activities.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Card 2: Upcoming Events */}
      <Card className="flex-1 min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Upcoming Events</CardTitle>
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5 text-gray-600" />
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px] pr-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <div key={event.id} className="flex flex-col py-3 border-b border-gray-100 last:border-b-0">
                  <p className="text-base font-medium text-gray-900 flex justify-between items-center">
                    <span>{event.title}</span>
                    <span className="text-sm text-gray-600">{event.time}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">{event.date}</span> - {event.location}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No upcoming events.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}