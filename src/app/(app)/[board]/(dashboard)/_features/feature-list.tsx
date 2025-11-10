"use client";

import { AddRecurringExpensesForm } from "@/components/add-recurring-expenses-form";
import { CsvReader } from "@/components/csv-reader";
import { MoreFeatures } from "@/components/more-features";
import { FeatureItem } from "@/components/more-features/components/feature-item";
import { FeatureList } from "@/components/more-features/components/feature-list";
import { File, House } from "lucide-react";
import { useState } from "react";

export const DashFeatureList = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isRecurringDialogOpen, setIsRecurringDialogOpen] = useState(false);

  return (
    <>
      <MoreFeatures>
        <FeatureList>
          <FeatureItem
            name="Upload file"
            description="Import transactions in bulk"
            icon={<File size={32} />}
            onClick={() => setIsUploadDialogOpen(true)}
          />
          <FeatureItem
            name="Recurring expenses"
            description="Add expenses that are expected every month"
            icon={<House size={32} />}
            onClick={() => setIsRecurringDialogOpen(true)}
          />
        </FeatureList>
      </MoreFeatures>

      <CsvReader
        isOpen={isUploadDialogOpen}
        setIsOpen={setIsUploadDialogOpen}
      />
      <AddRecurringExpensesForm
        isOpen={isRecurringDialogOpen}
        setIsOpen={setIsRecurringDialogOpen}
      />
    </>
  );
};
