"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample report data
const monthlyReports = [
  {
    month: "January 2024",
    totalIncome: 5000,
    totalExpenses: 3500,
    netIncome: 1500,
    transactionCount: 42,
    topCategory: "Food",
    topCategoryAmount: 850,
  },
  {
    month: "December 2023",
    totalIncome: 4800,
    totalExpenses: 3200,
    netIncome: 1600,
    transactionCount: 38,
    topCategory: "Shopping",
    topCategoryAmount: 920,
  },
  {
    month: "November 2023",
    totalIncome: 5200,
    totalExpenses: 3800,
    netIncome: 1400,
    transactionCount: 45,
    topCategory: "Transportation",
    topCategoryAmount: 680,
  },
];

const categoryBreakdown = [
  { category: "Food", amount: 1250, percentage: 32, transactions: 15 },
  { category: "Transportation", amount: 890, percentage: 23, transactions: 8 },
  { category: "Shopping", amount: 680, percentage: 17, transactions: 12 },
  { category: "Bills", amount: 450, percentage: 12, transactions: 6 },
  { category: "Entertainment", amount: 320, percentage: 8, transactions: 9 },
  { category: "Healthcare", amount: 310, percentage: 8, transactions: 4 },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState("monthly");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const handleExportReport = (format: "csv" | "pdf") => {
    // Simulate report export
    console.log(`Exporting ${reportType} report as ${format.toUpperCase()}`);
    // In a real app, this would trigger a download
    alert(`Report exported as ${format.toUpperCase()}!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate and download detailed financial reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExportReport("csv")}>
              <Download className="mr-2 size-4" />
              Export CSV
            </Button>
            <Button onClick={() => handleExportReport("pdf")}>
              <Download className="mr-2 size-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Report Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>
              Configure the parameters for your financial report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="category">Category Breakdown</SelectItem>
                  <SelectItem value="detailed">
                    Detailed Transactions
                  </SelectItem>
                  <SelectItem value="trend">Trend Analysis</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {dateFrom ? format(dateFrom, "MMM dd, yyyy") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {dateTo ? format(dateTo, "MMM dd, yyyy") : "To date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        {reportType === "monthly" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-4" />
                Monthly Summary Report
              </CardTitle>
              <CardDescription>
                Overview of your financial activity by month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Total Income</TableHead>
                    <TableHead className="text-right">Total Expenses</TableHead>
                    <TableHead className="text-right">Net Income</TableHead>
                    <TableHead className="text-right">Transactions</TableHead>
                    <TableHead>Top Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {report.month}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        ${report.totalIncome.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        ${report.totalExpenses.toLocaleString()}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          report.netIncome > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {report.netIncome > 0 ? "+" : ""}$
                        {report.netIncome.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {report.transactionCount}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {report.topCategory} (${report.topCategoryAmount})
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {reportType === "category" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>
                  Spending breakdown by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryBreakdown.map((category, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {category.category}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {category.percentage}%
                          </span>
                        </div>
                        <div className="bg-muted h-2 w-full rounded-full">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ${category.amount.toLocaleString()}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {category.transactions} transactions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>
                  Key metrics for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-green-600" />
                      <span className="text-sm">Total Income</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      $5,000
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="size-4 text-red-600" />
                      <span className="text-sm">Total Expenses</span>
                    </div>
                    <span className="text-lg font-bold text-red-600">
                      $3,900
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Net Income</span>
                      <span className="text-xl font-bold text-green-600">
                        +$1,100
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">64</div>
                      <div className="text-muted-foreground text-xs">
                        Total Transactions
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">$61</div>
                      <div className="text-muted-foreground text-xs">
                        Avg. Transaction
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {(reportType === "detailed" || reportType === "trend") && (
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === "detailed"
                  ? "Detailed Transaction Report"
                  : "Trend Analysis Report"}
              </CardTitle>
              <CardDescription>
                {reportType === "detailed"
                  ? "Complete list of all transactions in the selected period"
                  : "Financial trends and patterns over time"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                <FileText className="mx-auto mb-4 size-12" />
                <p className="mb-2 text-lg font-medium">Report Preview</p>
                <p>
                  {reportType === "detailed"
                    ? "This report will include all transaction details for the selected period."
                    : "This report will show spending trends, patterns, and forecasts."}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => handleExportReport("pdf")}
                >
                  Generate Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
