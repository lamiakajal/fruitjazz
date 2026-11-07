import React from "react";
import ProductEditor from "@/components/admin/ProductEditor";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold text-heading">Add product</h1>
      <ProductEditor />
    </div>
  );
}
