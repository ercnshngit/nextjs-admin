"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function HomePage() {
  const { data } = useQuery(["dashboard"], () => getDashboard());

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Toplam Blok Sayısı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.pageCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Son Bloklar</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.blocks.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-row border-b border-gray-300 items-center justify-between space-y-0 pb-2"
            >
              <div className="text-base font-medium">{item.title}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
