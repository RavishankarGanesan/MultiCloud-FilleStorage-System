
import { Button } from "@/components/ui/button";
import { FileItem, UploadingFile } from "./FileItem";

interface UploadingFilesListProps {
  files: UploadingFile[];
  onRemoveFile: (fileId: string) => void;
  onClearCompleted: () => void;
}

export function UploadingFilesList({ 
  files, 
  onRemoveFile, 
  onClearCompleted 
}: UploadingFilesListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-medium">Uploading {files.length} files</h3>
      <div className="space-y-3">
        {files.map((file) => (
          <FileItem 
            key={file.id} 
            file={file} 
            onRemove={onRemoveFile} 
          />
        ))}
      </div>
      
      {files.some(file => file.status === 'completed') && (
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={onClearCompleted}
          >
            Clear Completed
          </Button>
        </div>
      )}
    </div>
  );
}
