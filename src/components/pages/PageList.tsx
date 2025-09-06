// src/components/pages/PageList.tsx
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";

type PageDoc = { id: string; title: string; slug: string };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PageList() {
  const payload = await getPayload({ config });
    console.log('this is the payload', payload);
  const { docs } = await payload.find({
    collection: "pages",
    depth: 0,
    limit: 100,
    sort: "title",
  });

  const pages = (docs as PageDoc[]) ?? [];
  if (!pages.length) return <p className="text-sm text-gray-500">No pages yet.</p>;

  return (
    <ul className="grid gap-3">
  {pages.map((p) => {
    console.log("p", p);
    return (
      <li key={p.id} className="border rounded-lg p-3 hover:bg-gray-50">
        <Link href={`/${p.slug}`} className="font-medium underline">
          {p.title}
        </Link>
        <div className="text-xs text-gray-500">/{p.slug}</div>
      </li>
    );
  })}
</ul>

  );
}
