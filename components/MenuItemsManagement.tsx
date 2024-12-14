import React, { useState } from "react";
import { MenuItem, Category } from "@/types";
import { DELETE_MENU_ITEM } from "@/lib/menu.queries";
import { useMutation } from "@apollo/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { EditIcon, DeleteIcon } from "./icons";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

interface MenuItemsManagementProps {
  categories: Category[];
  onUpdateMenuItem: (
    id: string,
    description: string,
    price: number,
    categoryId: string
  ) => void;
  onDeleteMenuItem: (id: string) => void;
}

const MenuItemsManagement: React.FC<MenuItemsManagementProps> = ({
  categories,
  onUpdateMenuItem,
  onDeleteMenuItem,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMenuItem, setEditMenuItem] = useState<{
    categoryId: string;
    id: string;
    description: string;
    price: number;
  }>();

  const menuItems = categories
    .map((category) => {
      return category.items.map((item) => {
        return { ...item, categoryId: category.id };
      });
    })
    .flat();

  const getCategoryName = (categoryId: string) => {
    return categories.find((category) => category.id === categoryId)?.name;
  };

  return (
    <div className="w-full mt-4">
      <h3 className="text-left mb-2">Gestión de Productos </h3>

      <Table
        removeWrapper
        aria-label="Productos de la categoría"
        className="mt-4"
      >
        <TableHeader>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {menuItems.map((item, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{getCategoryName(item.categoryId)}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar Producto">
                    <span
                      onClick={() => {
                        setEditMenuItem(item);
                        onOpen();
                      }}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Borrar Producto">
                    <span
                      onClick={() => onDeleteMenuItem(item.id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UpdateMenuItem
        item={editMenuItem}
        categories={categories}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onUpdateMenuItem={onUpdateMenuItem}
      ></UpdateMenuItem>
    </div>
  );
};

export default React.memo(MenuItemsManagement);

const UpdateMenuItem: React.FC<{
  item:
    | {
        id: string;
        description: string;
        price: number;
        categoryId: string;
      }
    | undefined;
  categories: Category[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUpdateMenuItem: (
    id: string,
    description: string,
    price: number,
    categoryId: string
  ) => void;
}> = ({ item, categories, isOpen, onOpenChange, onUpdateMenuItem }) => {
  if (!item) return <></>;
  const [description, setDescription] = useState(item.description || "");
  const [price, setPrice] = useState(item.price || 0);
  const [categoryId, setCategoryId] = useState(item.categoryId || "");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior={"outside"}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modificar Producto
            </ModalHeader>
            <ModalBody>
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
                selectedKeys={new Set([categoryId])}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-4"
                label="Categoría"
              >
                {categories.map((category: any, index) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onUpdateMenuItem(item.id, description, price, categoryId);
                  onClose();
                }}
              >
                Actualizar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
