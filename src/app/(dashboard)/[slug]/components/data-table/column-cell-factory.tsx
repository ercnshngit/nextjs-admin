import { DATABASE_TABLE_COLUMN } from "@/config/general";
import ListImageComponent from "./components/ListImageComponent";
import Pill from "./components/Pill";

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
