"use client";

import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";

export default function CategoriesListView() {
  const { data, error, isLoading } = useCategories();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!data) {
    return <h1>Data not found.</h1>;
  }

  return (
    <section>
      <table className="w-full">
        <thead>
          <tr className="bg-blue-50">
            <th className="border px-4 py-2">Sr.</th>
            <th className="border px-4 py-2">Icon</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Slug</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, key) => {
            return (
              <tr key={key}>
                <td className="border px-4 py-2">{key + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    className="h-12 w-12"
                    src={item?.iconURL}
                    alt={item?.name}
                  />
                </td>
                <td className="border px-4 py-2">{item?.name}</td>
                <td className="border px-4 py-2">{item?.slug}</td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/admin/categories/form?id=${item?.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all duration-200">
                      Manage
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
