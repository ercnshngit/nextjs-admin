import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslate } from "@/langs";
import Link from "next/link";
import useSearchParams from "@/hooks/use-search-params";

export default function CreatePage({
  tableName,
  children,
}: {
  tableName: string;
  children: React.ReactNode;
}) {
  const { translate } = useTranslate();
  const searchParams = useSearchParams();

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)} Ekle</h3>
        <div>
          <Button asChild>
            <Link
              href={{
                pathname: "/dashboard/" + tableName,
                query: searchParams.getAllQueryString(),
              }}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardContent>
          <div className="flex justify-center py-10">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}
