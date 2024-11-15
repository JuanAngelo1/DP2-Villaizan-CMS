'use client';

/* eslint-disable quotes */
import React, { useCallback, useState } from 'react';

import RcTiptapEditor, {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  Color,
  ColumnActionButton,
  Emoji,
  ExportPdf,
  FontSize,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SlashCommand,
  Strike,
  Table,
  TextAlign,
  Underline,
  Video,
  locale,
  Mention,
  Attachment,
  ImageGif,
  type Editor,
} from 'reactjs-tiptap-editor';

import 'reactjs-tiptap-editor/style.css';

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 100_000,
    },
  }),
  History,
  Clear,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  Video.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  ImageGif.configure({
    GIPHY_API_KEY: process.env.NEXT_PUBLIC_GIPHY_API_KEY
  }),
  Blockquote.configure({ spacer: true }),
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  ColumnActionButton,
  Table,
  ExportPdf.configure({ spacer: true }),
  Mention,
  Attachment.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
];

const DEFAULT = ``;

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

interface RichTextEditorProps {
  editorContent?: string;
  refEditor: React.RefObject<{ editor: Editor | null }>;
}

function RichTextEditor<T extends RichTextEditorProps>({ editorContent, refEditor }: T)  {
  locale.setMessage('es_PE', {
    'editor.remove': 'Eliminar',
    'editor.copy': 'Copiar',
    'editor.words': 'Palabras',
    'editor.characters': 'Caracteres',
    'editor.default': 'Por defecto',
    'editor.recent': 'Reciente',
    'editor.nofill': 'Sin relleno',
    'editor.format': 'Formato',
    'editor.delete': 'Eliminar',
    'editor.edit': 'Editar',
    'editor.settings': 'Ajustes',
    'editor.table_of_content': 'Tabla de contenido',
    'editor.draghandle.tooltip': 'Reordenar',
    'editor.copyToClipboard': 'Copiar al portapapeles',
    'editor.importWord.tooltip': 'Importar Word',
    'editor.slash': "Escriba '/' para ver los comandos",
    'editor.slash.empty': 'No hay coincidencias',
    'editor.slash.format': 'Formato',
    'editor.slash.insert': 'Insertar',
    'editor.slash.embed': 'Incrustar',
    'editor.content': 'Contenido',
    'editor.fontFamily.tooltip': 'Fuente',
    'editor.fontFamily.default.tooltip': 'Fuente por defecto',
    'editor.moremark': 'Más',
    'editor.size.small.tooltip': 'Pequeño',
    'editor.size.medium.tooltip': 'Mediano',
    'editor.size.large.tooltip': 'Grande',
    'editor.bold.tooltip': 'Negrita',
    'editor.italic.tooltip': 'Cursiva',
    'editor.underline.tooltip': 'Subrayado',
    'editor.strike.tooltip': 'Tachado',
    'editor.color.tooltip': 'Color',
    'editor.color.more': 'Más',
    'editor.highlight.tooltip': 'Resaltar',
    'editor.lineheight.tooltip': 'Interlineado',
    'editor.heading.tooltip': 'Encabezado',
    'editor.heading.h1.tooltip': 'Título 1',
    'editor.heading.h2.tooltip': 'Título 2',
    'editor.heading.h3.tooltip': 'Título 3',
    'editor.heading.h4.tooltip': 'Título 4',
    'editor.heading.h5.tooltip': 'Título 5',
    'editor.heading.h6.tooltip': 'Título 6',
    'editor.paragraph.tooltip': 'Párrafo',
    'editor.textalign.tooltip': 'Alineación',
    'editor.textalign.left.tooltip': 'Izquierda',
    'editor.textalign.center.tooltip': 'Centro',
    'editor.textalign.right.tooltip': 'Derecha',
    'editor.textalign.justify.tooltip': 'Justificar',
    'editor.indent': 'Sangría',
    'editor.indent.indent': 'Aumentar sangría',
    'editor.indent.outdent': 'Disminuir sangría',
    'editor.fontSize.tooltip': 'Tamaño de fuente',
    'editor.fontSize.default.tooltip': 'Tamaño de fuente',
    'editor.superscript.tooltip': 'Superíndice',
    'editor.subscript.tooltip': 'Subíndice',
    'editor.bulletlist.tooltip': 'Lista con viñetas',
    'editor.orderedlist.tooltip': 'Lista numerada',
    'editor.tasklist.tooltip': 'Lista de tareas',
    'editor.indent.tooltip': 'Aumentar sangría',
    'editor.outdent.tooltip': 'Disminuir sangría',
    'editor.columns.tooltip': 'Columnas',
    'editor.link.tooltip': 'Enlace',
    'editor.link.unlink.tooltip': 'Desvincular',
    'editor.link.open.tooltip': 'Abrir',
    'editor.link.edit.tooltip': 'Editar',
    'editor.link.dialog.title': 'Enlace',
    'editor.link.dialog.link': 'Enlace',
    'editor.link.dialog.text': 'Texto',
    'editor.link.dialog.openInNewTab': 'Abrir en una nueva pestaña',
    'editor.link.dialog.link.placeholder': 'Enlace',
    'editor.link.dialog.text.placeholder': 'Texto',
    'editor.link.dialog.button.apply': 'Aplicar',
    'editor.image.tooltip': 'Imagen',
    'editor.image.dragger.tooltip': 'Arrastrar y soltar',
    'editor.image.float.left.tooltip': 'Alinear a la izquierda',
    'editor.image.float.none.tooltip': 'Sin alineación',
    'editor.image.float.right.tooltip': 'Alinear a la derecha',
    'editor.image.dialog.title': 'Imagen',
    'editor.image.dialog.tab.url': 'URL',
    'editor.image.dialog.tab.upload': 'Subir',
    'editor.image.dialog.tab.uploadCrop': 'Subir y recortar',
    'editor.image.dialog.uploading': 'Subiendo',
    'editor.link.dialog.inline': 'En línea',
    'editor.image.dialog.form.link': 'Enlace',
    'editor.image.dialog.placeholder': 'Imagen',
    'editor.image.dialog.form.alt': 'Texto alternativo',
    'editor.image.dialog.form.aspectRatio': 'Relación de aspecto',
    'editor.image.dialog.form.file': 'Archivo',
    'editor.image.dialog.button.apply': 'Aplicar',
    'editor.video.tooltip': 'Vídeo',
    'editor.video.dialog.tab.upload': 'Subir',
    'editor.video.dialog.uploading': 'Subiendo',
    'editor.video.dialog.title': 'Vídeo',
    'editor.video.dialog.link': 'Enlace',
    'editor.video.dialog.placeholder': 'Vídeo',
    'editor.video.dialog.button.apply': 'Aplicar',
    'editor.table.tooltip': 'Tabla',
    'editor.table.menu.insert_table': 'Insertar tabla',
    'editor.table.menu.insert_table.with_header_row': 'Insertar tabla con fila de encabezado',
    'editor.table.menu.add_column_before': 'Añadir columna antes',
    'editor.table.menu.add_column_after': 'Añadir columna después',
    'editor.table.menu.delete_column': 'Eliminar columna',
    'editor.table.menu.add_row_before': 'Añadir fila antes',
    'editor.table.menu.add_row_after': 'Añadir fila después',
    'editor.table.menu.delete_row': 'Eliminar fila',
    'editor.table.menu.merge_or_split_cells': 'Combinar o dividir celdas',
    'editor.table.menu.delete_table': 'Eliminar tabla',
    'editor.blockquote.tooltip': 'Cita',
    'editor.horizontalrule.tooltip': 'Línea horizontal',
    'editor.code.tooltip': 'Código',
    'editor.codeblock.tooltip': 'Bloque de código',
    'editor.clear.tooltip': 'Limpiar formato',
    'editor.undo.tooltip': 'Deshacer',
    'editor.redo.tooltip': 'Rehacer',
    'editor.fullscreen.tooltip.fullscreen': 'Pantalla completa',
    'editor.fullscreen.tooltip.exit': 'Salir de pantalla completa',
    'editor.imageUpload.cancel': 'Cancelar',
    'editor.imageUpload.crop': 'Recortar',
    'editor.imageUpload.fileTypeNotSupported': 'Tipo de archivo no compatible',
    'editor.imageUpload.fileSizeTooBig': 'El tamaño del archivo es demasiado grande',
    'editor.table.menu.insertColumnBefore': 'Insertar columna antes',
    'editor.table.menu.insertColumnAfter': 'Insertar columna después',
    'editor.table.menu.deleteColumn': 'Eliminar columna',
    'editor.table.menu.insertRowAbove': 'Insertar fila arriba',
    'editor.table.menu.insertRowBelow': 'Insertar fila abajo',
    'editor.table.menu.deleteRow': 'Eliminar fila',
    'editor.table.menu.mergeCells': 'Combinar celdas',
    'editor.table.menu.splitCells': 'Dividir celdas',
    'editor.table.menu.deleteTable': 'Eliminar tabla',
    'editor.table.menu.setCellsBgColor': 'Establecer color de fondo de las celdas',
    'editor.emoji.tooltip': 'Emoji',
    'editor.iframe.tooltip': 'Iframe',
    'editor.searchAndReplace.tooltip': 'Buscar y reemplazar',
    'editor.search.dialog.text': 'Buscar',
    'editor.replace.dialog.text': 'Reemplazar',
    'editor.replaceAll.dialog.text': 'Reemplazar todo',
    'editor.previous.dialog.text': 'Anterior',
    'editor.next.dialog.text': 'Siguiente',
    no_result_found: 'No se encontraron resultados',
    'Smileys & People': 'Emoticonos y personas',
    'Animals & Nature': 'Animales y naturaleza',
    'Food & Drink': 'Comida y bebida',
    Activity: 'Actividad',
    'Travel & Places': 'Viajes y lugares',
    Object: 'Objeto',
    Symbol: 'Símbolo',
    Flags: 'Banderas',
    'Frequently used': 'Usados con frecuencia',
    'editor.formula.dialog.text': 'Fórmula',
    'editor.katex.tooltip': 'Katex',
    'editor.exportPdf.tooltip': 'Exportar a PDF',
    'editor.exportWord.tooltip': 'Exportar a Word',
    'editor.importWrod.tooltip': 'Importar Word',
    'editor.textDirection.tooltip': 'Dirección del texto',
    'editor.textDirection.auto.tooltip': 'Automático',
    'editor.textDirection.ltr.tooltip': 'Izquierda a derecha',
    'editor.textDirection.rtl.tooltip': 'Derecha a izquierda',
    'editor.attachment.tooltip': 'Adjunto',
    'editor.attachment.uploading': 'Subiendo',
    'editor.attachment.please_upload': 'Inserte un archivo',
    'editor.imageGif.tooltip': 'GIF',
    'editor.replace.caseSensitive': 'Sensible a mayúsculas y minúsculas',
    'editor.mermaid.tooltip': 'Mermaid',
    'editor.twitter.tooltip': 'Twitter',
    'editor.tooltip.flipX': 'Voltear horizontalmente',
    'editor.tooltip.flipY': 'Voltear verticalmente',
  });
  locale.setLang('es_PE');  

  const [content, setContent] = useState(() => (editorContent ? editorContent : DEFAULT));
  const [theme, setTheme] = useState('light');
  const [disable, setDisable] = useState(false);

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value);
    }, 300),
    [],
  );

  return (
      <div
        box-sizing="border-box"
        className='w-full border border-gray-200 rounded-lg outline-none'
      >
        <RcTiptapEditor
          ref={refEditor}
          output='html'
          content={content}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme === 'dark'}
          disabled={disable}
        />
      </div>
  );
}

export default RichTextEditor;