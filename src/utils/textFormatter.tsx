import React from "react";

/**
 * Utility to parse markdown-style asterisks (*) and render them as italic text in React.
 * Useful for italicizing foreign/English terms in Indonesian translations.
 */
export function formatText(text: string): React.ReactNode {
  if (!text) return "";
  if (!text.includes("*")) {
    return text;
  }

  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={index} className="italic font-serif italic not-italic">
              {part.slice(1, -1)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
