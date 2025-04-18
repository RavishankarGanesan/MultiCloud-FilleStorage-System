import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileGrid } from "./FileGrid";
import { FileItem } from "./types/FileTypes";
import { FileList } from "./FileList";
import {
  Grid,
  List,
  Upload,
  Filter,
  X,
  AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface FileExplorerProps {
  files: FileItem[];
  isLoading?: boolean;
}

export function FileExplorer({ files, isLoading = false }: FileExplorerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file) {
      setSelectedFile(file);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleRename = (id: string, currentName: string) => {
    const file = files.find(f => f.id === id);
    if (file) {
      setSelectedFile(file);
      setNewFileName(currentName);
      setIsRenameDialogOpen(true);
    }
  };

  const handleDownload = (id: string) => {
    const file = files.find(f => f.id === id);

    if (file && file.fileUrl) {
      const a = document.createElement('a');
      a.href = file.fileUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "Download started",
        description: `${file.name} will be downloaded shortly`,
      });
    } else {
      toast({
        title: "Download failed",
        description: "This file cannot be downloaded",
        variant: "destructive"
      });
    }
  };

  const confirmDelete = () => {
    if (selectedFile) {
      const savedFiles = localStorage.getItem('cloudSync_files');
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles);
          const updatedFiles = parsedFiles.filter((f: FileItem) => f.id !== selectedFile.id);
          localStorage.setItem('cloudSync_files', JSON.stringify(updatedFiles));

          window.location.reload();

          toast({
            title: "File deleted",
            description: `${selectedFile.name} has been deleted.`,
          });
        } catch (error) {
          console.error('Failed to delete file', error);
          toast({
            title: "Error deleting file",
            description: "An error occurred while deleting the file.",
            variant: "destructive"
          });
        }
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const confirmRename = () => {
    if (selectedFile && newFileName.trim()) {
      const savedFiles = localStorage.getItem('cloudSync_files');
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles);
          const updatedFiles = parsedFiles.map((f: FileItem) =>
            f.id === selectedFile.id ? { ...f, name: newFileName } : f
          );
          localStorage.setItem('cloudSync_files', JSON.stringify(updatedFiles));

          window.location.reload();

          toast({
            title: "File renamed",
            description: `File has been renamed to ${newFileName}.`,
          });
        } catch (error) {
          console.error('Failed to rename file', error);
          toast({
            title: "Error renaming file",
            description: "An error occurred while renaming the file.",
            variant: "destructive"
          });
        }
      }
      setIsRenameDialogOpen(false);
    }
  };

  const handleUploadClick = () => {
    navigate('/dashboard/upload');
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = filterSource === 'all' || file.source === filterSource;
    return matchesSearch && matchesSource;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="progress-bar-indeterminate w-40 h-1 mb-4"></div>
          <p className="text-muted-foreground">Loading files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </div>
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <Select
            value={filterSource}
            onValueChange={(value) => setFilterSource(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDFs</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="folder">Folders</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="border rounded-md flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none rounded-l-md"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none rounded-r-md"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={handleUploadClick}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {filteredFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed border-muted">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No files found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery ? "Try a different search term or filter." : "Upload some files to get started."}
          </p>
          {!searchQuery && (
            <Button className="mt-4" onClick={handleUploadClick}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          )}
        </div>
      ) : (
        viewMode === 'grid' ? (
          <FileGrid
            files={filteredFiles}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onRename={handleRename}
          />
        ) : (
          <FileList
            files={filteredFiles}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onRename={handleRename}
          />
        )
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete File</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedFile?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>
              Enter a new name for "{selectedFile?.name}".
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="my-4"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmRename}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
