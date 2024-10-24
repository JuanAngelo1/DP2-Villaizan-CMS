import React, { useCallback, useState } from "react";
import { useEditor, EditorContent, Editor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import TextAlign from '@tiptap/extension-text-align';
import Heading from "@tiptap/extension-heading"
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import content from "../admin/contenido/_components/publicaciones_components/content";
import { cn } from "@repo/ui/lib/utils"; // Asegúrate de que esta ruta sea correcta
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, Code2, ImageIcon, ItalicIcon, MinusIcon, PlusIcon, Redo2, Strikethrough, Trash2Icon, UnderlineIcon, Undo2, VideoIcon } from "lucide-react";
import API from './api';  // aPI PARA SUBIR IMGS

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '300px',
        renderHTML: (attributes) => ({
          style: `width: ${attributes.width}; display: block; margin-left: auto; margin-right: auto;`, // Centrar la imagen
        }),
      },
    };
  },
});

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false
      }),
      Bold,
      Underline,
      Italic,
      CustomImage,
      Image,
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

    // Alineación del texto
  const alignLeft = useCallback(() => {
    editor.chain().focus().setTextAlign('left').run();
  }, [editor]);

  const alignCenter = useCallback(() => {
    editor.chain().focus().setTextAlign('center').run();
  }, [editor]);

  const alignRight = useCallback(() => {
    editor.chain().focus().setTextAlign('right').run();
  }, [editor]);

  const alignJustify = useCallback(() => {
    editor.chain().focus().setTextAlign('justify').run();
  }, [editor]);

  const insertImage = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = async (event) => {
      const file = event.target.files?.[0];
      if (file && editor) {
        const imageUrl = await API.uploadImage(file);
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    };

    fileInput.click();
  };

  const increaseImageSize = () => {
      const currentAttrs = editor.getAttributes('image');
      const currentWidth = currentAttrs.width || '300px';
      const newWidth = `${parseInt(currentWidth) + 50}px`;

      editor.chain().focus().setImage({ ...currentAttrs, width: newWidth }).run();
    };

    const decreaseImageSize = () => {
      const currentAttrs = editor.getAttributes('image');
      const currentWidth = currentAttrs.width || '300px';
      const newWidth = `${Math.max(50, parseInt(currentWidth) - 50)}px`;

      editor.chain().focus().setImage({ ...currentAttrs, width: newWidth }).run();
    };

    const removeImage = () => {
      editor.chain().focus().deleteSelection().run();
    };

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full mb-12">
      {/* BubbleMenu para Formateo de Texto*/}
      <BubbleMenu
        pluginKey="bubbleMenuText"
        className="flex items-center gap-2 p-2 bg-accent text-whiteCustom rounded shadow-lg"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor }) => {
          // Mostrar solo si NO es una imagen activa.
          return !editor.isActive('image') && editor.state.selection.from !== editor.state.selection.to;
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
        <button
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5"
          onClick={alignLeft}
        >
          <AlignLeftIcon />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5"
          onClick={alignCenter}
        >
          <AlignCenterIcon />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5"
          onClick={alignRight}
        >
          <AlignRightIcon />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-transparent cursor-pointer hover:bg-gray5"
          onClick={alignJustify}
        >
          <AlignJustifyIcon />
        </button>
      </BubbleMenu>

      {/* BubbleMenu para Edición de Enlaces */}
      <BubbleMenu
        pluginKey="bubbleMenuLink"
        className="flex items-center gap-2 p-2 bg-gray1 text-whiteCustom rounded shadow-lg"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor }) => {
           // Solo mostrar el bubble menu para enlaces.
          return !editor.isActive('image') && editor.isActive("link");
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

      {/* BubbleMenu para edición de imágenes */}
      <BubbleMenu
        pluginKey="bubbleMenuImage"
        className="flex items-center gap-2 p-2 bg-white shadow-md rounded"
        editor={editor}
        tippyOptions={{ duration: 150 }}
        shouldShow={({ editor }) => editor.isActive('image')}  // Solo mostrar si una imagen está activa
      >
        <button
          onClick={increaseImageSize}
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-gray-200 hover:bg-gray-300"
        >
          <PlusIcon />
        </button>
        <button
          onClick={decreaseImageSize}
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-gray-200 hover:bg-gray-300"
        >
          <MinusIcon />
        </button>
        <button
          onClick={removeImage}
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-red-500 text-white hover:bg-red-600"
        >
          <Trash2Icon />
        </button>
      </BubbleMenu>

       {/* FloatingMenu para insertar elementos como imágenes */}
      <FloatingMenu
        editor={editor}
        tippyOptions={{ duration: 150 }}
        className="flex gap-2 p-2 bg-white shadow-md rounded absolute left-0"
        shouldShow={({ editor, state }) => {
          const { $from } = state.selection;
          return $from.parent.type.name === 'paragraph';
        }}
      >
        <button
          className="flex items-center justify-center w-8 h-8 p-0 rounded bg-gray5 hover:bg-gray4"
          onClick={insertImage}
        >
          <ImageIcon />
        </button>
        <button className="flex items-center justify-center w-8 h-8 p-0 rounded bg-gray5 hover:bg-gray4">
          <PlusIcon />
        </button>
      </FloatingMenu>

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
