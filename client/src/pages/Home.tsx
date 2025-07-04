import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PublicLayout from "@/components/layout/PublicLayout";

const Home = () => {
  return (
    <PublicLayout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <header className="bg-primary text-primary-foreground py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Face Recognition Attendance System
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in">
                Modern, secure, and efficient attendance tracking using advanced facial recognition technology.
              </p>
              <div className="space-x-4 animate-fade-in">
                <Button asChild size="lg" className="hover-scale">
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover-scale">
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Real-time Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Instantly recognize and mark attendance with our advanced facial recognition algorithms.</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Detailed Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Generate comprehensive attendance reports with customizable filters and export options.</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Role-based Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Different interfaces and permissions for Admins, Sub-admins, and Students.</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Mobile Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access and manage attendance from any device with our responsive design.</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Secure Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Advanced encryption and security protocols to protect sensitive biometric data.</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>Dark/Light Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Choose between dark and light themes for comfortable viewing in any environment.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-secondary py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <Carousel className="w-full max-w-lg mx-auto">
                  <CarouselContent>
                    <CarouselItem>
                      <Card>
                        <CardHeader>
                          <CardTitle>Step 1: Registration</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>Register and upload your facial data to the system.</CardDescription>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <CardHeader>
                          <CardTitle>Step 2: Face Recognition</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>Stand in front of the camera for quick authentication.</CardDescription>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <CardHeader>
                          <CardTitle>Step 3: Attendance Marked</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>Your attendance is automatically recorded in the system.</CardDescription>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="lg:-left-12" />
                  <CarouselNext className="lg:-right-12" />
                </Carousel>
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">Simple, Fast & Accurate</h3>
                <p className="mb-6">
                  Our facial recognition system eliminates the need for traditional attendance methods. 
                  No more time-consuming roll calls or easily forged sign-in sheets.
                </p>
                <p className="mb-6">
                  The system uses advanced algorithms to detect and verify identity, 
                  ensuring accurate attendance records while protecting user privacy.
                </p>
                <Button asChild>
                  <Link to="/login" className="flex items-center">
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* User Types Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">For Everyone</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Administrators</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Complete user management</li>
                    <li>Real-time attendance dashboards</li>
                    <li>Comprehensive reporting tools</li>
                    <li>System configuration settings</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sub-Administrators</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Take attendance via face recognition</li>
                    <li>View attendance logs and statistics</li>
                    <li>Generate reports for specific groups</li>
                    <li>Limited user management</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>View personal attendance history</li>
                    <li>Update profile and facial data</li>
                    <li>Check attendance statistics</li>
                    <li>Receive attendance notifications</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of institutions already using our face recognition attendance system.
            </p>
            <Button asChild size="lg" variant="secondary" className="hover-scale">
              <Link to="/login">Sign In Now</Link>
            </Button>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Home;
