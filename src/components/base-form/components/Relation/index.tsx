import { useTranslate } from "@/langs";
import { getTable } from "@/services/common-table-api";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInputFactory from "../../form-input-factory";
import Label from "../Label";
import { useTable } from "@/hooks/use-database";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";

export default function Relation(props: {
  field: DataBaseTableColumnDto;
  table: DatabaseTableDto;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create_crud_option" | "update_crud_option";
  id?: number;
  setValue: any;
  control: any;
  defaultValue?: any;
}) {
  const { table: joinedTable } = useTable(
    props.field.column_relations[0].referenced_table.name
  );
  if (!joinedTable) return null;
  if (
    props.formType === "update_crud_option" &&
    props.field.column_relations[0].pivot_table_id
  ) {
    return <RelationWithPivot {...props} joinedTable={joinedTable} />;
  } else if (props.formType === "update_crud_option") {
    return <UpdateRelation {...props} joinedTable={joinedTable} />;
  } else {
    return <CreateRelation {...props} joinedTable={joinedTable} />;
  }
}

function UpdateRelation({
  field,
  table,
  register,
  errors,
  formType,
  id,
  setValue,
  control,
  joinedTable,
}: {
  field: DataBaseTableColumnDto;
  table: DatabaseTableDto;
  formType: "create_crud_option" | "update_crud_option";
  register: UseFormRegister<any>;
  errors: FieldErrors;
  id?: number;
  setValue?: any;
  control: any;
  joinedTable?: DatabaseTableDto;
}) {
  const joinedTableData = useQuery([joinedTable?.name], () =>
    getTable({ tableName: joinedTable?.name || "" })
  );

  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />
      <div className="w-full p-4 bg-gray-200 rounded-md">
        {joinedTable?.columns &&
          joinedTable.columns
            .filter((field) =>
              field.update_crud_option?.is_hidden || field.is_hidden
                ? false
                : true
            )
            .map((joinedField) => {
              console.log(joinedField);

              return (
                <div key={joinedField.name}>
                  <FormInputFactory
                    control={control}
                    setValue={setValue}
                    formType={formType}
                    errors={errors}
                    field={joinedField}
                    register={register}
                    table={joinedTable}
                    defaultValue={
                      joinedTableData.data?.find(
                        (item: any) => item.id === id
                      )?.[joinedField.name]
                    }
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

function CreateRelation({
  field,
  table,
  register,
  errors,
  formType,
  id,
  setValue,
  control,
  joinedTable,
}: {
  field: DataBaseTableColumnDto;
  table: DatabaseTableDto;
  formType: "create_crud_option" | "update_crud_option";
  register: UseFormRegister<any>;
  errors: FieldErrors;
  id?: number;
  setValue?: any;
  control: any;
  joinedTable: DatabaseTableDto;
}) {
  const { translate } = useTranslate();

  const joinedTableData = useQuery([joinedTable.name], () =>
    getTable({ tableName: joinedTable.name })
  );

  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <label htmlFor={field.name}>{translate(field.name)}</label>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 p-4 bg-gray-200 rounded-md">
          {joinedTableData.data &&
            joinedTableData.data.map((item: any) => (
              <div
                className="flex items-center justify-between gap-2 px-2 py-1 bg-gray-100 rounded-md"
                key={item.id}
              >
                {/* Name display column */}
                <p>{item["name"]}</p>
                <PlusCircle size="16" className="stroke-teal-500" />
              </div>
            ))}
        </div>
        <div className="flex-1 p-4 bg-gray-200 rounded-md">
          {joinedTable?.columns &&
            joinedTable.columns
              .filter((field) =>
                field.create_crud_option?.is_hidden || field.is_hidden
                  ? false
                  : true
              )
              .map((field) => {
                return (
                  <FormInputFactory
                    control={control}
                    setValue={setValue}
                    formType={formType}
                    key={field.name}
                    errors={errors}
                    field={field}
                    register={register}
                    table={joinedTable}
                    defaultValue={
                      joinedTableData.data?.find(
                        (item: any) => item.id === id
                      )?.[field.name]
                    }
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

function RelationWithPivot({
  field,
  table,
  register,
  errors,
  formType,
  id,
  setValue,
  control,
  joinedTable,
}: {
  field: DataBaseTableColumnDto;
  table: DatabaseTableDto;
  formType: "create_crud_option" | "update_crud_option";
  register: UseFormRegister<any>;
  errors: FieldErrors;
  id?: number;
  setValue?: any;
  control: any;
  joinedTable: DatabaseTableDto;
}) {
  const joinedTableData = useQuery([joinedTable.name], () =>
    getTable({ tableName: joinedTable.name })
  );

  const { table: pivotTable } = useTable(
    field.column_relations[0].pivot_table.name!
  );

  const pivotTableData = useQuery(
    [pivotTable?.name + "/" + id],
    () => getTable({ tableName: pivotTable?.name || "" }),
    {
      enabled: !!pivotTable?.name,
    }
  );

  const { translate } = useTranslate();

  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <label htmlFor={field.name}>{translate(field.name)}</label>
      <div className="w-full p-4 bg-gray-200 rounded-md">
        {pivotTableData.data &&
          pivotTableData.data
            .filter((pivot: any) => {
              // MANY-TO-MANY bu filtre kalkacak  databsae e where li get gelince
              // pivot table Table key column page_id
              return pivot[field.column_relations[0].table.name + "_id"] === id;
            })
            .map((pivot: any) => {
              const joinedTableRelationField = joinedTableData.data.find(
                (joinedTableColumn: any) =>
                  joinedTableColumn.id ===
                  pivot[field.column_relations[0].referenced_table.name + "_id"]
              );

              if (!joinedTableRelationField) return null;
              return (
                <div key={pivot.id}>
                  <h2 className="font-medium">
                    Komponent: {joinedTableRelationField["name"]}
                  </h2>
                  {/* {
                    field.relation!.pivotTableExtraColumns?.map(
                      (extraColumn) => {
                        const extraColumnField = {
                          ...extraColumn,
                          // TODO: bu sayfada page özelinde yazılmış kodlar var mesela aşağıdaki inputType bunlar elden geçirilecek
                          inputType: (joinedTableRelationField.type_id === 1
                            ? "text"
                            : joinedTableRelationField.type_id === 5
                            ? "textarea"
                            : "text") as INPUT_TYPE,
                          name:
                            "relation/" +
                            pivotTable.name +
                            "/" +
                            joinedTableRelationField.id +
                            "/" +
                            extraColumn.name,
                        };
                        return (
                          <div key={extraColumn.name}>
                            <FormInputFactory
                              control={control}
                              setValue={setValue}
                              formType={formType}
                              errors={errors}
                              field={extraColumnField}
                              register={register}
                              table={pivotTable}
                              defaultValue={pivot[extraColumn.name]}
                            />
                          </div>
                        );
                      }
                    ) //düzeltilecek
                  } */}
                </div>
              );
            })}
      </div>
    </div>
  );
}
