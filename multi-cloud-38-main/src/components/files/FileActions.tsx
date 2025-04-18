
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Download, Trash, Edit } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileItem } from "./types/FileTypes";

interface FileActionsProps {
  file: FileItem;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onRename: (id: string, name: string) => void;
  align?: "center" | "end" | "start";
  buttonClassName?: string;
}

export function FileActions({ 
  file, 
  onDelete, 
  onDownload, 
  onRename, 
  align = "end",
  buttonClassName = "h-8 w-8"
}: FileActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={buttonClassName}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-48">
        <DropdownMenuItem onClick={() => onDownload(file.id)}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRename(file.id, file.name)}>
          <Edit className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => onDelete(file.id)} 
          className="text-destructive focus:text-destructive"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
