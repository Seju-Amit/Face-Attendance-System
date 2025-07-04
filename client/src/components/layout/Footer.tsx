import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Linkedin, Send, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Logo from "./Logo";

const Footer = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFeedback({ name: "", email: "", message: "" });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <footer className="bg-white dark:bg-black text-gray-800 dark:text-white shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo and Email - Col 1 */}
          <div className="md:col-span-3 space-y-8">
            <Logo variant="default" className="transform-none" />
            <div className="text-lg">
              <a href="mailto:info@facedetect.com" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                info@facedetect.com
              </a>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-2 pt-4">
              <a 
                href="https://twitter.com/facedetect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 dark:bg-red-700 p-2 w-10 h-10 flex items-center justify-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors shadow-md rounded-full"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-white" />
              </a>
              <a 
                href="https://facebook.com/facedetect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 dark:bg-red-700 p-2 w-10 h-10 flex items-center justify-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors shadow-md rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a 
                href="https://instagram.com/facedetect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 dark:bg-red-700 p-2 w-10 h-10 flex items-center justify-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors shadow-md rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a 
                href="https://youtube.com/@facedetect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 dark:bg-red-700 p-2 w-10 h-10 flex items-center justify-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors shadow-md rounded-full"
                aria-label="YouTube"
              >
                <Youtube size={18} className="text-white" />
              </a>
              <a 
                href="https://linkedin.com/company/facedetect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 dark:bg-red-700 p-2 w-10 h-10 flex items-center justify-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors shadow-md rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Locations - Col 2 */}
          <div className="md:col-span-2">
            <h3 className="text-red-600 dark:text-red-500 font-medium text-xl mb-6">Ahmedabad</h3>
            <address className="not-italic mb-4 text-lg text-gray-700 dark:text-gray-300">
              L D College Of Eng, Hostel C -334<br />
              Ahmedabad, GJ 380009
            </address>
            <div className="text-lg text-gray-700 dark:text-gray-300">(+91) 63510-24477</div>
          </div>
          
          {/* Locations - Col 3 */}
          <div className="md:col-span-2">
            <h3 className="text-red-600 dark:text-red-500 font-medium text-xl mb-6">Gandhinagar</h3>
            <address className="not-italic mb-4 text-lg text-gray-700 dark:text-gray-300">
              GiftCity, Sector 11<br />
              Gandhinagar, GJ 382421
            </address>
            <div className="text-lg text-gray-700 dark:text-gray-300">(+91) 95374-80134</div>
          </div>
          
          {/* Links - Col 4 */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-red-600 dark:text-red-500 font-medium text-xl mb-6">Quick Links</h3>
            <Link to="/about" className="block text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium text-lg">
              About Us
            </Link>
            <Link to="/privacy" className="block text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium text-lg">
              Privacy Policy
            </Link>
            <Link to="/terms" className="block text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium text-lg">
              Terms of Service
            </Link>
            <Link to="/help" className="block text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium text-lg">
              Help & Support
            </Link>
          </div>
          
          {/* Feedback Form - Col 5 */}
          <div className="md:col-span-3">
            <h3 className="text-red-600 dark:text-red-500 font-medium text-xl mb-6">Send Feedback</h3>
            
            {submitted ? (
              <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 dark:border-green-700 rounded-lg shadow-md">
                <p className="text-green-700 dark:text-green-400 font-medium">Thank you for your feedback!</p>
                <p className="text-gray-700 dark:text-white/70 text-sm mt-2">We appreciate your input and will review it shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={feedback.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 focus:border-red-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={feedback.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 focus:border-red-500"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={feedback.message}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/50 focus:border-red-500 min-h-[100px]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 gap-2 shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                  <Send size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>
        
        {/* Legal Information */}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-neutral-800 text-base text-gray-600 dark:text-gray-400">
          <div className="md:flex md:justify-between">
            <p>
              This website is operated and maintained by SecureTech Solutions
              dba FaceDetect Attendance System, a Registered Technology Provider.
            </p>
            <p className="mt-6 md:mt-0">
              The information provided by the content on this site is
              educational only and is not personal tech or data advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 