import React from "react";

type PropsType = {
  state: any;
  field: string;
};

export default function ValidationError({ state, field }: PropsType) {
  return (
    <div id={`${field}-error`} aria-live="polite" aria-atomic="true">
      {state.errors[field].map((error: string) => (
        <p className="text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}
