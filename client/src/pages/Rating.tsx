import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StudentHeader from "@/components/shared/StudentHeader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Star,
  Building2,
  MapPin,
  Phone,
  Home as HomeIcon, 
  BarChart3, 
  CreditCard, 
  Receipt, 
  User,
  Send,
  Menu
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoSvg from "@assets/logo/Asset 3.svg";

// Types for student hostel data (matches API response)
interface StudentHostelData {
  user_id: number;
  hostel_id: number;
  hostel_name: string;
  hostel_type: string;
  hostel_address: string;
  hostel_city_name: string;
  hostel_mobile_no: string;
  presenter_name: string;
  user_mobile_no: string;
  user_role: string;
  user_role_id: number;
  user_city_name: string;
  user_cnic: string;
  user_address: string;
  mime_type: string;
  file_name: string;
  presenter_image_url: string;
  student_hostel_status: string;
}

interface StudentHostelResponse {
  status: boolean;
  code: number;
  data: StudentHostelData;
}

interface RatingQuestion {
  id: number;
  description: string;
  rating: number;
}

interface RatingQuestionsResponse {
  status: boolean;
  code: number;
  data: Array<{
    id: number;
    description: string;
  }>;
}

interface ExistingRatingsResponse {
  status: boolean;
  code: number;
  ratings: Array<{
    rating_id: number;
    score: number;
  }>;
  COMMENT_SUGGESTIONS?: string; // Comments returned as separate field
}

interface HostelInfo {
  hostel_id: number;
  hostel_name: string;
  hostel_type: string;
  hostel_address: string;
  hostel_city_name: string;
  hostel_mobile_no: string;
  presenter_name: string;
  user_role: string;
}

export default function Rating() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get user data from localStorage for API calls
  const studentUserId = localStorage.getItem('student_user_id');
  const hostelId = localStorage.getItem('hostel_id');
  const finalStudentUserId = studentUserId || '101';
  const finalHostelId = hostelId || '2';

  // Fetch hostel information
  const { data: hostelData } = useQuery<StudentHostelResponse>({
    queryKey: ['/api/student-hostels', finalStudentUserId],
    enabled: !!finalStudentUserId
  });

  // Fetch rating questions from API
  const { data: ratingsQuestionsData, isLoading: questionsLoading } = useQuery<RatingQuestionsResponse>({
    queryKey: ['rating-questions'],
    queryFn: async () => {
      const response = await fetch('/api/rating-questions');
      if (!response.ok) {
        throw new Error('Failed to fetch rating questions');
      }
      return response.json();
    }
  });

  // Fetch existing ratings for this user/hostel
  const { data: existingRatingsData, isLoading: ratingsLoading } = useQuery<ExistingRatingsResponse>({
    queryKey: ['existing-ratings', finalStudentUserId, finalHostelId],
    queryFn: async () => {
      const response = await fetch(`/api/hostel-ratings/${finalStudentUserId}/${finalHostelId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch existing ratings');
      }
      return response.json();
    },
    enabled: !!finalStudentUserId && !!finalHostelId,
  });

  // Initialize rating questions with fetched data
  const [ratingQuestions, setRatingQuestions] = useState<RatingQuestion[]>([]);
  
  // Update questions when API data is loaded and populate existing ratings
  useEffect(() => {
    if (ratingsQuestionsData?.data) {
      // Filter out question ID 100 (Additional Comments) from star rating questions
      const starRatingQuestions = ratingsQuestionsData.data.filter(q => q.id !== 100);
      
      const questionsWithRatings = starRatingQuestions.map(q => {
        // Find existing rating for this question (only numeric ratings)
        const existingRating = existingRatingsData?.ratings?.find(r => r.rating_id === q.id);
        return {
          id: q.id,
          description: q.description,
          rating: existingRating && typeof existingRating.score === 'number' ? existingRating.score : 0
        };
      });
      setRatingQuestions(questionsWithRatings);
      
      // Handle additional comments (question ID 100)
      const commentsQuestion = ratingsQuestionsData.data.find(q => q.id === 100);
      if (commentsQuestion) {
        // Check if comments are returned from API, otherwise use default
        if (existingRatingsData?.COMMENT_SUGGESTIONS) {
          setAdditionalComments(existingRatingsData.COMMENT_SUGGESTIONS);
        } else {
          // Use the description from API as default value ("No suggestions")
          setAdditionalComments(commentsQuestion.description);
        }
      }
    }
  }, [ratingsQuestionsData, existingRatingsData]);

  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items
  const sidebarItems = [
    { id: "home", label: "Home", icon: HomeIcon, route: "/home" },
    { id: "dashboard", label: "Dashboard", icon: BarChart3, route: "/dashboard" },
    { id: "fees", label: "Fees", icon: CreditCard, route: "/fees" },
    { id: "payments", label: "Payments", icon: Receipt, route: "/payments" },
    { id: "rating", label: "Rating", icon: Star, route: "/rating" },
    { id: "profile", label: "Profile", icon: User, route: "/home" },
  ];

  // Update rating for a specific question
  const updateRating = (questionId: number, rating: number) => {
    setRatingQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, rating } : q)
    );
  };

  // Render star rating component
  const StarRating = ({ rating, onRatingChange }: { rating: number, onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-colors"
            data-testid={`star-${star}`}
          >
            <Star 
              className={`w-6 h-6 ${
                star <= rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check if at least 3 ratings are filled (minimum requirement)
    const completedRatings = ratingQuestions.filter(q => q.rating > 0);
    if (completedRatings.length < 3) {
      toast({
        title: "Minimum Ratings Required",
        description: "Please provide at least 3 ratings before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Check if additional comments field is filled (mandatory)
    if (!additionalComments.trim()) {
      toast({
        title: "Additional Comments Required",
        description: "Please provide additional comments or suggestions.",
        variant: "destructive",
      });
      return;
    }

    // Validate comments length (max 1000 characters)
    if (additionalComments.trim().length > 1000) {
      toast({
        title: "Comments Too Long",
        description: "Additional comments must be 1000 characters or less.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare ratings data for API submission
      const ratingsData = completedRatings.map(q => ({
        rating_id: q.id,
        score: q.rating
      }));

      // Add rating ID 100 with fixed score of 5 (always required now)
      ratingsData.push({
        rating_id: 100,
        score: 5 // Fixed score for comments rating
      });

      const payload = {
        user_id: parseInt(finalStudentUserId),
        hostel_id: parseInt(finalHostelId),
        ratings: ratingsData,
        COMMENT_SUGGESTIONS: additionalComments.trim() // Separate field for comment text
      };

      console.log('Submitting rating payload:', payload);

      // Submit rating to API
      const response = await fetch('/api/hostel-rating/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        let errorData;
        try {
          const responseText = await response.text();
          console.log('Error response text:', responseText);
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          errorData = { message: 'Failed to submit rating' };
        }
        throw new Error(errorData.message || 'Failed to submit rating');
      }

      let result;
      try {
        const responseText = await response.text();
        console.log('Success response text:', responseText);
        result = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('Error parsing success response:', parseError);
        result = { success: true, message: 'Rating submitted successfully' };
      }
      
      console.log('Rating submission successful:', result);
      
      toast({
        title: "Rating Submitted Successfully",
        description: `Thank you for your feedback! You rated ${completedRatings.length} categories.`,
      });

      // Invalidate and refetch existing ratings to show updated data
      await queryClient.invalidateQueries({
        queryKey: ['existing-ratings', finalStudentUserId, finalHostelId]
      });
      
      // Don't clear comments - they will be updated from API data
      
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit your rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare hostel info for header
  const hostelInfo: HostelInfo | undefined = hostelData?.data ? {
    hostel_id: hostelData.data.hostel_id,
    hostel_name: hostelData.data.hostel_name,
    hostel_type: hostelData.data.hostel_type,
    hostel_address: hostelData.data.hostel_address,
    hostel_city_name: hostelData.data.hostel_city_name,
    hostel_mobile_no: hostelData.data.hostel_mobile_no,
    presenter_name: hostelData.data.presenter_name,
    user_role: hostelData.data.user_role
  } : undefined;

  const showHostelInfo = !!hostelInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <img 
            src={logoSvg} 
            alt="ehostelz.com" 
            className="h-12 w-auto"
            data-testid="img-logo"
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
                    item.id === "rating"
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
                      item.id === "rating"
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
          title="Hostel Rating"
          sidebarItems={sidebarItems}
          activeItemId="rating"
          onMenuToggle={() => setSidebarOpen(true)}
          hostelInfo={hostelInfo}
          showHostelInfo={showHostelInfo}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <HomeIcon className="w-4 h-4" />
          <span>/</span>
          <Star className="w-4 h-4" />
          <span>Rating</span>
        </div>

        {/* Hostel Information Card */}
        {showHostelInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Rate Your Hostel Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{hostelInfo.hostel_name} ({hostelInfo.hostel_type})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{hostelInfo.hostel_city_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{hostelInfo.hostel_mobile_no}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rating Form */}
        <Card>
          <CardContent className="space-y-6">
            {/* Rating Questions - 6 Column + 6 Column Layout */}
            {questionsLoading || ratingsLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Loading Skeleton */}
                {[...Array(8)].map((_, index) => (
                  <div key={index} className={`${index < 4 ? 'lg:col-span-6' : 'lg:col-span-6'} space-y-6`}>
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          ))}
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side - 6 Columns, First half of Questions */}
                <div className="lg:col-span-6 space-y-6">
                  {ratingQuestions.slice(0, Math.ceil(ratingQuestions.length / 2)).map((question) => (
                    <div key={question.id} className="space-y-2">
                      <Label className="text-sm font-medium">{question.description}</Label>
                      <div className="flex items-center gap-3">
                        <StarRating 
                          rating={question.rating}
                          onRatingChange={(rating) => updateRating(question.id, rating)}
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {question.rating > 0 ? `${question.rating}/5` : 'Not rated'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Right Side - 6 Columns, Second half of Questions */}
                <div className="lg:col-span-6 space-y-6">
                  {ratingQuestions.slice(Math.ceil(ratingQuestions.length / 2)).map((question) => (
                    <div key={question.id} className="space-y-2">
                      <Label className="text-sm font-medium">{question.description}</Label>
                      <div className="flex items-center gap-3">
                        <StarRating 
                          rating={question.rating}
                          onRatingChange={(rating) => updateRating(question.id, rating)}
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {question.rating > 0 ? `${question.rating}/5` : 'Not rated'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Comments - Fixed title, pre-filled with API value */}
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-sm font-medium">
                Additional Comments or Suggestions <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="comments"
                placeholder="Share any additional feedback or suggestions..."
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                rows={4}
                maxLength={1000}
                required
                data-testid="textarea-comments"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {additionalComments.length}/1000 characters
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2"
                data-testid="button-submit-rating"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
              </Button>
            </div>
          </CardContent>
        </Card>
        </main>
      </div>
    </div>
  );
}