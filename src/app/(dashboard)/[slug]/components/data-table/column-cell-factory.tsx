import {
  DATABASE_TABLE,
  DATABASE_TABLE_COLUMN,
  INPUT_TYPE,
} from "@/config/general";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ListImageComponent from "./components/ListImageComponent";
import Pill from "./components/Pill";
import { useQuery } from "@tanstack/react-query";
import { getTable } from "@/services/panel";

type ColumnCellFactoryProps = {
  value: any;
  column: DATABASE_TABLE_COLUMN;
};

export default function ColumnCellFactory(props: ColumnCellFactoryProps) {
  const inputType = props.column?.read?.inputType
    ? props.column.read.inputType
    : props.column.inputType;

  switch (inputType) {
    case "image":
      return <ListImageComponent {...props} />;
    case "multi-select":
      return <Pill {...props} />;
    case "select":
      return <Pill {...props} />;
    default:
      return props.value;
  }
}
