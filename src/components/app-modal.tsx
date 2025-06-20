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
}

export function AppModal({ isOpen, onClose, appName }: AppModalProps) {
  if (!appName) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[90%] max-w-[300px] rounded-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold font-headline text-foreground">Launching {appName}...</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            You would now be redirected to the &quot;{appName}&quot;. (This is a simulation as direct app linking depends on mobile intents/deep links).
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={onClose}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Got It!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
