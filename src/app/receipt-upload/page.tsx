"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Image, X, Check, AlertCircle } from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  extractedData?: {
    amount: number;
    date: string;
    merchant: string;
    category?: string;
  };
  error?: string;
}

export default function ReceiptUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const acceptedFileTypes = "image/*,.pdf";
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const simulateFileProcessing = (fileId: string) => {
    const updateProgress = (progress: number) => {
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, progress } : f)),
      );
    };

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      updateProgress(Math.random() * 30 + 10);
    }, 100);

    setTimeout(() => {
      clearInterval(uploadInterval);
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                status: "processing",
                progress: 100,
              }
            : f,
        ),
      );

      // Simulate processing
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% success rate

        if (isSuccess) {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    status: "completed",
                    extractedData: {
                      amount: Math.random() * 100 + 10,
                      date: new Date().toISOString().split("T")[0],
                      merchant: "Sample Restaurant",
                      category: "Food",
                    },
                  }
                : f,
            ),
          );
        } else {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    status: "error",
                    error: "Failed to extract data from receipt",
                  }
                : f,
            ),
          );
        }
      }, 2000);
    }, 1000);
  };

  const handleFileUpload = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/") && !file.type.includes("pdf")) {
        alert(
          `File ${file.name} is not a supported format. Please upload images or PDFs.`,
        );
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      const fileId = Math.random().toString(36).substr(2, 9);
      const uploadedFile: UploadedFile = {
        id: fileId,
        file,
        status: "uploading",
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, uploadedFile]);
      simulateFileProcessing(fileId);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFileUpload(e.target.files);
      }
    },
    [handleFileUpload],
  );

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const retryProcessing = (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status: "uploading",
              progress: 0,
              error: undefined,
            }
          : f,
      ),
    );
    simulateFileProcessing(fileId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receipt Upload</h1>
          <p className="text-muted-foreground">
            Upload receipts and PDFs to automatically extract transaction data
          </p>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Upload receipt images (JPG, PNG) or PDF files. Maximum file size:
              10MB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25"
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
            >
              <Upload className="text-muted-foreground mx-auto mb-4 size-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Drop files here or click to upload
              </h3>
              <p className="text-muted-foreground mb-4">
                Supports images and PDF files up to 10MB
              </p>
              <input
                type="file"
                multiple
                accept={acceptedFileTypes}
                onChange={handleFileInput}
                className="hidden"
                id="file-input"
              />
              <Button asChild>
                <label htmlFor="file-input" className="cursor-pointer">
                  Select Files
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Info */}
        <Alert>
          <AlertCircle className="size-4" />
          <AlertTitle>Receipt Processing Features</AlertTitle>
          <AlertDescription>
            Our AI-powered system can extract key information from your receipts
            including: amount, date, merchant name, and suggested categories.
            You can review and edit the extracted data before adding it to your
            transactions.
          </AlertDescription>
        </Alert>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
              <CardDescription>
                Track the processing status of your uploaded receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center space-x-4 rounded-lg border p-4"
                  >
                    {/* File Icon */}
                    <div className="flex-shrink-0">
                      {uploadedFile.file.type.startsWith("image/") ? (
                        <Image className="size-8 text-blue-500" />
                      ) : (
                        <FileText className="size-8 text-red-500" />
                      )}
                    </div>

                    {/* File Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      {/* Progress */}
                      {uploadedFile.status === "uploading" && (
                        <div className="mt-2">
                          <Progress
                            value={uploadedFile.progress}
                            className="w-full"
                          />
                          <p className="text-muted-foreground mt-1 text-xs">
                            Uploading... {Math.round(uploadedFile.progress)}%
                          </p>
                        </div>
                      )}

                      {/* Processing */}
                      {uploadedFile.status === "processing" && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <div className="border-primary size-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                            <span className="text-muted-foreground text-sm">
                              Processing receipt...
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Extracted Data */}
                      {uploadedFile.status === "completed" &&
                        uploadedFile.extractedData && (
                          <div className="bg-muted mt-2 rounded-md p-3">
                            <p className="mb-2 text-sm font-medium">
                              Extracted Data:
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Amount:
                                </span>
                                <span className="ml-2 font-medium">
                                  $
                                  {uploadedFile.extractedData.amount.toFixed(2)}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Date:
                                </span>
                                <span className="ml-2 font-medium">
                                  {uploadedFile.extractedData.date}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Merchant:
                                </span>
                                <span className="ml-2 font-medium">
                                  {uploadedFile.extractedData.merchant}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Category:
                                </span>
                                <span className="ml-2">
                                  <Badge variant="secondary">
                                    {uploadedFile.extractedData.category}
                                  </Badge>
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm">Add as Transaction</Button>
                              <Button size="sm" variant="outline">
                                Edit Details
                              </Button>
                            </div>
                          </div>
                        )}

                      {/* Error */}
                      {uploadedFile.status === "error" && (
                        <div className="bg-destructive/10 mt-2 rounded-md p-3">
                          <p className="text-destructive text-sm">
                            {uploadedFile.error}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2"
                            onClick={() => retryProcessing(uploadedFile.id)}
                          >
                            Retry
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="flex-shrink-0">
                      <Badge
                        variant={
                          uploadedFile.status === "completed"
                            ? "default"
                            : uploadedFile.status === "error"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {uploadedFile.status === "completed" && (
                          <Check className="mr-1 size-3" />
                        )}
                        {uploadedFile.status === "uploading" && "Uploading"}
                        {uploadedFile.status === "processing" && "Processing"}
                        {uploadedFile.status === "completed" && "Completed"}
                        {uploadedFile.status === "error" && "Error"}
                      </Badge>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="flex-shrink-0"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
