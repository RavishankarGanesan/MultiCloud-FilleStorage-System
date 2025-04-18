import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function GoogleDriveConnectButton() {
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error("Google Client ID is not configured.");
      }

      const redirectUri = `${window.location.origin}/api/storage/google/callback`;
      const scope = 'https://www.googleapis.com/auth/drive.file';

      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.append('client_id', clientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', scope);
      authUrl.searchParams.append('access_type', 'offline');
      authUrl.searchParams.append('prompt', 'consent');

      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('Error initiating Google Drive connection:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: error.message || "Failed to connect to Google Drive. Please try again."
      });
    }
  };

  return (
    <Button
      onClick={handleConnect}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      Connect Google Drive
    </Button>
  );
}