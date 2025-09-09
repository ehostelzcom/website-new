import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logoSvg from '@assets/logo/Asset 3.svg';

export default function ResetPasswordNew() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cnic, setCnic] = useState('');
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  // Get user_id and CNIC from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('user_id');
    const cnicParam = urlParams.get('cnic');
    
    if (userIdParam && cnicParam) {
      setUserId(userIdParam);
      setCnic(cnicParam);
    } else {
      // If no required params, redirect back to verification
      setLocation('/reset-password');
    }
  }, [setLocation]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePassword = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password)
    };
  };

  const passwordValidation = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in both password fields",
        variant: "destructive",
      });
      return;
    }

    if (!isPasswordValid) {
      toast({
        title: "Invalid Password",
        description: "Password must meet all requirements",
        variant: "destructive",
      });
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // API call to update password
      const response = await fetch('/api/reset-password/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          new_password: formData.password
        })
      });
      
      const result = await response.json();
      
      if (result.status && result.code === 200) {
        // Password update successful
        toast({
          title: "Password Reset Successful!",
          description: "Your password has been updated. Please login with your new password.",
        });
        
        // Redirect to login page
        setTimeout(() => {
          setLocation('/student-login');
        }, 2000);
      } else {
        // Password update failed - show the exact Oracle APEX error message
        toast({
          title: "Password Reset Failed",
          description: result.message || 'Password update failed',
          variant: "destructive",
        });
      }
      
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative">
      {/* Top-left Logo */}
      <div className="fixed top-4 left-4 z-10">
        <img 
          src={logoSvg} 
          alt="ehostelz.com" 
          className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
          data-testid="img-logo-corner"
        />
      </div>
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setLocation('/reset-password')}
          data-testid="button-back-to-verify"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Verification
        </Button>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-8">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#004e89] to-[#0066cc] rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-3">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] bg-clip-text text-transparent">
                New Password
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                Create a strong password for CNIC: {cnic}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="h-11 pr-10 border-gray-200 dark:border-gray-700 focus:border-[#0066cc] dark:focus:border-[#0066cc]"
                    data-testid="input-new-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="text-xs space-y-1 mt-2">
                    <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${passwordValidation.minLength ? 'opacity-100' : 'opacity-30'}`} />
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${passwordValidation.hasNumber ? 'opacity-100' : 'opacity-30'}`} />
                      Contains a number
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasLetter ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${passwordValidation.hasLetter ? 'opacity-100' : 'opacity-30'}`} />
                      Contains a letter
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="h-11 pr-10 border-gray-200 dark:border-gray-700 focus:border-[#0066cc] dark:focus:border-[#0066cc]"
                    data-testid="input-confirm-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    data-testid="button-toggle-confirm-password"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className={`text-xs mt-1 ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </div>
                )}
              </div>

              {/* Update Password Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-[#004e89] to-[#0066cc] hover:from-[#003a6b] hover:to-[#0052a3] text-white font-medium transition-all duration-200"
                disabled={isLoading || !isPasswordValid || !passwordsMatch}
                data-testid="button-update-password"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating Password...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Update Password
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}