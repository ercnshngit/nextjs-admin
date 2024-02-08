import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Button } from "../../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslate } from "@/langs";
import Link from "next/link";
import useSearchParams from "@/hooks/use-search-params";
import DeleteItem from "@/components/delete-dialog";
import UpdateFormBase from "@/components/base-form/update-form-base";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { useTable } from "@/hooks/use-database";

export default function UpdatePage({
  id,
  tableName,
  children,
}: {
  id: string;
  tableName: string;
  children: React.ReactNode;
}) {
  const { translate } = useTranslate();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)} Düzenle</h3>
        <div>
          <Button asChild>
            <Link href={"/dashboard/" + tableName}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardHeader>
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">
              {id} Numaralı {translate(tableName)}
            </h3>
            <DeleteItem
              open={open}
              setOpen={setOpen}
              tableName={tableName}
              id={id}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start py-10">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}
