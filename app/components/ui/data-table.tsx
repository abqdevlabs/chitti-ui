import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Edit2, Search } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the interface for our Reusable Table
interface ReusableDataTableProps<TData> {
  title?: string;
  sub?: string;
  data: TData[];
  columns: ColumnDef<TData, any>[];
  /** The field key you want the search bar to filter (e.g., "email" or "name") */
  searchKey?: keyof TData;
  searchPlaceholder?: string;
  /** Callback when the View button is clicked */
  onView?: (row: TData) => void;
  /** Callback when the Edit button is clicked */
  onEdit?: (row: TData) => void;
}

export function ReusableDataTable<TData>({
  title,
  data,
  columns: userColumns,
  searchKey,
  searchPlaceholder = "Search...",
  onView,
  onEdit,
}: ReusableDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // Dynamically append Action Columns if action handlers are provided
  const columns = React.useMemo(() => {
    if (!onView && !onEdit) return userColumns;

    const actionColumn: ColumnDef<TData, any> = {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-2">
            {onView && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onView(row.original)}
                title="View details"
              >
                <Eye className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit(row.original)}
                title="Edit item"
              >
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        );
      },
    };

    return [...userColumns, actionColumn];
  }, [userColumns, onView, onEdit]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Search Input Bar */}

      {searchKey && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={
                (table
                  .getColumn(String(searchKey))
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(String(searchKey))
                  ?.setFilterValue(event.target.value)
              }
              className="pl-8"
            />
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between space-x-2 py-2">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
