"use client";

import { useSearchParams } from "next/navigation";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const updateCategoryId = searchParams.get("id");

  const {
    data,
    isLoading,
    error,
    isDone,
    handleData,
    handleCreate,
    handleUpdate,
    handleDelete,
    image,
    setImage,
    fetchCategoryData,
  } = useCategoryForm();

  useEffect(() => {
    if (updateCategoryId) {
      fetchCategoryData(updateCategoryId);
    }
  }, [updateCategoryId]);

  return (
    <main className="w-full p-6">
      <h1 className="font-semibold">
        Category
        <span className="ml-2 pl-2 border-l-2 border-gray-500">Form</span>
      </h1>
      <hr className="my-2" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (updateCategoryId) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
        className="max-w-[40%] mt-2 space-y-2"
      >
        {updateCategoryId ? (
          <h3 className="font-semibold">Update Category</h3>
        ) : (
          <h3 className="font-semibold">Add New Category</h3>
        )}

        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="category_name" className="font-semibold">
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              id="category_name"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
              type="text"
              placeholder="Enter Category Name"
              required
              onChange={(e) => handleData("name", e.target.value)}
              value={data?.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category_slug" className="font-semibold">
              Slug: <span className="text-red-500">*</span>
            </label>
            <input
              id="category_slug"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
              type="text"
              placeholder="Enter Category Slug"
              required
              onChange={(e) => handleData("slug", e.target.value)}
              value={data?.slug}
            />
          </div>

          {data?.iconURL && (
            <div>
              {image && <p>Previous Image:</p>}
              <img className="h-40" src={data?.iconURL} alt={data?.name} />
            </div>
          )}
          {image && (
            <div>
              <p>Image Preview:</p>
              <img
                className="h-40"
                src={URL.createObjectURL(image)}
                alt="Category image"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="category_image" className="font-semibold">
              Image:
            </label>
            <input
              id="category_image"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
              type="file"
              accept="image/*"
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {!isDone && (
            <button
              type="submit"
              disabled={isLoading || isDone}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              {isLoading
                ? "Loading..."
                : updateCategoryId
                ? "Update"
                : "Create"}
            </button>
          )}

          {updateCategoryId && !isDone && (
            <button
              onClick={(e) => {
                e.preventDefault();
                // const confirm = window.confirm(
                //   "Are you sure to delete this category?"
                // );
                // if (confirm) {
                handleDelete(updateCategoryId);
                // }
              }}
              disabled={isLoading || isDone}
              className="w-full bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              {isLoading ? "Loading..." : "Delete"}
            </button>
          )}

          {isDone && (
            <h3 className="text-green-500 font-bold text-center">
              Category {updateCategoryId ? "Updated" : "Created"}.
            </h3>
          )}
        </div>
      </form>
    </main>
  );
}
