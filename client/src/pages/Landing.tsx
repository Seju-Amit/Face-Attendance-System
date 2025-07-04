import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, CheckCircle, Database, FastForward, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/layout/Hero";
import PublicLayout from "@/components/layout/PublicLayout";

// Feature card component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1">
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

// Testimonial component
const Testimonial = ({ content, author, role, company }: { content: string, author: string, role: string, company: string }) => (
  <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center mb-4 gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.99984 1.66675L12.5748 6.88341L18.3332 7.72508L14.1665 11.7834L15.1498 17.5167L9.99984 14.8084L4.84984 17.5167L5.83317 11.7834L1.6665 7.72508L7.42484 6.88341L9.99984 1.66675Z"
            fill="#8B5CF6"
          />
        </svg>
      ))}
    </div>
    <p className="mb-4 text-foreground italic">{content}</p>
    <div>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-muted-foreground">{role}, {company}</p>
    </div>
  </div>
);

const Landing = () => {
  return (
    <PublicLayout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Advanced Attendance Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                FaceDetect brings cutting-edge facial recognition technology to simplify and secure your attendance management
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Camera className="h-6 w-6 text-primary" />}
                title="Facial Recognition"
                description="Accurate biometric identification using advanced AI algorithms to ensure foolproof attendance tracking"
              />
              <FeatureCard
                icon={<FastForward className="h-6 w-6 text-primary" />}
                title="Fast Processing"
                description="Real-time recognition for quick attendance marking, saving time for both students and administrators"
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-primary" />}
                title="High Security"
                description="Prevents proxy attendance with live face detection and anti-spoofing technology"
              />
              <FeatureCard
                icon={<Database className="h-6 w-6 text-primary" />}
                title="Data Analytics"
                description="Comprehensive dashboards and reports to analyze attendance patterns and trends"
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-primary" />}
                title="Multi-role Support"
                description="Different views and permissions for students, faculty, admins, and sub-admins"
              />
              <FeatureCard
                icon={<CheckCircle className="h-6 w-6 text-primary" />}
                title="Automated Alerts"
                description="Automatic notifications for absent students, low attendance, and other custom triggers"
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Trusted by Educational Institutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See what our clients have to say about FaceDetect Attendance System
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Testimonial
                content="FaceDetect has transformed how we track attendance. The system is incredibly accurate and has saved our faculty hours of administrative work each week."
                author="Dr. Sarah Johnson"
                role="Dean"
                company="Tech University"
              />
              <Testimonial
                content="The analytics and reporting features have given us valuable insights into attendance patterns. We've been able to improve student engagement significantly."
                author="Prof. Michael Chen"
                role="Department Head"
                company="National College"
              />
              <Testimonial
                content="Implementation was smooth and the support team was incredibly helpful. Our students adapted quickly and appreciate the streamlined process."
                author="Jennifer Williams"
                role="IT Director"
                company="Innovation Academy"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your attendance system?</h2>
              <p className="mb-8 opacity-90">
                Join hundreds of educational institutions using FaceDetect to streamline their attendance process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="font-medium gap-2">
                  <Link to="/login">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10">
                  <Link to="/contact">Request a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Landing; 