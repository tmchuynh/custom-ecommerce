"use client";

import { useRouter } from "next/navigation";

interface AuthAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthAlert({ isOpen, onClose }: AuthAlertProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
        <p className="mb-4">Please log in or sign up to continue.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              router.push("/auth/login");
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Log In / Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
