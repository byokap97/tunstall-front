import React, { useState } from "react";
import { Category } from "@/types";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";

interface CategoryManagementProps {
  categories: Category[];
  onUpdateCategory: (id: string, name: string) => void;
  onDeleteCategory: (id: string) => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [categorySelected, setCategorySelected] = useState<Category>();

  return (
    <div className="w-full">
      <div>
        <h3 className="text-left mb-2">Modificar Categorías: </h3>

        <Select
          value={categorySelected?.id}
          onChange={(e) =>
            setCategorySelected(categories.find((c) => c.id === e.target.value))
          }
          label="Seleccionar Categoría"
        >
          {categories.map((category: any) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      {categorySelected ? (
        <>
          <Input
            type="text"
            value={categorySelected.name}
            label="Categoría"
            onChange={(e) =>
              setCategorySelected({
                ...categorySelected,
                name: e.target.value,
              })
            }
            className="mt-4"
          />
          <Button
            onClick={() => onUpdateCategory(categorySelected.id, categorySelected.name)}
            className="mt-4 w-full"
          >
            Modificar Categoria
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setCategorySelected(undefined);
              onDeleteCategory(categorySelected.id);
            }}
            className="mt-4 w-full"
          >
            Eliminar Categoria
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(CategoryManagement);
