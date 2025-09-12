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
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  
  const { data: reviewsData, isLoading, error } = useQuery<ReviewsResponse>({
    queryKey: [`/api/hostel-reviews/${hostelId}`],
    enabled: isOpen && !!hostelId,
  });

  const toggleExpanded = (userId: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const getAverageRating = (ratings: Rating[]) => {
    if (!ratings.length) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.score, 0);
    return total / ratings.length;
  };
  
  const formatRating = (rating: number) => rating.toFixed(1);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        // Full star
        return (
          <Star
            key={index}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else if (index === fullStars && hasHalfStar) {
        // Half star using linear gradient
        return (
          <div key={index} className="relative w-4 h-4">
            <Star 
              className="w-4 h-4 text-gray-300 dark:text-gray-600" 
              style={{ fill: 'currentColor' }}
            />
            <Star 
              className="absolute top-0 left-0 w-4 h-4 text-yellow-400"
              style={{ 
                fill: 'currentColor',
                clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)'
              }}
            />
          </div>
        );
      } else {
        // Empty star
        return (
          <Star
            key={index}
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
            style={{ fill: 'currentColor' }}
          />
        );
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Reviews for {hostelName}
          </DialogTitle>
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
            {(reviewsData.data || []).map((review) => (
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
                        {renderStars(getAverageRating(review.ratings))}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                          {formatRating(getAverageRating(review.ratings))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Ratings */}
                <div className="ml-13 space-y-3">
                  {/* Show first rating by default */}
                  {review.ratings.length > 0 && (
                    <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {review.ratings[0].description}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {renderStars(review.ratings[0].score)}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {review.ratings[0].score}/5
                          </span>
                        </div>
                      </div>
                      {review.ratings[0].comment_suggestions && review.ratings[0].comment_suggestions !== "No Suggestions" && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                          "{review.ratings[0].comment_suggestions}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Show more/less toggle if there are more than 1 rating */}
                  {review.ratings.length > 1 && (
                    <div className="ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          toggleExpanded(review.user_id);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium hover:underline transition-colors"
                      >
                        {expandedReviews.has(review.user_id) 
                          ? `Show less` 
                          : `Show ${review.ratings.length - 1} more ratings`
                        }
                      </button>
                    </div>
                  )}

                  {/* Show remaining ratings when expanded */}
                  {expandedReviews.has(review.user_id) && (review.ratings || []).slice(1).map((rating) => (
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