"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchResult } from "@/lib/types";
import { PlusIcon, Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const AddRecommendationBtn = ({
  item,
  searchType,
}: {
  item: SearchResult;
  searchType: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleAddRecommendation = async (close: () => void) => {
    startTransition(async () => {
      try {
        const req = await fetch("/api/recommendations/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item.id,
            title: item.title,
            type: searchType,
          }),
        });

        if (!req.ok) throw new Error("Failed to add recommendation");

        toast(
          <div>
            <p className="font-bold text-base">
              Recommendation Added Successfully.
            </p>
          </div>,
          {
            position: window?.innerWidth > 640 ? "bottom-right" : "top-left",
          }
        );

        close();
        setOpen(false);
      } catch (error: any) {
        console.error(error);
        toast(
          <div>
            <p className="font-bold text-base">Something Went Wrong.</p>
          </div>,
          {
            position: window?.innerWidth > 640 ? "bottom-right" : "top-left",
          }
        );
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(set) => setOpen(set)}>
      <DialogTrigger asChild>
        <button className="w-16 h-14 pb-3 pl-3 aspect-square bg-black/80 rounded-bl-full flex justify-center items-center group-hover:scale-100 scale-0 transition-all ease-in-out duration-200 origin-top-right hover:bg-green-400">
          <PlusIcon className="text-background" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You might have miscliked the button, confirm to add.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="min-w-32"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                const close = (e.currentTarget as HTMLElement)
                  .closest("[data-state=open]")
                  ?.querySelector("[data-dialog-close]") as HTMLButtonElement;
                handleAddRecommendation(() => close?.click());
              }}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecommendationBtn;
