"use client";

import { getCategory } from "@/lib/firebase/category/read";
import {
  createNewCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/firebase/category/write";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleData = (key, value) => {
    setIsDone(false);
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleCreate = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);

    try {
      await createNewCategory({ data: data, image: image });
      setIsDone(true);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);

    try {
      await updateCategory({ data: data, image: image });
      setIsDone(true);
      setTimeout(() => {
        router.push("/admin/categories");
      }, 1000);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);

    try {
      await deleteCategory(id);
      setIsDone(true);
      setTimeout(() => {
        router.push("/admin/categories");
      }, 1000);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  const fetchCategoryData = async (id) => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);

    try {
      const response = await getCategory(id);

      if (response.exists()) {
        setData(response.data());
      } else {
        throw new Error(`No category found with id: ${id}`);
      }
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <CategoryFormContext.Provider
      value={{
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
      }}
    >
      {children}
    </CategoryFormContext.Provider>
  );
}

export const useCategoryForm = () => useContext(CategoryFormContext);
