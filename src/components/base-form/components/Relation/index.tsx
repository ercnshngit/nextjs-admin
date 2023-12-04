import {
  DATABASE_TABLE,
  DATABASE_TABLE_COLUMN,
  getDatabaseTable,
} from "@/config/general";
import { translate } from "@/langs";
import { getTable } from "@/services/panel";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInputFactory from "../../form-input-factory";
import Label from "../Label";
import { INPUT_TYPE } from "@/types/config";

export default function Relation(props: {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create" | "update";
  id?: number;
  setValue: any;
  control: any;
  defaultValue?: any;
}) {
  if (props.formType === "update" && props.field.relation?.pivotTable) {
    return <RelationWithPivot {...props} />;
  } else if (props.formType === "update") {
    return <UpdateRelation {...props} />;
  } else {
    return <CreateRelation {...props} />;
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
}: {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create" | "update";
  id?: number;
  setValue?: any;
  control: any;
}) {
  const joinedTable = getDatabaseTable(
    field.relation!.table!
  ) as DATABASE_TABLE;

  const joinedTableData = useQuery([joinedTable.name], () =>
    getTable({ tableName: joinedTable.name })
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
              field[formType]?.hidden || field.hidden ? false : true
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
}: {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create" | "update";
  id?: number;
  setValue?: any;
  control: any;
}) {
  const joinedTable = getDatabaseTable(
    field.relation!.table!
  ) as DATABASE_TABLE;

  const joinedTableData = useQuery([joinedTable.name], () =>
    getTable({ tableName: joinedTable.name })
  );
  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <label htmlFor={field.name}>
        {translate(table.name + "/" + field.name)}
      </label>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 p-4 bg-gray-200 rounded-md">
          {joinedTableData.data &&
            joinedTableData.data.map((item: any) => (
              <div
                className="flex items-center justify-between gap-2 px-2 py-1 bg-gray-100 rounded-md"
                key={item.id}
              >
                <p>{item[field.relation!.displayColumn!]}</p>
                <PlusCircle size="16" className="stroke-teal-500" />
              </div>
            ))}
        </div>
        <div className="flex-1 p-4 bg-gray-200 rounded-md">
          {joinedTable?.columns &&
            joinedTable.columns
              .filter((field) =>
                field[formType]?.hidden || field.hidden ? false : true
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
}: {
  field: DATABASE_TABLE_COLUMN;
  table: DATABASE_TABLE;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  formType: "create" | "update";
  id?: number;
  setValue?: any;
  control: any;
}) {
  const joinedTable = getDatabaseTable(
    field.relation!.table!
  ) as DATABASE_TABLE;

  const joinedTableData = useQuery([joinedTable.name], () =>
    getTable({ tableName: joinedTable.name })
  );

  const pivotTable = getDatabaseTable(
    field.relation!.pivotTable!
  ) as DATABASE_TABLE;
  const pivotTableData = useQuery([pivotTable.name + "/" + id], () =>
    getTable({ tableName: pivotTable.name })
  );

  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <label htmlFor={field.name}>
        {translate(table.name + "/" + field.name)}
      </label>
      <div className="w-full p-4 bg-gray-200 rounded-md">
        {pivotTableData.data &&
          pivotTableData.data
            .filter((pivot: any) => {
              // MANY-TO-MANY bu filtre kalkacak  databsae e where li get gelince
              return pivot[field.relation!.pivotTableKeyColumn!] === id;
            })
            .map((pivot: any) => {
              const joinedTableRelationField = joinedTableData.data.find(
                (joinedTableColumn: any) =>
                  joinedTableColumn.id ===
                  pivot[field.relation!.pivotTableForeignKeyColumn!]
              );

              if (!joinedTableRelationField) return null;
              return (
                <div key={pivot.id}>
                  <h2 className="font-medium">
                    Komponent:{" "}
                    {joinedTableRelationField[field.relation!.displayColumn!]}
                  </h2>
                  {
                    field.relation!.pivotTableExtraColumns?.map(
                      (extraColumn) => {
                        console.log("hey hey", extraColumn);

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
                  }
                </div>
              );
            })}
      </div>
    </div>
  );
}
