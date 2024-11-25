"use client"

import React, { useState, useEffect } from "react"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useFetchData, Registro } from "@/service/useFetchData"

// Defina as colunas com base nos campos
export const columns: ColumnDef<Registro>[] = [
  { accessorKey: "numero_acesso", header: "Número de Acesso" },
  { accessorKey: "designacao_material", header: "Designação Material" },
  { accessorKey: "local_coleta", header: "Local de Coleta" },
  { accessorKey: "proprietario", header: "Proprietário" },
  { accessorKey: "municipio_estado", header: "Município/Estado" },
  { accessorKey: "idade_lavoura", header: "Idade da Lavoura" },
  { accessorKey: "data_coleta", header: "Data de Coleta" },
  { accessorKey: "coletor", header: "Coletor" },
]

export function DataTableDemo() {
  const { data, loading, error } = useFetchData(
    "https://www.epamig.tech/germoplasma/germoplasma_cafe.php"
  ) // Use o hook para obter os dados

  const [visibleData, setVisibleData] = useState<Registro[]>([])
  const [itemsToShow, setItemsToShow] = useState(20)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    setVisibleData(data.slice(0, itemsToShow))
  }, [data, itemsToShow])

  const loadMoreItems = () => {
    setItemsToShow((prev) => Math.min(prev + 10, data.length))
  }

  const loadAllItems = () => {
    setItemsToShow(data.length)
  }

  const table = useReactTable({
    data: visibleData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (loading) return <div>Carregando Tabela...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por número de acesso..."
          value={(table.getColumn("numero_acesso")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("numero_acesso")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Botões no final da tabela */}
        <div className="flex justify-center py-4">
          {itemsToShow < data.length && (
            <Button onClick={loadMoreItems} className="mr-2">
              Carregar mais
            </Button>
          )}
          {itemsToShow < data.length && (
            <Button onClick={loadAllItems} variant="outline">
              Carregar todos
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
