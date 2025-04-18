
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  FolderIcon, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Upload
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { authService } from '@/services/auth.service';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Close sidebar by default on mobile
  const shouldShowSidebar = isSidebarOpen && !isMobile;
  
  // Sidebar width adjustment
  const sidebarWidth = shouldShowSidebar ? 'w-64' : 'w-0';
  const mainWidth = shouldShowSidebar ? 'ml-64' : 'ml-0';
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-20 h-full bg-sidebar border-r border-border transition-all duration-300 ${sidebarWidth} overflow-hidden`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className="flex items-center">
            <Cloud className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-semibold text-foreground">CloudSync</h1>
          </div>
        </div>
        
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full justify-start mb-6"
            onClick={() => navigate('/dashboard/upload')}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
          
          <nav className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate('/dashboard')}
            >
              <FolderIcon className="h-4 w-4 mr-2" />
              All Files
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate('/dashboard/google-drive')}
            >
              <div className="h-4 w-4 mr-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16">
                  <path d="M4.433 22l-1.475-2.555 6.995-12.103h4.088L4.433 22z" fill="#0066da"/>
                  <path d="M14.041 22l-1.475-2.555 6.995-12.103h4.088L14.041 22z" fill="#00ac47"/>
                  <path d="M9.237 7.34L4.455 0H8.58l9.55 16.527H6.654l2.583-4.468z" fill="#ea4335"/>
                </svg>
              </div>
              Google Drive
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/onedrive')}
            >
              <div className="h-4 w-4 mr-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16">
                  <path d="M23.5 13.5c0 2.485-2.017 4.5-4.5 4.5h-15c-2.21 0-4-1.79-4-4 0-1.604.944-3.021 2.322-3.655.017-.091.043-.176.065-.266-.018-.135-.046-.266-.046-.404 0-1.654 1.346-3 3-3 .318 0 .621.063.912.159.77-1.83 2.565-3.116 4.673-3.116 2.419 0 4.467 1.718 4.938 4.012.693-.329 1.457-.535 2.279-.535 2.89 0 5.232 2.342 5.232 5.232 0 .272-.026.535-.063.796.019.002.034.012.052.014 0 .002-.002.003-.002.005.111.01.219.026.328.043.289.641.45 1.346.45 2.091 0 0-.45-1.346-.45-2.091-.111-.017-.217-.033-.328-.043 0-.002.002-.003.002-.005-.018-.002-.033-.012-.052-.014.037-.261.063-.524.063-.796 0-2.89-2.342-5.232-5.232-5.232-.825 0-1.591.207-2.279.538-.471-2.294-2.523-4.014-4.941-4.014-2.107 0-3.902 1.286-4.673 3.118-.291-.099-.594-.161-.912-.161-1.654 0-3 1.346-3 3 0 .338.028.47.046.604-.022.091-.048.177-.065.267-1.378.634-2.322 2.05-2.322 3.656 0 2.21 1.79 4 4 4h15c2.485 0 4.5-2.015 4.5-4.5" fill="#0364b8"/>
                </svg>
              </div>
              OneDrive
            </Button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/login')}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainWidth}`}>
        {/* Header */}
        <header className="h-16 border-b border-border bg-background z-10 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Update the logout button onClick handler
  <Button 
    variant="ghost" 
    className="w-full justify-start"
    onClick={handleLogout}
  >
    <LogOut className="h-4 w-4 mr-2" />
    Logout
  </Button>
}
