"use client";

import React from "react";
import { DataTable } from "../table/data-table";
import { Button } from "../ui/button";
import CustomModal from "./custom-modal";
import { ColumnDef } from "@tanstack/react-table";
import { useModal } from "@/providers/ModalProvider";

interface DataTableProps<TData, TValue> {
  title: string;
  description: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterValue: string;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  modalChildren?: React.ReactNode;
}

function MyPage<TData, TValue>({
  title,
  description,
  columns,
  data,
  filterValue,
  primaryButton,
  secondaryButton,
  modalChildren,
}: DataTableProps<TData, TValue>) {
  const { setOpen } = useModal();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="flex gap-2"
            variant="outline"
            onClick={() => {
              if (modalChildren) {
                setOpen(
                  <CustomModal
                    title=""
                    subheading=""
                  >
                    {modalChildren}
                  </CustomModal>
                );
              }
            }}
          >
            {secondaryButton}
          </Button>
          <Button
            className="flex gap-2"
            onClick={() => {
              if (modalChildren) {
                setOpen(
                  <CustomModal
                    title=""
                    subheading=""
                  >
                    {modalChildren}
                  </CustomModal>
                );
              }
            }}
          >
            {primaryButton}
          </Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} filterValue={filterValue} />
    </div>
  );
}

export default MyPage;
