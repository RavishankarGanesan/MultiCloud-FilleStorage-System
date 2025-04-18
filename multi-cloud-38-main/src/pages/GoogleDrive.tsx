import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileExplorer } from "@/components/files/FileExplorer";
import { FileItem } from "@/components/files/types/FileTypes";
import { GoogleDriveConnectButton } from "@/components/storage/GoogleDriveConnectButton";
import { useSearchParams } from "react-router-dom";
import { storageService } from "@/services/storage.service";
import { useToast } from "@/components/ui/use-toast";

export default function GoogleDrive() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Handle OAuth2 callback
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleOAuthCallback(code);
    }
  }, [searchParams]);

  const handleOAuthCallback = async (code: string) => {
    try {
      const response = await storageService.connectGoogleDrive(code);
      setIsConnected(true);
      toast({
        title: "Success",
        description: "Successfully connected to Google Drive!"
      });
      // Remove the code from the URL
      window.history.replaceState({}, '', window.location.pathname);
    } catch (error) {
      console.error('Error connecting to Google Drive:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to Google Drive. Please try again."
      });
    }
  };

  // Check Google Drive connection status
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await storageService.checkGoogleDriveConnection();
      setIsConnected(connected);
    };
    checkConnection();
  }, []);

  // Fetch files when connected
  useEffect(() => {
    const fetchFiles = async () => {
      if (!isConnected) return;
      
      setIsLoading(true);
      try {
        const response = await storageService.getGoogleDriveFiles();
        setFiles(response.files);
      } catch (error) {
        console.error("Error fetching files:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch Google Drive files. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFiles();
  }, [isConnected]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Google Drive</h1>
          <p className="text-muted-foreground">
            View and manage your Google Drive files
          </p>
        </div>
        
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
            <p className="mb-4 text-muted-foreground">Connect your Google Drive account to get started</p>
            <GoogleDriveConnectButton />
          </div>
        ) : (
          <FileExplorer files={files} isLoading={isLoading} />
        )}
      </div>
    </DashboardLayout>
  );
}
