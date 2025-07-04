import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, X, UserPlus, Mail, Lock, User, Bell, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Effect to handle redirection after successful login
  useEffect(() => {
    if (loginSuccess && user) {
      // Redirect based on user role
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "sub-admin":
          navigate("/subadmin/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
      // Reset the success flag
      setLoginSuccess(false);
    }
  }, [loginSuccess, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      setLoginSuccess(true);
    } catch (error) {
      // Error toast is already shown in login function
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAgreed) {
      toast.error("You must agree to the Terms & Conditions to create an account");
      return;
    }
    
    setIsSignupLoading(true);
    
    try {
      // Here you would typically call a signup function from your auth context
      // For now, we'll just simulate it with a toast message
      toast.success(`Account created for ${signupName}! You can now log in.`);
      
      // Show additional message if user opted for updates
      if (receiveUpdates) {
        toast.info("You've been subscribed to updates and notifications");
      }
      
      // Reset form
      setSignupEmail("");
      setSignupPassword("");
      setSignupName("");
      setTermsAgreed(false);
      setReceiveUpdates(false);
      setIsSignupLoading(false);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      setIsSignupLoading(false);
    }
  };

  const handleDemo = async (role: string) => {
    setIsLoading(true);
    let email = "";
    switch (role) {
      case "admin":
        email = "admin@example.com";
        break;
      case "sub-admin":
        email = "subadmin@example.com";
        break;
      case "student":
        email = "student@example.com";
        break;
      default:
        email = "admin@example.com";
    }
    
    try {
      await login(email, "password");
      setLoginSuccess(true);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Handle close button click
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-8 relative">
      {/* Enhanced close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 z-10 bg-background/70 backdrop-blur-sm hover:bg-red-500 hover:text-white rounded-full transition-all duration-300 shadow-md h-12 w-12 transform hover:scale-110 border border-border/50"
        onClick={handleClose}
        aria-label="Close login page"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="w-full flex flex-col md:flex-row max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden animate-scale-in">
        <div className="w-full md:w-1/2 bg-primary p-8 md:p-12 text-primary-foreground flex flex-col justify-center animated-gradient">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8" />
              <h1 className="text-2xl font-bold">FaceDetect</h1>
            </div>
            <h2 className="text-3xl font-bold">Welcome!</h2>
            <p className="text-lg opacity-90">
              Advanced face recognition attendance system for modern institutions.
            </p>
            <div className="pt-6">
              <p className="text-sm opacity-80">
                For demo purposes, you can login as:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleDemo("admin")}
                  disabled={isLoading}
                >
                  Admin Demo
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleDemo("sub-admin")}
                  disabled={isLoading}
                >
                  Sub-Admin Demo
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleDemo("student")}
                  disabled={isLoading}
                >
                  Student Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Card className="w-full md:w-1/2 border-0 rounded-none">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="space-y-1 pt-6 pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="text-base">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-base">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <TabsContent value="login" className="space-y-4 px-6 pb-6">
              <div className="space-y-2 text-center">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@institution.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="border-border/60"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Password
                    </Label>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm"
                      type="button"
                      onClick={() => toast.info("Password reset functionality would be here")}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="border-border/60"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="text-center mt-4">
                  <Button 
                    variant="link" 
                    className="text-sm hover:text-primary transition-colors"
                    type="button"
                    onClick={handleClose}
                  >
                    Return to Home Page
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 px-6 pb-6">
              <div className="space-y-2 text-center">
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                  Sign up for a new account to get started
                </CardDescription>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    disabled={isSignupLoading}
                    className="border-border/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="example@institution.com"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    disabled={isSignupLoading}
                    className="border-border/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Create Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    disabled={isSignupLoading}
                    className="border-border/60"
                  />
                </div>
                
                {/* Checkbox for Terms & Conditions */}
                <div className="flex items-start space-x-2 mt-6">
                  <Checkbox 
                    id="terms" 
                    checked={termsAgreed}
                    onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                    className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="terms" 
                      className="text-sm font-normal text-muted-foreground cursor-pointer flex gap-1 flex-wrap"
                    >
                      I agree to the
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm text-primary" 
                        type="button"
                        onClick={() => toast.info("Terms & Conditions would be here")}
                      >
                        Terms & Conditions
                      </Button>
                      and
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm text-primary" 
                        type="button"
                        onClick={() => toast.info("Privacy Policy would be here")}
                      >
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>
                </div>
                
                {/* Checkbox for Updates & Notifications */}
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="updates" 
                    checked={receiveUpdates}
                    onCheckedChange={(checked) => setReceiveUpdates(checked === true)}
                    className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="updates" 
                      className="text-sm font-normal text-muted-foreground cursor-pointer flex items-center gap-1"
                    >
                      <span>Keep me updated about new features and updates</span>
                      <Bell className="h-3.5 w-3.5" />
                    </Label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white flex items-center justify-center gap-2 mt-6" 
                  disabled={isSignupLoading}
                >
                  <UserPlus className="h-4 w-4" />
                  {isSignupLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
