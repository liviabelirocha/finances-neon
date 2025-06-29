"use client";

import { Tabs, TabsList, TabsTrigger } from "@/_components/ui/tabs";
import { useQuery } from "@/_contexts/query-context";

export type VisualizationType = "monthly" | "yearly" | "all-time";

export const VisualizationTabs = () => {
  const query = useQuery();

  return (
    <Tabs
      defaultValue={query.getParam("visualization") ?? "monthly"}
      onValueChange={(value) =>
        query.setParams([{ name: "visualization", value }])
      }
    >
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
        <TabsTrigger value="all-time">All time</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
