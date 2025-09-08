import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cnic: '',
    mobile: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cnic || !formData.mobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in both CNIC and mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // API call to verify CNIC and mobile number
      const response = await fetch('/api/reset-password/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.status && result.code === 200) {
        // Verification successful, navigate to new password page
        setLocation('/reset-password/new?cnic=' + encodeURIComponent(formData.cnic));
      } else {
        // Verification failed
        throw new Error(result.message || 'Verification failed');
      }
      
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "CNIC or mobile number not found in our system",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setLocation('/student-login')}
          data-testid="button-back-to-login"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-8">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#004e89] to-[#0066cc] rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-3">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] bg-clip-text text-transparent">
                Reset Password
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                Enter your CNIC and mobile number to verify your account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CNIC Input */}
              <div className="space-y-2">
                <Label htmlFor="cnic" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  CNIC Number
                </Label>
                <Input
                  id="cnic"
                  type="text"
                  placeholder="12345-6789012-3"
                  value={formData.cnic}
                  onChange={(e) => handleInputChange('cnic', e.target.value)}
                  className="h-11 border-gray-200 dark:border-gray-700 focus:border-[#0066cc] dark:focus:border-[#0066cc]"
                  data-testid="input-cnic"
                  required
                />
              </div>

              {/* Mobile Number Input */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="03XX-XXXXXXX"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  className="h-11 border-gray-200 dark:border-gray-700 focus:border-[#0066cc] dark:focus:border-[#0066cc]"
                  data-testid="input-mobile"
                  required
                />
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-[#004e89] to-[#0066cc] hover:from-[#003a6b] hover:to-[#0052a3] text-white font-medium transition-all duration-200"
                disabled={isLoading}
                data-testid="button-verify-account"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Verify Account
                  </div>
                )}
              </Button>
            </form>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need help? Contact your hostel administration
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}