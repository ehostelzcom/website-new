import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, User, X } from "lucide-react";

interface Rating {
  rating_id: number;
  score: number;
  description: string;
  comment_suggestions: string;
}

interface Review {
  user_id: number;
  full_name: string;
  ratings: Rating[];
}

interface ReviewsResponse {
  status: string;
  code: number;
  data: Review[];
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostelId: number;
  hostelName: string;
}

export default function ReviewsModal({ isOpen, onClose, hostelId, hostelName }: ReviewsModalProps) {
  const { data: reviewsData, isLoading, error } = useQuery<ReviewsResponse>({
    queryKey: [`/api/hostel-reviews/${hostelId}`],
    enabled: isOpen && !!hostelId,
  });

  const getAverageRating = (ratings: Rating[]) => {
    if (!ratings.length) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.score, 0);
    return (total / ratings.length).toFixed(1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'fill-none text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Reviews for {hostelName}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading reviews...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">Failed to load reviews</p>
          </div>
        ) : !reviewsData?.data?.length ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No reviews available</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviewsData.data.map((review) => (
              <div key={review.user_id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                {/* Reviewer Info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {review.full_name}
                      </h4>
                      <div className="flex items-center gap-1">
                        {renderStars(Math.round(parseFloat(getAverageRating(review.ratings))))}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                          {getAverageRating(review.ratings)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Ratings */}
                <div className="ml-13 space-y-3">
                  {review.ratings.map((rating) => (
                    <div key={rating.rating_id} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {rating.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {renderStars(rating.score)}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {rating.score}/5
                          </span>
                        </div>
                      </div>
                      {rating.comment_suggestions && rating.comment_suggestions !== "No Suggestions" && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                          "{rating.comment_suggestions}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}