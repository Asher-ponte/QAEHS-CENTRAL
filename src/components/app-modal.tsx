
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string | null;
  appUrl: string | null;
}

export function AppModal({ isOpen, onClose, appName, appUrl }: AppModalProps) {
  if (!appName || !appUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[90%] max-w-[300px] rounded-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold font-headline text-foreground">Launching {appName}</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            You are about to be redirected to the &quot;{appName}&quot;. Click the button below to proceed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            asChild 
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={onClose} // Close modal when link is clicked
          >
            <a href={appUrl} target="_blank" rel="noopener noreferrer">
              Open {appName}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
