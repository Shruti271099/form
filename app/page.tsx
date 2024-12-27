"use client";

import Header from "./header";
import Sidebar from "./sidebar";
import Main from "./main";
import InnerForm from "./form";

export default function PersonalForm() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header />
      <div className="flex">
        <Sidebar /> */}
      <InnerForm />
      {/* </div> */}
    </div>
  );
}
