import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StudentHeader from "@/components/shared/StudentHeader";
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
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  id: string;
  question: string;
  rating: number;
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

  // Rating questions
  const [ratingQuestions, setRatingQuestions] = useState<RatingQuestion[]>([
    { id: 'cleanliness', question: 'How would you rate the cleanliness of the hostel?', rating: 0 },
    { id: 'food_quality', question: 'How would you rate the food quality?', rating: 0 },
    { id: 'room_comfort', question: 'How comfortable are the rooms?', rating: 0 },
    { id: 'staff_behavior', question: 'How would you rate the staff behavior?', rating: 0 },
    { id: 'facilities', question: 'How would you rate the hostel facilities?', rating: 0 },
    { id: 'security', question: 'How would you rate the security arrangements?', rating: 0 },
    { id: 'wifi_internet', question: 'How would you rate the WiFi and internet connectivity?', rating: 0 },
    { id: 'overall', question: 'Overall, how would you rate this hostel?', rating: 0 }
  ]);

  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const updateRating = (questionId: string, rating: number) => {
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
    // Check if all ratings are filled
    const unratedQuestions = ratingQuestions.filter(q => q.rating === 0);
    if (unratedQuestions.length > 0) {
      toast({
        title: "Incomplete Rating",
        description: "Please rate all categories before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the rating data to your API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Rating Submitted",
        description: "Thank you for your feedback! Your rating has been submitted successfully.",
      });

      // Reset form
      setRatingQuestions(prev => prev.map(q => ({ ...q, rating: 0 })));
      setAdditionalComments('');
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit your rating. Please try again.",
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Student Header */}
      <StudentHeader 
        title="Hostel Rating"
        sidebarItems={sidebarItems}
        activeItemId="rating"
        onMenuToggle={() => {}}
        hostelInfo={hostelInfo}
        showHostelInfo={showHostelInfo}
      />

      {/* Page Content */}
      <div className="p-4 lg:p-6 space-y-6">
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
          <CardHeader>
            <CardTitle>Please rate your experience</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your feedback helps us improve our services. Please rate each category from 1 to 5 stars.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Questions - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - First 4 Questions */}
              <div className="space-y-6">
                {ratingQuestions.slice(0, 4).map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label className="text-sm font-medium">{question.question}</Label>
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
              
              {/* Right Column - Last 4 Questions */}
              <div className="space-y-6">
                {ratingQuestions.slice(4, 8).map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label className="text-sm font-medium">{question.question}</Label>
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

            {/* Additional Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-sm font-medium">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="comments"
                placeholder="Share any additional feedback or suggestions..."
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                rows={4}
                data-testid="textarea-comments"
              />
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
      </div>
    </div>
  );
}