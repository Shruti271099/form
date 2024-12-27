import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-6">
      <nav className="space-y-4">
        <Button variant="ghost" className="w-full justify-start">
          Contact Information
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Schooling Information
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Employment Details
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Hobbies and Interests
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Preferred Contact
        </Button>
      </nav>
    </aside>
  );
}
