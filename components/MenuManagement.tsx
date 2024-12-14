"use client";

import React, { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_CATEGORY,
  CREATE_MENU_ITEM,
  DELETE_CATEGORY,
  DELETE_MENU_ITEM,
  GET_MENU,
  UPDATE_CATEGORY,
  UPDATE_MENU_ITEM,
} from "@/lib/menu.queries";
import CategoryManagement from "./categoryManagement";
import CreateCategory from "./createCategory";
import CreateMenuItem from "./createMenuItem";
import MenuItemsManagement from "./menuItemsManagement";

export const MenuManagement: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_MENU);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [createMenuItem] = useMutation(CREATE_MENU_ITEM);
  const [updateMenuItem] = useMutation(UPDATE_MENU_ITEM);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleUpdateCategory = useCallback(
    async (id: string, name: string) => {
      await updateCategory({ variables: { id, name } });
      refetch();
    },
    [updateCategory, refetch]
  );

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      await deleteCategory({ variables: { id } });
      refetch();
    },
    [deleteCategory, refetch]
  );

  const handleCreateCategory = useCallback(
    async (newCategoryName: string) => {
      await createCategory({ variables: { name: newCategoryName } });
      refetch();
    },
    [createCategory, refetch]
  );

  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);

  const handleDeleteMenuItem = useCallback(
    async (id: string) => {
      await deleteMenuItem({ variables: { id } });
      refetch();
    },
    [createCategory, refetch]
  );

  const handleUpdateMenuItem = useCallback(
    async (
      id: string,
      description: string,
      price: number,
      categoryId: string
    ) => {
      await updateMenuItem({
        variables: { id, description, price, categoryId },
      });
      refetch();
    },
    [createCategory, refetch]
  );

  const handleCreateMenuItem = async (
    item: { description: string; price: number },
    categoryId: string
  ) => {
    await createMenuItem({
      variables: {
        ...item,
        categoryId,
      },
    });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center md:flex-row text-center w-full ">
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <div className="mb-8 w-full  md:w-2/3">
          <CreateCategory
            onCreateCategory={handleCreateCategory}
          ></CreateCategory>
        </div>

        <div className="mb-8 w-full  md:w-2/3">
          <CreateMenuItem
            categories={data.menu.categories}
            onCreateMenuItem={handleCreateMenuItem}
          ></CreateMenuItem>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col  mt-4 md:mt-0   ">
        <h2 className="text-xl font-semibold mb-2">Menú Actual</h2>
        <CategoryManagement
          categories={data.menu.categories}
          onDeleteCategory={handleDeleteCategory}
          onUpdateCategory={handleUpdateCategory}
        ></CategoryManagement>
        <MenuItemsManagement
          categories={data.menu.categories}
          onDeleteMenuItem={handleDeleteMenuItem}
          onUpdateMenuItem={handleUpdateMenuItem}
        ></MenuItemsManagement>
      </div>
    </div>
  );
};
