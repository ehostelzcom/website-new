import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoModalProps {
  children: React.ReactNode;
  videoUrl?: string;
  title?: string;
}

export default function VideoModal({ 
  children, 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube video - user will replace
  title = "ehostelz.com Demo Video" 
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert YouTube watch URL to embed URL if needed
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden" data-testid="video-modal">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              src={getEmbedUrl(videoUrl)}
              title={title}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              data-testid="video-iframe"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}