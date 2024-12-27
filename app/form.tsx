"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formSections } from "./config/formConfig";

const createFormSchema = () => {
  const schemaFields = {};
  formSections.forEach((section) => {
    section.fields.forEach((field) => {
      schemaFields[field.name] = field.required
        ? z.string().min(1, { message: `${field.label} is required` })
        : z.string().optional();
    });
  });
  return z.object(schemaFields);
};

export default function InnerForm() {
  const [activeSection, setActiveSection] = useState(formSections[0].id);
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg");

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema()),
    defaultValues: {},
  });

  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formValues));
  }, [formValues]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = async (data: z.infer<typeof createFormSchema>) => {
    try {
      localStorage.setItem("formData", JSON.stringify(data));
      alert("Form completed successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Error saving form");
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            {...form.register(field.name)}
          />
        );
      case "select":
        return (
          <Select onValueChange={(value) => form.setValue(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            {...form.register(field.name)}
          />
        );
    }
  };

  const currentSection = formSections.find(
    (section) => section.id === activeSection
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <h1 className="text-xl font-semibold">Personal</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback>FN</AvatarFallback>
                </Avatar>
                <span>Full Name</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r bg-white p-6">
          <div className="mb-8">
            <div className="relative h-32 w-32 mx-auto">
              <Avatar className="h-full w-full">
                <AvatarImage src={profileImage} />
                <AvatarFallback>UP</AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white hover:bg-primary/90 cursor-pointer"
              >
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                +
              </label>
            </div>
          </div>
          <nav className="space-y-2">
            {formSections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeSection === section.id &&
                    "bg-primary text-primary-foreground"
                )}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </Button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">
                  {currentSection?.title}
                </h2>
                {currentSection?.fields.map((field) => (
                  <FormField
                    key={field.name}
                    name={field.name}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>{renderField(field)}</FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="submit" className="w-full">
                {formSections.findIndex(
                  (section) => section.id === activeSection
                ) <
                formSections.length - 1
                  ? "Next"
                  : "Submit"}
              </Button>
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
}
