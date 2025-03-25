"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookHeart } from "lucide-react";

const CryptoTable = ({ data }) => {
    const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  console.log(data)
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-6 h-6 rounded-full"
            />
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
        accessorKey: "price_change_percentage_24h",
        header: "24H",
        cell: ({ row }) => (
            <span className={`font-semibold inline-flex items-center ${row.original.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {row.original.price_change_percentage_24h >= 0 ? (
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                {row.original.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {Math.abs(row.original.price_change_percentage_24h).toFixed(2)}%
              </span>
            )}
          </span>
        ),
      },
    //   {
    //     accessorKey: "current_price",
    //     header: "Price (USD)",
    //     cell: ({ row }) => (
    //       <span className="text-green-500 font-semibold">
    //         ${row.original.current_price.toLocaleString()}
    //       </span>
    //     ),
    //   },
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
      {
        accessorKey: "wishlist",
        header: "Wishlist",
        cell: ({ row }) => (
          //   <button
          //     onClick={() => {
          //       // Add your wishlist logic here
          //       console.log('Added to wishlist:', row.original);
          //     }}
          //     className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          //   >
          //     ♡
          //   </button>
          <Button
          variant="outline"
            onClick={() => {
              // Add your wishlist logic here
              console.log("Added to wishlist:", row.original);
            }}
          >
            <BookHeart />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    // data,
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container mx-auto ">
      <h2 className="text-2xl font-bold text-orange-500 dark:text-orange-500  mb-4 text-center">
        Cryptocurrency Market
      </h2>
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <Input
          type="text"
          placeholder="🔍Search by coin name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <Table>
          <TableHeader className="bg-orange-400 dark:bg-orange-400 dark:text-white text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-3 px-4 text-left dark:text-white text-black font-bold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}className="hover:bg-muted transition cursor-pointer"
                onClick={() => {
                  const coinId = row.original.id; // Assuming each row has a unique `id` field
                  router.push(`/coin/${coinId}`);
                }}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No Coin found for this query!!!
                </TableCell>
              </TableRow>
            )}
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
          <ArrowLeft />
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CryptoTable;
