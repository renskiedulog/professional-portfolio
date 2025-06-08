"use client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const contactCategories = [
  ["Collaboration", "collaboration"],
  ["Help Request", "help-request"],
  ["Question", "question"],
  ["Freelance Work", "freelance-work", true],
  ["Feedback", "feedback"],
  ["Other", "other"],
];

const formSchema = z.object({
  email: z.string().email(),
  gameplan: z.string(),
  message: z.string(),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      gameplan: "collaboration",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          gameplan: values.gameplan,
          message: values.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "An unknown error occurred.");
      }

      toast(
        <div>
          <p className="font-bold text-lg">Form Submitted Successfully.</p>
          <span>
            You can also connect with me through my other social media accounts
            for faster communication.
          </span>
        </div>,
        {
          position: window?.innerWidth > 640 ? "bottom-right" : "top-left",
        }
      );
      form.reset();
    } catch (error: any) {
      toast.error(
        error.message || "Failed to submit the form. Please try again."
      );
    }
  }

  return (
    <Form {...form}>
      <form
        id="contact-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 mx-auto border p-5 max-w-lg rounded-lg bg-background shadow"
      >
        <FormDescription>
          Please fill out the form below and I'll get back to you as soon as
          possible.
        </FormDescription>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please enter your email address..."
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="gameplan"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What's the game plan?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="space-y-1 grid grid-cols-2"
                      defaultValue="collaboration"
                    >
                      {contactCategories.map((option, index) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0 w-full"
                          key={index}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={option[1] as string}
                              disabled={(option[2] as boolean) ?? false}
                            />
                          </FormControl>
                          <FormLabel
                            className={`${option[2] === true ? "line-through opacity-50" : ""} font-normal`}
                          >
                            {option[0]}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Let me know what's on your mind..."
                  className="resize-none min-h-[200px]"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end items-center">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="gap-2"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
