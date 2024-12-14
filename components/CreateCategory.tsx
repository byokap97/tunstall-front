import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

interface CreateCategoryFormProps {
  onCreateCategory: (name: string) => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  onCreateCategory,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    setName("");
    onCreateCategory(name);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Crear Categoría</h2>

      <Input
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nueva Categoría"
        className="mb-4"
      />
      <Button onClick={handleSubmit} className="mt-4">
        Crear Categoría
      </Button>
    </div>
  );
};

export default React.memo(CreateCategoryForm);
