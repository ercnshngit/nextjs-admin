import ListImageComponent from "./components/ListImageComponent";
import Pill from "./components/Pill";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";

type ColumnCellFactoryProps = {
  value: any;
  column: DataBaseTableColumnDto;
};

export default function ColumnCellFactory(props: ColumnCellFactoryProps) {
  const inputType = props.column?.read_crud_option?.input_type?.name
    ? props.column.read_crud_option.input_type.name
    : props.column.input_type?.name;

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
