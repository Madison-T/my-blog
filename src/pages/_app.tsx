import "@/styles/globals.css";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-templates/simple/simple-editor.scss";
import "@/components/tiptap-node/image-upload-node/image-upload-node.scss"
import "@/components/tiptap-ui-primitive/button/button-colors.scss";
import "@/components/tiptap-ui-primitive/button/button-colors.scss"
import "@/components/tiptap-ui-primitive/button/button-group.scss"
import "@/components/tiptap-ui-primitive/button/button.scss"
import "@/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu.scss"
import "@/components/tiptap-ui-primitive/popover/popover.scss"
import "@/components/tiptap-ui-primitive/separator/separator.scss"
import "@/components/tiptap-ui-primitive/toolbar/toolbar.scss"
import "@/components/tiptap-ui-primitive/tooltip/tooltip.scss"
import "@/components/tiptap-ui/color-highlight-button/color-highlight-button.scss"
import "@/components/tiptap-ui/color-highlight-popover/color-highlight-popover.scss"
import "@/components/tiptap-ui/link-popover/link-popover.scss"


import type { AppProps } from "next/app";
import {  AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
