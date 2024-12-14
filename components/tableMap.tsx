"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { Tooltip } from "@nextui-org/tooltip";
import { GET_TABLES, SUBSCRIBE_TABLE_STATE } from "@/lib/tables.queries";
import { Table, TableState } from "@/types";
import Image from "next/image";
interface TableMapProps {
  tables: Table[];
}

const tableIcons = {
  [TableState.Empty]: "/empty_table.png",
  [TableState.Waiting]: "/waiting_table.png",
  [TableState.Attended]: "/attended_table.png",
};

const TooltipContent: React.FC<{ table: Table }> = ({ table }) => {
  return (
    <div className="p-8">
      <p>Orden:</p>
      <ul className="mt-2">
        {table.request.map((request) => (
          <li key={request.id}>
            {request.description} - {request.price}€
          </li>
        ))}
      </ul>
      <p className="mt-4">
        Total: {table.request.reduce((sum, item) => sum + item.price, 0)}€
      </p>
    </div>
  );
};

const TableComponent: React.FC<{ table: Table }> = React.memo(({ table }) => {
  const base = (
    <div className="text-center p-4">
      <Image
        src={tableIcons[table.state]}
        alt={table.state}
        height={96}
        width={96}
        className="w-24 h-24 mx-auto"
      />
      <p className="mt-2">Mesa {table.id}</p>
    </div>
  );
  if (table.request?.length > 0) {
    return (
      <Tooltip showArrow content={<TooltipContent table={table} />}>
        {base}
      </Tooltip>
    );
  }
  return base;
});

const TableMap: React.FC<TableMapProps> = ({ tables }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5">
      {tables.map((table, index) => (
        <TableComponent key={index} table={table} />
      ))}
    </div>
  );
};

export const Tables: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const { loading, error, data } = useQuery<{ tables: Table[] }>(GET_TABLES);

  useEffect(() => {
    if (data?.tables) {
      setTables(data.tables);
    }
  }, [data]);

  useSubscription(SUBSCRIBE_TABLE_STATE, {
    onData: ({ data: subscriptionData }) => {
      const updatedTable = subscriptionData.data.newTableState;
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === updatedTable.id ? updatedTable : table
        )
      );
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
      <TableMap tables={tables} />
    </div>
  );
};
