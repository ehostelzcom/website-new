import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import StudentHeader from "@/components/shared/StudentHeader";
import logoSvg from "@assets/logo/Asset 3.svg";
import { 
  Home as HomeIcon, 
  BarChart3, 
  CreditCard, 
  Receipt, 
  User, 
  Star,
  Key,
  Eye,
  EyeOff,
  Menu
} from "lucide-react";

// Password validation schema
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New password and confirm password must match",
  path: ["confirmPassword"]
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordProps {
  standalone?: boolean;
}

export default function ChangePassword({ standalone = true }: ChangePasswordProps) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to change password
      console.log("Change password data:", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Password changed successfully",
        variant: "default"
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sidebar menu items - same as other dashboard pages
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon, route: "/dashboard" },
    { id: "fees", label: "Fees", icon: Receipt, route: "/fees" },
    { id: "payments", label: "Payments", icon: CreditCard, route: "/payments" },
    { id: "rating", label: "Rating", icon: Star, route: "/rating" },
    { id: "profile", label: "Profile", icon: User, route: "/profile" },
  ];

  const content = (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Key className="w-6 h-6 text-[#004e89]" />
            Change Password
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update your account password. Make sure to use a strong password.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentPassword ? "text" : "password"}
                          className="pr-10 border-gray-200 dark:border-gray-700 focus:border-[#004e89] dark:focus:border-[#004e89]"
                          placeholder="Enter your current password"
                          data-testid="input-current-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          data-testid="toggle-current-password-visibility"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          className="pr-10 border-gray-200 dark:border-gray-700 focus:border-[#004e89] dark:focus:border-[#004e89]"
                          placeholder="Enter your new password"
                          data-testid="input-new-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          data-testid="toggle-new-password-visibility"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                    </div>
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          className="pr-10 border-gray-200 dark:border-gray-700 focus:border-[#004e89] dark:focus:border-[#004e89]"
                          placeholder="Confirm your new password"
                          data-testid="input-confirm-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          data-testid="toggle-confirm-password-visibility"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#004e89] hover:bg-[#003a6b] text-white font-medium py-3 rounded-lg transition-colors"
                  data-testid="button-change-password-submit"
                >
                  {isSubmitting ? "Changing Password..." : "Change Password"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );

  if (standalone) {
    return (
      <div className="flex h-screen bg-gray-50/50 dark:bg-gray-900/50">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white/80 lg:dark:bg-gray-900/80 lg:backdrop-blur-xl lg:border-r lg:border-gray-200 lg:dark:border-gray-700">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <img 
              src={logoSvg} 
              alt="ehostelz.com" 
              className="h-12 w-auto"
              data-testid="img-desktop-logo"
            />
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLocation(item.route)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      item.id === "change-password"
                        ? "bg-gradient-to-r from-[#004e89] to-[#0066b3] text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    data-testid={`button-nav-${item.id}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0 lg:hidden">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <img 
                src={logoSvg} 
                alt="ehostelz.com" 
                className="h-12 w-auto"
                data-testid="img-mobile-logo"
              />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setLocation(item.route);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        item.id === "change-password"
                          ? "bg-gradient-to-r from-[#004e89] to-[#0066b3] text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      data-testid={`button-mobile-nav-${item.id}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Student Header */}
          <StudentHeader 
            title=""
            sidebarItems={sidebarItems}
            activeItemId="change-password"
            onMenuToggle={() => setSidebarOpen(true)}
            showHostelInfo={false}
          />

          {/* Content */}
          <main className="flex-1 p-3 lg:p-4">
            {content}
          </main>
        </div>
      </div>
    );
  }

  return content;
}