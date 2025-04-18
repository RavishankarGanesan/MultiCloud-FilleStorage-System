
import { Badge } from "@/components/ui/badge";

interface SourceBadgeProps {
  source: 'google-drive' | 'onedrive';
  className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  return (
    <Badge 
      className={source === 'google-drive' ? 'cloud-badge-google' : 'cloud-badge-onedrive'}
    >
      {source === 'google-drive' ? 'Google' : 'OneDrive'}
    </Badge>
  );
}
