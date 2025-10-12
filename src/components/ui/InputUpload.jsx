import React, { useState, useRef } from "react";
import { storageAPI } from "../../services/api";

const InputUpload = ({
  onUploadComplete,
  folder = "profiles",
  disabled = false,
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await storageAPI.upload(formData, (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        }
      });

      onUploadComplete?.(response.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      const errorMessage = error.response?.data?.message || error.message;
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input file nascosto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {/* Area di upload visibile */}
      <div
        onClick={triggerFileInput}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${
            disabled
              ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-60"
              : isUploading
              ? "border-blue-300 bg-blue-50 cursor-wait"
              : "border-gray-300 bg-white cursor-pointer hover:border-blue-400 hover:bg-blue-50"
          }
        `}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium text-gray-700">
              Uploading... {uploadProgress}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-base font-medium text-gray-700">
              Upload profile picture
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, WEBP up to 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputUpload;
