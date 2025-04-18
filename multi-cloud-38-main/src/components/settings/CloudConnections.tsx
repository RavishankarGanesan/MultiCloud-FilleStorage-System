
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

export function CloudConnections() {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [onedriveConnected, setOnedriveConnected] = useState(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<'google' | 'onedrive' | null>(null);
  const { toast } = useToast();

  const connectGoogle = () => {
    // In a real app, this would authenticate with Google OAuth flow
    setTimeout(() => {
      setGoogleConnected(true);
      toast({
        title: "Connected to Google Drive",
        description: "Your Google Drive account has been successfully linked.",
      });
    }, 1000);
  };

  const connectOneDrive = () => {
    // In a real app, this would authenticate with Microsoft OAuth flow
    setTimeout(() => {
      setOnedriveConnected(true);
      toast({
        title: "Connected to OneDrive",
        description: "Your OneDrive account has been successfully linked.",
      });
    }, 1000);
  };

  const openDisconnectDialog = (service: 'google' | 'onedrive') => {
    setCurrentService(service);
    setDisconnectDialogOpen(true);
  };

  const disconnectService = () => {
    if (currentService === 'google') {
      setGoogleConnected(false);
      toast({
        title: "Disconnected from Google Drive",
        description: "Your Google Drive account has been unlinked.",
      });
    } else if (currentService === 'onedrive') {
      setOnedriveConnected(false);
      toast({
        title: "Disconnected from OneDrive",
        description: "Your OneDrive account has been unlinked.",
      });
    }
    setDisconnectDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Cloud Storage Connections</h2>
      <p className="text-muted-foreground">
        Connect your cloud storage accounts to access and manage your files from one place.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google Drive Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl">Google Drive</CardTitle>
              <CardDescription>
                Connect to access and manage your Google Drive files
              </CardDescription>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M4.433 22l-1.475-2.555 6.995-12.103h4.088L4.433 22z" fill="#0066da"/>
                <path d="M14.041 22l-1.475-2.555 6.995-12.103h4.088L14.041 22z" fill="#00ac47"/>
                <path d="M9.237 7.34L4.455 0H8.58l9.55 16.527H6.654l2.583-4.468z" fill="#ea4335"/>
              </svg>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={googleConnected ? "default" : "outline"} className="px-2 py-1">
                {googleConnected ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>Not Connected</span>
                  </div>
                )}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {googleConnected 
                ? "Your Google Drive account is connected. You can now access and manage your files." 
                : "Connect your Google Drive account to access and manage your files from MultiCloud."}
            </p>
          </CardContent>
          <CardFooter>
            {googleConnected ? (
              <Button 
                variant="outline" 
                onClick={() => openDisconnectDialog('google')}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                variant="default" 
                onClick={connectGoogle}
              >
                Connect
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* OneDrive Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl">OneDrive</CardTitle>
              <CardDescription>
                Connect to access and manage your OneDrive files
              </CardDescription>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M23.5 13.5c0 2.485-2.017 4.5-4.5 4.5h-15c-2.21 0-4-1.79-4-4 0-1.604.944-3.021 2.322-3.655.017-.091.043-.176.065-.266-.018-.135-.046-.266-.046-.404 0-1.654 1.346-3 3-3 .318 0 .621.063.912.159.77-1.83 2.565-3.116 4.673-3.116 2.419 0 4.467 1.718 4.938 4.012.693-.329 1.457-.535 2.279-.535 2.89 0 5.232 2.342 5.232 5.232 0 .272-.026.535-.063.796.019.002.034.012.052.014 0 .002-.002.003-.002.005.111.01.219.026.328.043.289.641.45 1.346.45 2.091 0 0-.45-1.346-.45-2.091-.111-.017-.217-.033-.328-.043 0-.002.002-.003.002-.005-.018-.002-.033-.012-.052-.014.037-.261.063-.524.063-.796 0-2.89-2.342-5.232-5.232-5.232-.825 0-1.591.207-2.279.538-.471-2.294-2.523-4.014-4.941-4.014-2.107 0-3.902 1.286-4.673 3.118-.291-.099-.594-.161-.912-.161-1.654 0-3 1.346-3 3 0 .338.028.47.046.604-.022.091-.048.177-.065.267-1.378.634-2.322 2.05-2.322 3.656 0 2.21 1.79 4 4 4h15c2.485 0 4.5-2.015 4.5-4.5" fill="#0364b8"/>
              </svg>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={onedriveConnected ? "default" : "outline"} className="px-2 py-1">
                {onedriveConnected ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>Not Connected</span>
                  </div>
                )}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {onedriveConnected 
                ? "Your OneDrive account is connected. You can now access and manage your files." 
                : "Connect your OneDrive account to access and manage your files from MultiCloud."}
            </p>
          </CardContent>
          <CardFooter>
            {onedriveConnected ? (
              <Button 
                variant="outline" 
                onClick={() => openDisconnectDialog('onedrive')}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                variant="default" 
                onClick={connectOneDrive}
              >
                Connect
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      {/* Disconnect Dialog */}
      <Dialog open={disconnectDialogOpen} onOpenChange={setDisconnectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect your {currentService === 'google' ? 'Google Drive' : 'OneDrive'} account? 
              You will no longer be able to access your files from this service.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDisconnectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={disconnectService}
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
