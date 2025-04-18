
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { FileItem } from "./types/FileTypes";
import { FileIcon } from "./FileIcon";
import { FileActions } from "./FileActions";
import { SourceBadge } from "./SourceBadge";

interface FileListProps {
  files: FileItem[];
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function FileList({ files, onDelete, onDownload, onRename }: FileListProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileIcon fileType={file.type} size={4} />
                  <span className="truncate max-w-[200px] inline-block" title={file.name}>
                    {file.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <SourceBadge source={file.source} />
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(file.modifiedDate), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <FileActions 
                  file={file} 
                  onDelete={onDelete} 
                  onDownload={onDownload} 
                  onRename={onRename} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
