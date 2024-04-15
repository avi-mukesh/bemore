import React from "react";

type PropsType = {
  message: string;
  field: string;
};

export default function ClientValidationError({ message, field }: PropsType) {
  return (
    <div id={`${field}-error`} aria-live="polite" aria-atomic="true">
      <p className="text-sm text-red-500">{message}</p>
    </div>
  );
}
