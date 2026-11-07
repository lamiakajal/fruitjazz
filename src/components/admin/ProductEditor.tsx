"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import ImageManager from "@/components/admin/ImageManager";
import { categoryByName } from "@/data/categories";
import { useSettings } from "@/context/SettingsContext";
import { slugify } from "@/lib/product-input";

export interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  variants: { weight: string; price: number; comparePrice?: number; stock: number }[];
  isFeatured: boolean;
  isNew: boolean;
  active: boolean;
}

const EMPTY: ProductFormData = {
  name: "",
  slug: "",
  category: "",
  description: "",
  images: [],
  rating: 4.5,
  reviewsCount: 0,
  variants: [{ weight: "250g", price: 0, stock: 0 }],
  isFeatured: false,
  isNew: true,
  active: true,
};

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-stone-800">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-stone-500">{hint}</span>}
    </label>
  );
}

/** Create or edit a product, including pack sizes, prices and stock. */
export default function ProductEditor({ id, initial }: { id?: string; initial?: ProductFormData }) {
  const router = useRouter();
  const { categories: CATEGORIES } = useSettings();
  const [form, setForm] = useState<ProductFormData>(initial ?? { ...EMPTY, category: CATEGORIES[0]?.name ?? "" });
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setVariant = (index: number, patch: Partial<ProductFormData["variants"][number]>) =>
    setForm((f) => ({
      ...f,
      variants: f.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }));

  const categorySlug = categoryByName(form.category, CATEGORIES)?.slug;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(id ? `/api/admin/products/${id}` : "/api/admin/products", {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save the product");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the product");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="grid gap-5 rounded-2xl border border-stone-200 bg-surface p-5 shadow-soft sm:grid-cols-2">
        <Field label="Product name">
          <input
            required
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }}
            className={inputClass}
            placeholder="e.g. Raw Sidr Honey"
          />
        </Field>
        <Field label="Web address (slug)" hint="Used in the product link. Created from the name.">
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
          {(
            [
              ["active", "Visible in store"],
              ["isFeatured", "Best seller"],
              ["isNew", "New arrival"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-stone-700">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => set(key, e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              {label}
            </label>
          ))}
        </div>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-stone-200 bg-surface p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-stone-900">Pack sizes, prices and stock</h2>
            <p className="text-xs text-stone-500">To run a sale, type the old (higher) price in "Old price". It shows crossed out with a % badge. Clear it to end the sale.</p>
          </div>
          <button
            type="button"
            onClick={() => set("variants", [...form.variants, { weight: "", price: 0, stock: 0 }])}
            disabled={form.variants.length >= 8}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-xs font-bold text-stone-700 transition hover:border-gold-500 disabled:opacity-50 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add size
          </button>
        </div>

        {form.variants.map((v, i) => (
          <div key={i} className="grid grid-cols-2 items-end gap-3 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <Field label={i === 0 ? "Size / weight" : ""}>
              <input
                required
                value={v.weight}
                onChange={(e) => setVariant(i, { weight: e.target.value })}
                className={inputClass}
                placeholder="250g"
              />
            </Field>
            <Field label={i === 0 ? "Price (Rs.)" : ""}>
              <input
                required
                type="number"
                min={0}
                value={v.price}
                onChange={(e) => setVariant(i, { price: Number(e.target.value) })}
                className={inputClass}
              />
            </Field>
            <Field label={i === 0 ? "Old price (sale)" : ""}>
              <input
                type="number"
                min={0}
                value={v.comparePrice ?? ""}
                onChange={(e) => setVariant(i, { comparePrice: e.target.value ? Number(e.target.value) : undefined })}
                className={inputClass}
                placeholder="optional"
              />
            </Field>
            <Field label={i === 0 ? "Stock" : ""}>
              <input
                required
                type="number"
                min={0}
                step={1}
                value={v.stock}
                onChange={(e) => setVariant(i, { stock: Number(e.target.value) })}
                className={inputClass}
              />
            </Field>
            <button
              type="button"
              onClick={() => set("variants", form.variants.filter((_, j) => j !== i))}
              disabled={form.variants.length === 1}
              aria-label="Remove size"
              className="mb-1 rounded-lg p-2.5 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-5 rounded-2xl border border-stone-200 bg-surface p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold text-stone-900">Images</h2>
        <ImageManager
          images={form.images}
          onChange={(images) => set("images", images)}
          fallbackSlug={categorySlug}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Rating (0 to 5)">
            <input type="number" min={0} max={5} step={0.1} value={form.rating} onChange={(e) => set("rating", Number(e.target.value))} className={inputClass} />
          </Field>
          <Field label="Number of reviews">
            <input type="number" min={0} step={1} value={form.reviewsCount} onChange={(e) => set("reviewsCount", Number(e.target.value))} className={inputClass} />
          </Field>
        </div>
      </section>

      {error && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-60 cursor-pointer"
        >
          {saving ? "Saving..." : id ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-full border-2 border-stone-300 px-7 py-[0.7rem] text-sm font-bold text-stone-700 transition hover:border-gold-500 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
