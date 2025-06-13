
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, DollarSign, Zap, Bot, Star, MapPin, Clock, Users, Trophy, Award, Badge } from 'lucide-react';



const HSection1 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-indigo-600 mb-4 tracking-wide uppercase">
            Why FlexHR
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            FlexHR's the future of global HR,
            <br />
            <span className="text-indigo-600">built by a remote-first team</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Since 2020, we've been crafting the most comprehensive global-first HR solution from 
            the ground up. We're our own beta testers and continuously streamline complex 
            workflows to empower our distributed workforce of 5,000+ people across 120+ countries.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Schedule a demo
          </Button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Industry leaders in
                  <br />
                  compliance + coverage
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Most HR platforms lack true global capabilities. FlexHR has been 
                  internationally focused from day one, offering unmatched 
                  coverage and compliance across all major markets.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Save $25,000 per year
                  <br />
                  on your tech stack
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Access our comprehensive HRIS suite with 
                  transparent pricing and no usage caps. 
                  Expand with optional payroll and talent 
                  acquisition modules as your needs grow.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Spend less time managing
                  <br />
                  your HR ecosystem
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The only unified platform 
                  integrating EOR, freelancers, 
                  international payroll, benefits, 
                  workflows, and more to 
                  eliminate repetitive tasks.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Smart automations
                  <br />
                  to empower your team
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamline routine processes like 
                  employee onboarding and offboarding to 
                  reduce administrative burden and enhance 
                  the overall employee journey.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};


const HSection2 = () => {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-amber-500" />,
      title: "Award Winning",
      description: "Recognized excellence in service and quality delivery across all our projects"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Expert Team",
      description: "Professional certified specialists with years of industry experience"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: "24/7 Support",
      description: "Round the clock customer service and technical support available"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: "Quality Assured",
      description: "Guaranteed satisfaction with our premium quality standards and processes"
    }
  ];

  const stats = [
    { number: "1000+", label: "Happy Clients" },
    { number: "250+", label: "Projects Done" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Team Members" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50" style={{backgroundColor: '#E6E2FC'}}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-blue-200/30"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-purple-200 text-purple-700 border-purple-300">
                  <Star className="w-4 h-4 mr-2" />
                  Premium Service
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
                  Transform Your
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {" "}Digital Future
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We deliver cutting-edge solutions that drive growth, enhance efficiency, 
                  and transform businesses across industries with innovative technology.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3">
                  Get Started Today
                </Button>
                <Button variant="outline" size="lg" className="border-purple-300 text-purple-700 hover:bg-purple-100 px-8 py-3">
                  Learn More
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/80 border-purple-200 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        {feature.icon}
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white/60 border-t border-purple-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">Ready to Start?</h3>
              <p className="text-gray-600">Join thousands of satisfied customers</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Global Reach</span>
              </div>
              <div className="w-px h-6 bg-purple-300"></div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Fast Delivery</span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6">
                Contact Us Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export {HSection1, HSection2};