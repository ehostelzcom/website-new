import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface UserData {
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

interface UserResponse {
  status: boolean;
  code: number;
  data: UserData;
}

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);

  // Check localStorage for student_user_id on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('student_user_id');
    setUserId(storedUserId);
  }, []);

  // Fetch user data if user is logged in
  const { data: userResponse, isLoading } = useQuery<UserResponse>({
    queryKey: ['/api/student-hostels', userId],
    enabled: !!userId,
    retry: false,
  });

  const isAuthenticated = !!userId && !!userResponse?.data;
  const user = userResponse?.data || null;

  return {
    user,
    isLoading,
    isAuthenticated,
    userId,
  };
}