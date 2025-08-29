"use client";

import "@mdxeditor/editor/style.css";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  // type MDXEditorProps,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";
import "./dark-editor.css";

interface IEditorProps {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = (
  {
    value,
    editorRef,
    fieldChange,
    ...props
  }: IEditorProps /* & MDXEditorProps */,
) => {
  return (
    <MDXEditor
      markdown={value}
      onChange={fieldChange}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
};
export default Editor;
