"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


import { Card, CardContent } from "@/components/ui/card";
import InnerForm from "./form";

const formConfig = {
  personalInfo: {
    config: { type: "text", placeholder: "Enter your full name" },
    address: { type: "text", placeholder: "Enter your full name" },
    state: { type: "text", placeholder: "Enter your address" },
    phone: { type: "tel", placeholder: "Enter your phone number" },
    preferredContact: {
      type: "text",
      placeholder: "Enter your email/phone number/sms",
    },
    jobTitle: { type: "text", placeholder: "Enter your current job title" },
    employmentStatus: {
      type: "select",
      options: ["Full Time", "Part Time", "Freelance", "Unemployed"],
    },
    skills: {
      type: "select",
      options: ["React", "Vue", "Angular", "Svelte"],
    },
    hobby: { type: "text", placeholder: "Enter your favorite hobby" },
    interestLevel: {
      type: "select",
      options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    },
  },
};

export default function Main() {
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg");
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    localStorage.setItem("formData", JSON.stringify(newFormData));
  };

  return (
    <main className="flex-1 p-6">
      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6">
          <div className="relative h-32 w-32 mb-8">
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
          <InnerForm />
          {/* <Form> */}
          {/* <form className="space-y-6">
            {Object.entries(formConfig.personalInfo).map(([field, config]) => (
              <FormField
                key={field}
                name={field}
                render={() => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </FormLabel>
                    <FormControl>
                      {config.type === "select" ? (
                        <Select
                          value={formData[field]}
                          onValueChange={(value) =>
                            handleInputChange(field, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${field}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {config?.options?.map((option: string) => (
                              <SelectItem
                                key={option}
                                value={option.toLowerCase()}
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={config.type}
                          //   placeholder={config.placeholder}
                          value={formData[field] || ""}
                          onChange={(e) =>
                            handleInputChange(field, e.target.value)
                          }
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form> */}
          {/* </Form> */}
        </CardContent>
      </Card>
    </main>
  );
}
