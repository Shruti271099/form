// types/form.ts
export type FormSection = {
  id: string;
  title: string;
  fields: FormField[];
};

export type FormField = {
  name: string;
  label: string;
  src?: string;
  type: "text" | "tel" | "email" | "select" | "date" | "textarea" | "picture";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

// config/formConfig.ts
export const formSections: FormSection[] = [
  {
    id: "contact",
    title: "Contact Information",
    fields: [
      // {
      //   name: "",
      //   label: "",
      //   // src: "",
      //   required: true,
      //   // type: 'picture'
      // },
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter your phone number",
        required: true,
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter your address",
        required: true,
      },
    ],
  },
  {
    id: "education",
    title: "Schooling Information",
    fields: [
      {
        name: "highestEducation",
        label: "Highest Education",
        type: "select",
        options: ["High School", "Bachelors", "Masters", "PhD"],
        required: true,
      },
      {
        name: "graduationYear",
        label: "Graduation Year",
        type: "date",
        required: true,
      },
      {
        name: "institution",
        label: "Institution Name",
        type: "text",
        placeholder: "Enter your institution name",
        required: true,
      },
      {
        name: "fieldOfStudy",
        label: "Field of Study",
        type: "text",
        placeholder: "Enter your field of study",
        required: true,
      },
    ],
  },
  {
    id: "employment",
    title: "Employment Details",
    fields: [
      {
        name: "currentPosition",
        label: "Current Position",
        type: "text",
        placeholder: "Enter your current position",
        required: true,
      },
      {
        name: "employmentStatus",
        label: "Employment Status",
        type: "select",
        options: ["Full Time", "Part Time", "Freelance", "Unemployed"],
        required: true,
      },
      {
        name: "yearsOfExperience",
        label: "Years of Experience",
        type: "select",
        options: ["0-1", "1-3", "3-5", "5-10", "10+"],
        required: true,
      },
      {
        name: "company",
        label: "Company Name",
        type: "text",
        placeholder: "Enter your company name",
        required: true,
      },
    ],
  },
  {
    id: "hobbies",
    title: "Hobbies and Interests",
    fields: [
      {
        name: "hobbies",
        label: "Hobbies",
        type: "textarea",
        placeholder: "Enter your hobbies",
        required: true,
      },
      {
        name: "skills",
        label: "Skills",
        type: "select",
        options: ["Programming", "Design", "Writing", "Marketing", "Other"],
        required: true,
      },
      {
        name: "interests",
        label: "Areas of Interest",
        type: "textarea",
        placeholder: "Enter your areas of interest",
        required: true,
      },
    ],
  },
  {
    id: "preferred-contact",
    title: "Preferred Contact",
    fields: [
      {
        name: "preferredContactMethod",
        label: "Preferred Contact Method",
        type: "select",
        options: ["Email", "Phone", "SMS"],
        required: true,
      },
      {
        name: "contactTime",
        label: "Best Time to Contact",
        type: "select",
        options: ["Morning", "Afternoon", "Evening"],
        required: true,
      },
    ],
  },
];
