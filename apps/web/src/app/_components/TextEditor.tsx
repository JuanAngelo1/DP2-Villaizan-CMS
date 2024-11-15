import React, { useCallback, useState } from "react";
import { useEditor, EditorContent, Editor, FloatingMenu, BubbleMenu } from "@tiptap/react";
import { Node } from '@tiptap/pm/model'
import { NodeSelection } from '@tiptap/pm/state'
import Placeholder from '@tiptap/extension-placeholder';
import DragHandle from '@tiptap-pro/extension-drag-handle-react';
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import FileHandler from '@tiptap-pro/extension-file-handler';
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import TextAlign from '@tiptap/extension-text-align';
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Image from '@tiptap/extension-image';
import History from "@tiptap/extension-history";
import Heading from "@tiptap/extension-heading";
import { AlignCenter, AlignCenterIcon, AlignCenterVerticalIcon, AlignJustifyIcon, AlignLeft, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, ClipboardCopyIcon, ClipboardIcon, Code2, CopyIcon, EllipsisIcon, GripHorizontalIcon, GripVerticalIcon, Heading1Icon, Heading2Icon, Heading3Icon, ItalicIcon, ListTreeIcon, LogsIcon, PilcrowIcon, PlusIcon, Redo2, RemoveFormattingIcon, Strikethrough, UnderlineIcon, Undo2, XIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui/components/toggle-group"
import { Separator } from "@repo/ui/components/separator";
import { Label } from "@repo/ui/components/label";
import './styles.scss';

interface TextEditorProps {
  content: string;
  onContentChange: (content: string) => any;
}

export default function TextEditor<T extends TextEditorProps>({ content, onContentChange }: T) {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Image,
      Placeholder.configure({
        placeholder: 'Escribe aquí …',
      }),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // Si hay contenido HTML, detén la inserción manual y permite que otras extensiones manejen la inserción vía inputRule
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run();
            };
          });
        },
      }),
      Link.configure({
        openOnClick: false
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({ levels: [1, 2, 3] }), // Configuración de niveles de encabezado
      Bold,
      Underline,
      Italic,
      Image,
      Strike,
      Code,
    ],
    content,
    onUpdate(props) {
      onContentChange(props.editor.getHTML());
    },
  }) as Editor;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [currentNode, setCurrentNode] = useState<Node | null>(null)
  const [currentNodePos, setCurrentNodePos] = useState<number>(-1)

  const handleNodeChange = useCallback(
    (data: { node: Node | null; editor: Editor; pos: number }) => {
      if (data.node) {
        setCurrentNode(data.node)
      }

      setCurrentNodePos(data.pos)
    },
    [setCurrentNodePos, setCurrentNode],
  )

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

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const resetTextFormatting = useCallback(() => {
    const chain = editor.chain()

    chain.setNodeSelection(currentNodePos).unsetAllMarks()

    if (currentNode?.type.name !== 'paragraph') {
      chain.setParagraph()
    }

    chain.run()
  }, [editor, currentNodePos, currentNode?.type.name])

  const duplicateNode = useCallback(() => {
    editor.commands.setNodeSelection(currentNodePos)

    const { $anchor } = editor.state.selection
    const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node

    editor
      .chain()
      .setMeta('hideDragHandle', true)
      .insertContentAt(currentNodePos + (currentNode?.nodeSize || 0), selectedNode.toJSON())
      .run()
  }, [editor, currentNodePos, currentNode?.nodeSize])

  const copyNodeToClipboard = useCallback(() => {
    editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos).run()

    document.execCommand('copy')
  }, [editor, currentNodePos])

  const deleteNode = useCallback(() => {
    editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos).deleteSelection().run()
  }, [editor, currentNodePos])

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full mb-12">
      {/* BubbleMenu para Formateo de Texto*/}
      <BubbleMenu
        pluginKey="bubbleMenuText"
        className="flex h-fit items-center gap-1 p-1 w-fit overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
        tippyOptions={{ duration: 250 }}
        editor={editor}
        shouldShow={({ editor }) => {
          // Mostrar solo si NO es una imagen activa.
          return !editor.isActive('image') && editor.state.selection.from !== editor.state.selection.to;
        }}
      >
        {/* Popover para jerarquia de parrafo */}
        <Popover>
          <PopoverTrigger>
            <Button
              title="Parrafos"
              variant={'ghost'}
              className="p-2"
            >
              <PilcrowIcon />
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" alignOffset={-4} sideOffset={8} className="h-fit w-fit">
            <ToggleGroup type="single" className="flex flex-col items-start justify-center gap-1.5 p-1">
              <Label>Jerarquía</Label>
              <Separator orientation="horizontal" className="w-full" />
              <div className="flex flex-col gap-1 items-start *:w-full">
                <ToggleGroupItem
                  value="paragraph"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  title="Parrafo"
                  className="p-2 gap-2"
                >
                  <PilcrowIcon /> Parrafo
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="paragraph"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  title="Parrafo"
                  className="p-2 gap-2"
                >
                  <Heading1Icon /> Encabezado 1
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="heading"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  title="Encabezado"
                  className="p-2 gap-2"
                >
                  <Heading2Icon /> Encabezado 2
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="heading"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  title="Encabezado"
                  className="p-2 gap-2"
                >
                  <Heading3Icon /> Encabezado 3
                </ToggleGroupItem>
              </div>
            </ToggleGroup>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-6" />
        
        {/* Botones de formateo de texto */}
        <ToggleGroup type="multiple">
          <ToggleGroupItem
            value="bold"
            onClick={toggleBold}
            title="Negrita"
            className="p-2"
          >
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            onClick={toggleUnderline}
            title="Subrayado"
            className="p-2"
          >
            <UnderlineIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            onClick={toggleItalic}
            title="Cursiva"
            className="p-2"
          >
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strike"
            onClick={toggleStrike}
            title="Tachado"
            className="p-2"
          >
            <Strikethrough />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="h-6" />
        
        {/* Botones de enecabezado */}
        <Popover>
          <PopoverTrigger>
            <Button
              title="Parrafos"
              variant={'ghost'}
              className="p-2"
            >
              <LogsIcon />
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" sideOffset={8} className="flex h-fit w-fit flex-row gap-1 p-1 items-center">
            {/* Botones de alineacion de texto */}
            <ToggleGroup type="single"> 
              <ToggleGroupItem
                value="text-align-left"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                title="Alinear a la izquierda"
                className="p-2"
              >
                <AlignLeftIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="text-align-center"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                title="Alinear al centro"
                className="p-2"
              >
                <AlignCenterIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="text-align-right"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                title="Alinear a la derecha"
                className="p-2"
              >
                <AlignRightIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="text-align-justify"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                title="Justificar texto"
                className="p-2"
              >
                <AlignJustifyIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          </PopoverContent>
        </Popover>
      </BubbleMenu>

      {/* BubbleMenu para Edición de Enlaces */}
      <BubbleMenu
        className="bubble-menu-link"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor }) => {
           // Solo mostrar el bubble menu para enlaces.
          return !editor.isActive('image') && editor.isActive("link");
        }}
      >
        <button
          className="link-button edit-button"
          onClick={openModal}
          title="Editar enlace"
        >
          Edit
        </button>
        <button
          className="link-button remove-button"
          onClick={removeLink}
          title="Eliminar enlace"
        >
          Remove
        </button>
      </BubbleMenu>

      {/* Seccion izquierda de editor */}
      <DragHandle editor={editor}
      tippyOptions={{
        offset: [-2, 40],
        zIndex: 99,
      }}>
        <div>
            
        <Button variant={'ghost'} className="p-2">
          <GripVerticalIcon />
        </Button>

        </div>
      </DragHandle>

      {/* Contenido del Editor */}
      <EditorContent
        editor={editor}
        className="border border-input rounded-md p-4 outline-none shadow-sm"
      />

      {/* Modal para Edición de Enlaces */}
      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Edit Link</h2>
            <input
              type="text"
              className="modal-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
            />
            <div className="modal-buttons">
              <button
                className="modal-save-button"
                onClick={saveLink}
              >
                Save
              </button>
              <button
                className="modal-cancel-button"
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
