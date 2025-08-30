import { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface YouTubeModalProps {
  children: ReactNode;
  videoId?: string;
}

export default function YouTubeModal({ children, videoId = "dQw4w9WgXcQ" }: YouTubeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 border-0 bg-transparent shadow-none">
        <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden"> {/* 16:9 aspect ratio */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}