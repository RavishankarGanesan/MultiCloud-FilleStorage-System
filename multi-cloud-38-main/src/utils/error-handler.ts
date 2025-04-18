import { toast } from '@/hooks/use-toast';

export const handleApiError = (error: any) => {
  const message = error.response?.data?.message || 'An error occurred';
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive'
  });
};