import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@/components/tiptap-extension/task-item-fixed"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"
import { Heading } from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension"
import { Selection } from "@/components/tiptap-extension/selection-extension"
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---


import content from "@/components/tiptap-templates/simple/data/content.json"

const MainToolbarContent = ({
  editor,
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  editor: any | null;
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockquoteButton className={`tiptap-button-icon ${editor?.isActive("blockquote") ? "tiptap-button-icon-active" : ""}`} />
        <CodeBlockButton className={`tiptap-button-icon ${editor?.isActive("codeBlock") ? "tiptap-button-icon-active" : ""}`} />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" className={`tiptap-button-icon ${editor?.isActive("bold") ? "tiptap-button-icon-active" : ""}`} />
        <MarkButton type="italic" className={`tiptap-button-icon ${editor?.isActive("italic") ? "tiptap-button-icon-active" : ""}`} />
        <MarkButton type="strike" className={`tiptap-button-icon ${editor?.isActive("strike") ? "tiptap-button-icon-active" : ""}`} />
        <MarkButton type="underline" className={`tiptap-button-icon ${editor?.isActive("underline") ? "tiptap-button-icon-active" : ""}`} />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <Button
          onClick={() => {
            if (!editor) return;
            editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run();
          }}
          className={`tiptap-button-icon ${editor?.isActive("highlight", { color: "#fef08a" }) ? "tiptap-button-icon-active" : ""}`}
          aria-label="Toggle yellow highlight"
        >
          <HighlighterIcon className="tiptap-button-icon" />
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" className={`tiptap-button-icon ${editor?.isActive("superscript") ? "tiptap-button-icon-active" : ""}`} />
        <MarkButton type="subscript" className={`tiptap-button-icon ${editor?.isActive("subscript") ? "tiptap-button-icon-active" : ""}`} />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" className={`tiptap-button-icon ${editor?.isActive({ textAlign: "left" }) ? "tiptap-button-icon-active" : ""}`} />
        <TextAlignButton align="center" className={`tiptap-button-icon ${editor?.isActive({ textAlign: "center" }) ? "tiptap-button-icon-active" : ""}`} />
        <TextAlignButton align="right" className={`tiptap-button-icon ${editor?.isActive({ textAlign: "right" }) ? "tiptap-button-icon-active" : ""}`} />
        <TextAlignButton align="justify" className={`tiptap-button-icon ${editor?.isActive({ textAlign: "justify" }) ? "tiptap-button-icon-active" : ""}`} />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" className="tiptap-button-icon" />
      </ToolbarGroup>

      

    </>
  );
};


const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => {
  const { editor } = React.useContext(EditorContext) as { editor: any };

  return (
    <>
      <ToolbarGroup>
        <Button data-style="ghost" onClick={onBack}>
          <ArrowLeftIcon className="tiptap-button-icon" />
          {type === "highlighter" ? (
            <HighlighterIcon className="tiptap-button-icon" />
          ) : (
            <LinkIcon className="tiptap-button-icon" />
          )}
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {type === "highlighter" ? (
        <ToolbarGroup>
          <Button
            onClick={() => {
              if (!editor) return;
              editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run();
            }}
            className={`tiptap-button-icon ${editor?.isActive("highlight", { color: "#fef08a" }) ? "tiptap-button-icon-active" : ""}`}
            aria-label="Toggle yellow highlight"
          >
            <HighlighterIcon className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>
      ) : (
        <ToolbarGroup>
          <LinkContent />
        </ToolbarGroup>
      )}
    </>
  );
};


export function SimpleEditor({
  content,
  onUpdate,
}: {
  content: string;
  onUpdate: (html: string) => void;
}) {
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<"main" | "highlighter" | "link">("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    content,
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: false,        // Disable built-in heading
        bulletList: false,     // Disable built-in bullet list
        orderedList: false,    // Disable built-in ordered list
        listItem: false        // Disable built-in listItem
      }),
      Heading.configure({ levels: [1, 2, 3, 4] }),
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "task-item",
        },
      }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
  });

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
      >
        {mobileView === "main" ? (
          <MainToolbarContent
            editor={editor}
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === "highlighter" ? "highlighter" : "link"}
            onBack={() => setMobileView("main")}
          />
        )}
      </Toolbar>

      <div className="content-wrapper">
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </div>
    </EditorContext.Provider>
  );
}
