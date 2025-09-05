import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useLocation } from "wouter";
import logoSvg from "@assets/logo/Asset 3.svg";

export default function StudentLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Call the student login API
      const response = await fetch("/api/student-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.status && data.code === 200) {
        // Login successful - store user_id in localStorage
        const userId = data.data.user_id;
        localStorage.setItem("student_user_id", userId.toString());
        
        console.log("Login successful:", { userId, username });
        
        // Redirect to hostel dashboard (existing design)
        setLocation("/hostel-dashboard/101");
      } else {
        // Login failed
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <Card className="border-0 shadow-2xl shadow-black/10 dark:shadow-black/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-6 pb-6">
            {/* Logo */}
            <div className="flex justify-center">
              <img 
                src={logoSvg} 
                alt="ehostelz.com" 
                className="h-16 w-auto transition-all duration-300 hover:scale-105 drop-shadow-sm"
                data-testid="img-logo"
              />
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                Student Login
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Access your hostel management dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 h-12 border-gray-200 dark:border-gray-600 focus:border-[#004e89] dark:focus:border-[#004e89] focus:ring-[#004e89] bg-white dark:bg-gray-800 relative z-0"
                    required
                    data-testid="input-username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 border-gray-200 dark:border-gray-600 focus:border-[#004e89] dark:focus:border-[#004e89] focus:ring-[#004e89] bg-white dark:bg-gray-800 relative z-0"
                    required
                    data-testid="input-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-[#004e89] data-[state=checked]:border-[#004e89]"
                  data-testid="checkbox-remember-me"
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading || !username || !password}
                className="w-full h-12 bg-gradient-to-r from-[#004e89] to-[#0066b3] hover:from-[#003a6b] hover:to-[#004e89] text-white font-semibold shadow-lg shadow-[#004e89]/25 hover:shadow-xl hover:shadow-[#004e89]/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                data-testid="button-login"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="text-center space-y-4 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Forgot your password?{" "}
                <button className="text-[#004e89] hover:text-[#003a6b] font-medium transition-colors">
                  Reset here
                </button>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need help?{" "}
                <button 
                  onClick={() => setLocation("/#contact")}
                  className="text-[#ff6b35] hover:text-[#e55a2b] font-medium transition-colors"
                >
                  Contact Support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 ehostelz.com. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}