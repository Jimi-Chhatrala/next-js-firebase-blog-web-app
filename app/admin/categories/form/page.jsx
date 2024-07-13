"use client";

import { useCategoryForm } from "./contexts/CategoryFormContext";

export default function Page() {
  const {
    data,
    isLoading,
    error,
    isDone,
    handleData,
    handleCreate,
    image,
    setImage,
  } = useCategoryForm();
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
          handleCreate();
        }}
        className="max-w-[40%] mt-2 space-y-2"
      >
        <h3 className="font-semibold">Add New Category</h3>
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
              Image: <span className="text-red-500">*</span>
            </label>
            <input
              id="category_image"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
              type="file"
              placeholder="Enter Category Slug"
              accept="image/*"
              required
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
