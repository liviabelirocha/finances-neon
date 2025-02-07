"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBoardSchema } from "./schema";

import { createBoard } from "@/_actions/board/create";
import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import { useState } from "react";

type FormSchema = z.infer<typeof createBoardSchema>;

export const CreateBoardButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    await createBoard(data);
    setIsSheetOpen(false);
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) form.reset();
        setIsSheetOpen(open);
      }}
      open={isSheetOpen}
    >
      <SheetTrigger asChild>
        <Button className="rounded-full font-bold">
          Create board
          <FilePlus2 />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Board</SheetTitle>
          <SheetDescription>Insert all the necessary info</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type in the name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter>
              <SheetTrigger asChild>
                <Button variant="outline" type="button" className="w-full">
                  Cancel
                </Button>
              </SheetTrigger>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
