"use client";
import { useState } from "react";
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
  ["Job Offer", "job-offer", true],
  ["Freelance Work", "freelance-work", true],
  ["Feedback", "feedback"],
  ["Other", "other"],
];

const formSchema = z.object({
  fullname: z.string().min(1),
  gameplan: z.string(),
  message: z.string(),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 mx-auto border p-5 max-w-lg rounded-lg bg-background"
      >
        <FormDescription>
          Please fill out the form below and I'll get back to you as soon as
          possible.
        </FormDescription>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please enter your full name..."
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
              name="gamePlan"
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
                  <FormDescription className="w-full">
                    Select the type of your email.
                  </FormDescription>
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
          <Button type="submit" disabled>
            Under Construction
          </Button>
        </div>
      </form>
    </Form>
  );
}
