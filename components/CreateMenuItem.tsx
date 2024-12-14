import React, { useState } from "react";
import { Category, MenuItem } from "@/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

interface CreateMenuItemFormProps {
  categories: Category[];
  onCreateMenuItem: (
    item: { description: string; price: number },
    categoryId: string
  ) => void;
}

const CreateMenuItemForm: React.FC<CreateMenuItemFormProps> = ({
  categories,
  onCreateMenuItem,
}) => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    onCreateMenuItem(
      {
        description,
        price,
      },
      categoryId
    );
    setDescription("");
    setPrice(0);
    setCategoryId("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Crear Producto</h2>
      <div className="flex flex-col">
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Descripción"
        />

        <Input
          type="number"
          name="price"
          value={price.toString()}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          placeholder="Precio"
          label="Precio"
          className="mt-4"
        />
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-4"
          label="Categoría"
        >
          {categories.map((category: any) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>

        <Button onClick={handleSubmit} className="mt-4">
          Crear Producto
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CreateMenuItemForm);
