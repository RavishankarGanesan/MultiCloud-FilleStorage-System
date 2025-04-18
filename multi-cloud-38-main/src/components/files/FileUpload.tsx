
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropZone } from "./DropZone";
import { UploadingFilesList } from "./UploadingFilesList";
import { useFileUpload, setUploadCompleteCallback } from "./hooks/useFileUpload";

interface FileUploadProps {
  onUploadComplete?: () => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const {
    files,
    destination,
    isDragging,
    setDestination,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
    clearCompletedFiles
  } = useFileUpload();

  // Set the callback for upload completion
  if (onUploadComplete) {
    setUploadCompleteCallback(onUploadComplete);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
        <CardDescription>
          Upload files to your cloud storage. Drag and drop files or click to browse.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Destination:</span>
          <Select
            value={destination}
            onValueChange={(value) => setDestination(value as 'google-drive' | 'onedrive')}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select storage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google-drive">Google Drive</SelectItem>
              <SelectItem value="onedrive">OneDrive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <DropZone
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
        />

        <UploadingFilesList 
          files={files} 
          onRemoveFile={removeFile}
          onClearCompleted={clearCompletedFiles}
        />
      </CardContent>
      <CardFooter>
        {/* Footer is handled within UploadingFilesList */}
      </CardFooter>
    </Card>
  );
}
