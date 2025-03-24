"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CryptoTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <img src={row.original.image} alt={row.original.name} className="w-6 h-6 rounded-full" />
            <span>{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "symbol",
        header: "Symbol",
        cell: ({ row }) => (
          <span className="uppercase font-semibold text-muted-foreground">
            {row.original.symbol}
          </span>
        ),
      },
      {
        accessorKey: "current_price",
        header: "Price (USD)",
        cell: ({ row }) => (
          <span className="text-green-500 font-semibold">
            ${row.original.current_price.toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "market_cap",
        header: "Market Cap",
        cell: ({ row }) => `$${row.original.market_cap.toLocaleString()}`,
      },
      {
        accessorKey: "total_volume",
        header: "Total Volume",
        cell: ({ row }) => `$${row.original.total_volume.toLocaleString()}`,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-orange-500 dark:text-orange-500 dark:text-white mb-4 text-center">
        Cryptocurrency Market
      </h2>

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <Table>
          <TableHeader className="bg-orange-400 dark:bg-orange-400 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-3 px-4 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted transition">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-4">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CryptoTable;
