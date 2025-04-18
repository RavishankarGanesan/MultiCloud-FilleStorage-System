
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CloudConnections } from "@/components/settings/CloudConnections";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and cloud storage connections
          </p>
        </div>
        
        <Tabs defaultValue="clouds" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="clouds">Cloud Connections</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clouds">
            <CloudConnections />
          </TabsContent>
          
          <TabsContent value="account">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Account Settings</h2>
              <p className="text-muted-foreground">
                Manage your account information and security settings.
              </p>
              
              <div className="bg-secondary/50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Account settings panel will be available soon</h3>
                <p className="text-muted-foreground">
                  Account management functionality is currently under development
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Preferences</h2>
              <p className="text-muted-foreground">
                Customize your MultiCloud experience.
              </p>
              
              <div className="bg-secondary/50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Preferences panel will be available soon</h3>
                <p className="text-muted-foreground">
                  User preferences functionality is currently under development
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
