import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileExplorer } from "@/components/files/FileExplorer";
import { FileItem } from "@/components/files/types/FileTypes";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Try to fetch files from localStorage first
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        // Get files from localStorage
        const savedFiles = localStorage.getItem('cloudSync_files');
        
        if (savedFiles) {
          const parsedFiles = JSON.parse(savedFiles);
          setFiles(parsedFiles);
        } else {
          // If no saved files, use the sample data
          const sampleFiles: FileItem[] = [
            {
              id: "1",
              name: "Project Proposal.docx",
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              size: "2.5 MB",
              source: "google-drive",
              modifiedDate: "2023-10-15T14:48:00.000Z"
            },
            {
              id: "2",
              name: "Budget_2023.xlsx",
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              size: "1.8 MB",
              source: "google-drive",
              modifiedDate: "2023-10-10T09:30:00.000Z"
            },
            {
              id: "3",
              name: "Team Photos",
              type: "folder",
              size: "4 items",
              source: "google-drive",
              modifiedDate: "2023-09-28T16:20:00.000Z"
            },
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
              id: "6",
              name: "Client Documentation.pdf",
              type: "application/pdf",
              size: "4.7 MB",
              source: "google-drive",
              modifiedDate: "2023-10-05T15:30:00.000Z"
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
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        toast({
          title: "Error loading files",
          description: "Could not load your files. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFiles();
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">All Files</h1>
          <p className="text-muted-foreground">
            View and manage all your files from Google Drive and OneDrive
          </p>
        </div>
        
        <FileExplorer files={files} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
