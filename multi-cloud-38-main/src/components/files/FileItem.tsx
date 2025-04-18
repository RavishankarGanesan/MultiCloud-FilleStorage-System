
import { X, CheckCircle, AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getHumanReadableSize } from "./utils/fileUtils";

export interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  destination: 'google-drive' | 'onedrive';
  type?: string;
  fileUrl?: string;
}

interface FileItemProps {
  file: UploadingFile;
  onRemove: (fileId: string) => void;
}

export function FileItem({ file, onRemove }: FileItemProps) {
  return (
    <div className="border rounded-md p-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {file.status === 'completed' ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : file.status === 'error' ? (
            <AlertOctagon className="h-4 w-4 text-destructive mr-2" />
          ) : null}
          <span className="font-medium truncate max-w-[200px]" title={file.name}>
            {file.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge cloudProvider={file.destination === 'google-drive' ? 'google' : 'onedrive'}>
            {file.destination === 'google-drive' ? 'Google' : 'OneDrive'}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {getHumanReadableSize(file.size)}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onRemove(file.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <Progress value={file.progress} className="h-1" />
      
      {file.status === 'error' && (
        <p className="text-xs text-destructive mt-2">
          Failed to upload file. Click to retry.
        </p>
      )}
    </div>
  );
}
