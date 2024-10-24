import React, { useCallback, useState } from "react";
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import content from "../admin/contenido/_components/publicaciones_components/content";
import { cn } from "@repo/ui/lib/utils"; // Asegúrate de que esta ruta sea correcta
import { BoldIcon, Code2, ItalicIcon, Redo2, Strikethrough, UnderlineIcon, Undo2 } from "lucide-react";

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code
    ],
    content
  }) as Editor;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    editor.commands.blur();
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full mb-12">
      {/* BubbleMenu para Formateo de Texto */}
      <BubbleMenu
        pluginKey="bubbleMenuText"
        className="flex items-center gap-2 p-2 bg-accent text-whiteCustom rounded shadow-lg"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // Solo mostrar si hay un rango seleccionado.
          return from !== to;
        }}
      >
        <button
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 />
        </button>
        <button
          className={cn(
            "flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5",
            {
              "bg-pink": editor.isActive("bold"),
            }
          )}
          onClick={toggleBold}
        >
          <BoldIcon />
        </button>
        <button
          className={cn(
            "flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5",
            {
              "bg-blue": editor.isActive("underline"),
            }
          )}
          onClick={toggleUnderline}
        >
          <UnderlineIcon />
        </button>
        <button
          className={cn(
            "flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5",
            {
              "bg-green": editor.isActive("italic"),
            }
          )}
          onClick={toggleItalic}
        >
          <ItalicIcon />
        </button>
        <button
          className={cn(
            "flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5",
            {
              "bg-red": editor.isActive("strike"),
            }
          )}
          onClick={toggleStrike}
        >
          <Strikethrough />
        </button>
        <button
          className={cn(
            "flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5",
            {
              "bg-gray4": editor.isActive("code"),
            }
          )}
          onClick={toggleCode}
        >
          <Code2 />
        </button>
      </BubbleMenu>

      {/* BubbleMenu para Edición de Enlaces */}
      <BubbleMenu
        pluginKey="bubbleMenuLink"
        className="flex items-center gap-2 p-2 bg-gray1 text-whiteCustom rounded shadow-lg"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // Solo mostrar el bubble menu para enlaces.
          return from === to && editor.isActive("link");
        }}
      >
        <button
          className="flex items-center justify-center h-8 px-2 bg-blue text-whiteCustom rounded hover:bg-blue-600 cursor-pointer"
          onClick={openModal}
        >
          Edit
        </button>
        <button
          className="flex items-center justify-center h-8 px-2 bg-red text-whiteCustom rounded hover:bg-red-600 cursor-pointer"
          onClick={removeLink}
        >
          Remove
        </button>
      </BubbleMenu>

      {/* Contenido del Editor */}
      <EditorContent
        editor={editor}
        className="border-2 border-gray4 rounded p-4 focus:border-blackCustom outline-none"
      />

      {/* Modal para Edición de Enlaces */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-whiteCustom p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Edit Link</h2>
            <input
              type="text"
              className="w-full p-2 border-2 border-gray5 rounded mb-4"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-green text-whiteCustom rounded hover:bg-green-600"
                onClick={saveLink}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-red text-whiteCustom rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}