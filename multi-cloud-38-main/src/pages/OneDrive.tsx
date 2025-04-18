
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileExplorer } from "@/components/files/FileExplorer";
import { FileItem } from "@/components/files/types/FileTypes";

export default function OneDrive() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data - in a real app, this would come from an API
        const sampleFiles: FileItem[] = [
          {
            id: "4",
            name: "Presentation.pptx",
            type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            size: "5.2 MB",
            source: "onedrive",
            modifiedDate: "2023-10-12T11:15:00.000Z"
          },
          {
            id: "5",
            name: "profile-picture.jpg",
            type: "image/jpeg",
            size: "3.1 MB",
            source: "onedrive",
            modifiedDate: "2023-10-18T08:45:00.000Z",
            thumbnail: "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?q=80&w=2340&auto=format&fit=crop"
          },
          {
            id: "7",
            name: "Meeting Notes.txt",
            type: "text/plain",
            size: "12 KB",
            source: "onedrive",
            modifiedDate: "2023-10-17T13:20:00.000Z"
          },
          {
            id: "8",
            name: "Project Resources",
            type: "folder",
            size: "7 items",
            source: "onedrive",
            modifiedDate: "2023-09-30T10:05:00.000Z"
          }
        ];
        
        setFiles(sampleFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFiles();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">OneDrive</h1>
          <p className="text-muted-foreground">
            View and manage your OneDrive files
          </p>
        </div>
        
        <FileExplorer files={files} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
