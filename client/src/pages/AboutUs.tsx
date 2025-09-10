import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoUrl from "@assets/logo/Asset 3.svg";
import { 
  Building2, 
  Users, 
  Search, 
  Smartphone, 
  CreditCard, 
  Target, 
  Calendar,
  Code,
  Home,
  TrendingUp
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section with Logo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <img src={logoUrl} alt="ehostelz.com Logo" className="w-40 h-auto" data-testid="about-logo" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6" data-testid="page-title">
            About ehostelz.com
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-2xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed" data-testid="main-description">
            Pakistan's Largest Online Hostels Portal connecting hostel owners with their students and providing easy hostel finder facility for students
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 border-none shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-8 h-8 mr-3" />
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-xl leading-relaxed italic">
              "Find Faster, Manage Smarter"
            </p>
            <p className="text-lg mt-4 opacity-90">
              Empowering students to find hostels faster and enabling owners to manage their properties smarter and more efficiently
            </p>
          </CardContent>
        </Card>

        {/* What We Provide Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-testid="services-title">
            What We Provide
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Building2 className="w-10 h-10 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">For Hostel Owners</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Complete hostel management system
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Single login to manage multiple hostels
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Student registration and allotment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Fees and payments management
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Employee salary and expense tracking
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Monthly and yearly reports
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Users className="w-10 h-10 text-purple-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">For Students</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Easy hostel finder by city and location
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Single login for complete hostel history
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Personal dashboard with all records
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Complete hostel life journey tracking
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    View all previous and current hostels
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Access to comprehensive history since registration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Founder Story Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-testid="founder-title">
            Founder's Story
          </h2>
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="lg:w-1/4 text-center lg:text-left">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                    <span className="text-3xl font-bold text-white">KK</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2" data-testid="founder-name">Khalid Khan</h3>
                  <Badge variant="secondary" className="mb-4">Founder & CEO</Badge>
                  <div className="flex items-center justify-center lg:justify-start text-gray-600 mb-2">
                    <Code className="w-4 h-4 mr-2" />
                    <span>Senior Software Developer</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Since 2014</span>
                  </div>
                </div>
                
                <div className="lg:w-3/4">
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-6">
                      I am a Senior Software Developer with over a decade of experience since 2014. My journey into hostel management began when I started my own hostel, <strong>Smart Hostel</strong> in Mardan, back in 2020.
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                      <div className="flex items-center mb-3">
                        <Home className="w-6 h-6 text-blue-600 mr-2" />
                        <h4 className="text-xl font-semibold text-blue-800">The Challenge</h4>
                      </div>
                      <p className="text-blue-700">
                        Initially, we were managing all hostel activities manually - student registration, room allotments, fee collections, payment tracking, employee salaries, expenses, and generating monthly and yearly reports. The manual process was time-consuming and prone to errors.
                      </p>
                    </div>

                    <p className="mb-6">
                      Recognizing the need for a comprehensive solution, I began developing specialized software in 2022 to streamline these operations. Day by day, the software evolved and matured, incorporating feedback and addressing real-world challenges faced by hostel management.
                    </p>

                    <div className="bg-purple-50 p-6 rounded-lg mb-6">
                      <div className="flex items-center mb-3">
                        <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
                        <h4 className="text-xl font-semibold text-purple-800">The Vision Expands</h4>
                      </div>
                      <p className="text-purple-700">
                        Once the software was fully developed and proven successful, I realized its potential to help other hostel owners. Why not transform it into a comprehensive solution for the entire hostel industry? This led to the creation of a platform that could serve both individual hostels and chains of hostels.
                      </p>
                    </div>

                    <p className="mb-6">
                      I then expanded the platform to include a student portal, creating a dual-purpose solution that benefits both hostel owners and students. Continuous development and enhancement have led to this comprehensive website platform.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Plans Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-testid="future-title">
            Future Plans
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Smartphone className="w-10 h-10 text-green-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Mobile Application</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Phase 1: Student Focus</h4>
                    <p className="text-green-700">Student login functionality and comprehensive hostel finder features for both Android and iOS platforms.</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Phase 2: Owner Integration</h4>
                    <p className="text-blue-700">Complete owner-related features and management tools integrated into the mobile application.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-10 h-10 text-orange-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Online Payment Integration</h3>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-orange-700 leading-relaxed">
                    We are planning to introduce secure online payment options, allowing students to pay their monthly fees conveniently through both the website and mobile application from their personal portals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Journey</h2>
          <div className="space-y-8">
            {[
              { year: "2014", title: "Started Software Development Career", description: "Khalid Khan began his journey as a software developer", color: "blue" },
              { year: "2020", title: "Smart Hostel Established", description: "Founded Smart Hostel in Mardan, experiencing manual management challenges", color: "green" },
              { year: "2022", title: "Software Development Begins", description: "Started developing hostel management software to solve real-world problems", color: "purple" },
              { year: "2023-2024", title: "Software Maturation", description: "Continuous development, testing, and refinement of the platform", color: "orange" },
              { year: "2025", title: "Platform Launch", description: "Launch of ehostelz.com - comprehensive hostel management platform", color: "red" }
            ].map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className={`w-4 h-4 rounded-full bg-${milestone.color}-500 mt-2 mr-6 flex-shrink-0`}></div>
                <div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${milestone.color}-100 text-${milestone.color}-800 mb-2`}>
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">Join the Revolution</h2>
            <p className="text-xl mb-6 opacity-90">
              Experience the future of hostel management with ehostelz.com
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/student-login" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                data-testid="student-cta"
              >
                Student Portal
              </a>
              <a 
                href="/" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                data-testid="owner-cta"
              >
                For Hostel Owners
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}