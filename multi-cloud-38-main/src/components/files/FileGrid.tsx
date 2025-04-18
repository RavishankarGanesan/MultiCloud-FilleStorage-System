
import { 
  Card, 
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FileItem } from "./types/FileTypes";
import { FileIcon } from "./FileIcon";
import { FileActions } from "./FileActions";
import { SourceBadge } from "./SourceBadge";

interface FileGridProps {
  files: FileItem[];
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function FileGrid({ files, onDelete, onDownload, onRename }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <Card key={file.id} className="group hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="aspect-square flex items-center justify-center bg-secondary p-6 relative overflow-hidden">
              {file.thumbnail ? (
                <img 
                  src={file.thumbnail} 
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FileIcon fileType={file.type} size={6} />
                  {file.type === 'folder' && (
                    <span className="mt-2 text-sm text-muted-foreground">Folder</span>
                  )}
                </div>
              )}
              <div className="absolute top-2 right-2">
                <SourceBadge source={file.source} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3 flex justify-between items-center">
            <div className="truncate pr-2">
              <p className="font-medium truncate" title={file.name}>{file.name}</p>
              <p className="text-xs text-muted-foreground">{file.size}</p>
            </div>
            <FileActions 
              file={file} 
              onDelete={onDelete} 
              onDownload={onDownload} 
              onRename={onRename}
              buttonClassName="focus-visible:ring-0"
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
