import { useContext } from "react";
import { EditorContext } from "@tiptap/react";

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within <EditorContext.Provider>");
  }
  return context;
};
