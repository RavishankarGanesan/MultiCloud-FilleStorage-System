
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (files: FileList | null) => void;
}

export function DropZone({ 
  isDragging, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onFileSelect 
}: DropZoneProps) {
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center hover:bg-secondary/20 transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-border'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-1">Drag & Drop your files here</h3>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse your device
        </p>
        <input
          type="file"
          multiple
          onChange={(e) => onFileSelect(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button>Select Files</Button>
        </label>
      </div>
    </div>
  );
}
