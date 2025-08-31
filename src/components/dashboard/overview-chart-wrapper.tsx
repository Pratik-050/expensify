"use client";
import { api } from "@/trpc/react";
import { startOfYear, endOfYear } from "date-fns";
import { OverviewChart } from "./overview-chart";

export function OverviewChartWrapper() {
  const { data, isLoading } = api.transaction.getMonthlySummary.useQuery({
    from: startOfYear(new Date()),
    to: endOfYear(new Date()),
  });

  return <OverviewChart data={data ?? []} isLoading={isLoading} />;
}
