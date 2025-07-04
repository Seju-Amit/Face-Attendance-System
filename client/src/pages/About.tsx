import React from "react";
import { Link } from "react-router-dom";
import { Users, FileText, Lock, Award, Building, Code, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/layout/PublicLayout";

const AboutPage = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900 text-white py-24 px-6 shadow-lg">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About FaceDetect Attendance System</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Revolutionizing attendance management systems with cutting-edge facial recognition technology
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 px-6 bg-white dark:bg-black transition-colors duration-300 shadow-md">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Mission</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  At FaceDetect Attendance System, we're committed to transforming how organizations manage attendance. Our mission is to provide a secure, 
                  efficient, and user-friendly attendance system that leverages advanced facial recognition technology to eliminate manual processes.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  We believe that by automating attendance tracking, we can help institutions save time, 
                  reduce errors, and focus on what truly matters – education and growth.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl opacity-10 blur-xl dark:opacity-20"></div>
                <div className="relative bg-gradient-to-r from-red-400 to-red-600 rounded-xl p-1 shadow-lg">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg p-8 transition-colors duration-300">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform">
                        <Users className="h-12 w-12 text-red-600 dark:text-red-400 mb-4" />
                        <h3 className="font-bold text-gray-800 dark:text-white">User-Friendly</h3>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform">
                        <Lock className="h-12 w-12 text-red-600 dark:text-red-400 mb-4" />
                        <h3 className="font-bold text-gray-800 dark:text-white">Secure</h3>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform">
                        <FileText className="h-12 w-12 text-red-600 dark:text-red-400 mb-4" />
                        <h3 className="font-bold text-gray-800 dark:text-white">Accurate</h3>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform">
                        <Award className="h-12 w-12 text-red-600 dark:text-red-400 mb-4" />
                        <h3 className="font-bold text-gray-800 dark:text-white">Reliable</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:to-gray-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Story</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                From a small startup to a leading attendance solution provider
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-64 flex-shrink-0">
                  <div className="bg-red-600 dark:bg-red-600 text-white p-4 rounded-lg inline-block shadow-lg">
                    <Building className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">Founded in 2018</h3>
                </div>
                <div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    FaceDetect Attendance System was founded by a team of technology enthusiasts who recognized the inefficiencies in traditional attendance systems. 
                    Starting with a small team of engineers, we developed our first prototype that could recognize faces with 90% accuracy.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-64 flex-shrink-0">
                  <div className="bg-red-600 dark:bg-red-600 text-white p-4 rounded-lg inline-block shadow-lg">
                    <Code className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">Technology Growth</h3>
                </div>
                <div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    By 2020, we had refined our algorithms to achieve 99.5% accuracy in face recognition. Our system became 
                    more robust, capable of processing multiple faces simultaneously, and adaptable to various lighting conditions.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-64 flex-shrink-0">
                  <div className="bg-red-600 dark:bg-red-600 text-white p-4 rounded-lg inline-block shadow-lg">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">Today</h3>
                </div>
                <div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Today, FaceDetect Attendance System serves hundreds of educational institutions and organizations worldwide. 
                    We continue to innovate, focusing on security, privacy, and enhanced user experience, making 
                    attendance management simpler and more efficient than ever before.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 dark:bg-black text-gray-800 dark:text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Meet Our Team</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                The talented individuals behind FaceDetect Attendance System's innovation and success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Amit Seju",
                  role: "Team Leader",
                  image: "/images/team/amit.jpg"
                },
                {
                  name: "Sujal Sanchaniya",
                  role: "Full Stack Developer",
                  image: "/images/team/sujal.jpg"
                },
                {
                  name: "Abhay Vasava",
                  role: "Python Developer",
                  image: "/images/team/abhay.jpg"
                },
                {
                  name: "Priyanshu Khamar",
                  role: "Frontend Developer",
                  image: "/images/team/priyanshu.jpg"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/30 dark:to-black/80 z-10"></div>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className={`w-full h-64 object-cover ${
                        member.name === "Amit Seju" 
                          ? "object-[center_31%]" 
                          : member.name === "Priyanshu Khamar" 
                            ? "object-[center_20%]" 
                            : member.name === "Abhay Vasava"
                              ? "object-[20%_60%] scale-[1.25]"
                              : member.name === "Sujal Sanchaniya"
                                ? "object-center scale-[1.05]"
                                : "object-center"
                      }`}
                    />
                  </div>
                  <div className="p-6 relative bg-white dark:bg-gradient-to-br dark:from-black dark:to-gray-900">
                    <Link to={`/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{member.name}</h3>
                    </Link>
                    <p className="text-red-600 dark:text-red-400 font-medium">{member.role}</p>
                    <div className="mt-3 w-12 h-1 bg-red-500 dark:bg-red-400 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 dark:from-red-900 dark:via-red-800 dark:to-red-950 text-white shadow-lg">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Attendance System?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join hundreds of institutions already using FaceDetect Attendance System to streamline their attendance process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="font-medium bg-white text-red-600 hover:bg-gray-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 shadow-md">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 dark:border-zinc-700 shadow-md">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default AboutPage; 