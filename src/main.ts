// ==UserScript==
// @name         Netlang Hotfixes & Improvements
// @namespace    http://8char.me/
// @version      2024-02-27
// @description  Aims to ease netlang development, by ironing out bugs. This is more or less a hot fix, and should only be used if these issues haven't been fixed yet
// @author       You
// @match        https://make.netlang.com/studio*
// @icon         https://i.imgur.com/Av1hdOk.png
// @grant        none
// ==/UserScript==

import Prism from 'prismjs';
Prism.manual = true;
import getLoader from 'prismjs/dependencies';
import components from 'prismjs/components';
import $ from 'jquery';
import { decode } from 'html-entities';

import type { editor } from 'monaco-editor';

declare global {
    interface Window {
        monaco: {
            editor: typeof editor;
        };
        highlightJavaSyntax: () => void;
    }
}

(async function (): Promise<void> {
    const LANGUAGES = ['java', 'javadoc', 'javastacktrace'];
    const waitForMonaco = async (): Promise<boolean> =>
        new Promise((resolve) => {
            const checkForMonaco = (): number | void =>
                typeof window.monaco !== 'undefined'
                    ? resolve(true)
                    : requestAnimationFrame(checkForMonaco);

            checkForMonaco();
        });

    getLoader(components, LANGUAGES, []).load((id: string) =>
        require(`prismjs/components/prism-${id}.min.js`),
    );

    function highlightJavaSyntax(): void {
        $('.netlang-logo').each((_, el) => {
            $(el).attr('src', 'https://svgshare.com/i/160H.svg');
        });

        $('#codeTreeDiv .fancytree-title')
            .filter(
                (_, el) =>
                    !el.classList.contains('language-java') &&
                    !el.classList.contains('code-comment'),
            )
            .addClass('language-java');

        $('#codeTreeDiv .fancytree-title')
            .filter(
                (_, el) =>
                    !el.classList.contains('language-javadoc') &&
                    el.classList.contains('code-comment'),
            )
            .addClass('language-javadoc');

        $('.output-console')
            .filter(
                (_, el) => !el.classList.contains('language-javastacktrace'),
            )
            .addClass('language-javastacktrace');

        $('.ag-theme-material').each((_, el) => {
            el.classList.replace('ag-theme-material', 'ag-theme-quartz-dark');
        });

        $('ag-grid-angular')
            .eq(3)
            .find('[aria-colindex="3"]')
            .filter((_, el) => !el.classList.contains('language-java'))
            .each((_, el) => {
                $(el).text(decode($(el).text()));
            })
            .addClass('language-java');

        $(LANGUAGES.map((item) => `.language-${item}`).join(', ')).each(
            (_, el) => Prism.highlightElement(el),
        );
    }

    window.highlightJavaSyntax = highlightJavaSyntax;

    $('head')
        .append(`<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
    <style>
    .code-tree .fancytree-title {
        font-family: JetBrains Mono !important;
      }
      .code-expression .CodeMirror {
        font-family: JetBrains Mono !important;
      }

      ul.fancytree-container {
        color: #989faa !important;
      }

      .fullline .fancytree-node.fancytree-selected {
        background-color: #2a313c !important;
        border-radius: 0 !important;
        color: inherit !important;
      }

      .fancytree-active .fancytree-title.code-comment,
      .fancytree-selected .fancytree-title.code-comment,
      .fancytree-title.code-comment,
      .fullline
        .fancytree-treefocus
        .fancytree-selected
        .fancytree-title.code-comment,
      i.code-comment {
        color: hsl(95, 38%, 62%) !important;
      }

      .table {
        color: #989faa !important;
        background-color: #282c34 !important;
      }

      .project-tree tbody tr td {
        color: #989faa !important;
      }

      .lm_content,
      .code-tree {
        background: #282c34 !important;
      }

      .fullline .fancytree-node {
        border-bottom: 1px solid rgb(0, 0, 0, 0) !important;
      }

      ul {
        border-left: 1px solid rgb(152, 159, 170, 0.4);
      }

      tr:hover {
        background-color: #242a31 !important;
      }
      tr {
        color: #cccccc !important;
      }
      .fancytree-selected .fancytree-title,
      .fancytree-treefocus .fancytree-selected .fancytree-title {
        background-color: inherit;
      }
      .fancytree-ext-table tbody tr.fancytree-selected {
        background-color: #2a313a !important;
      }
      #projectTreeDiv {
        background-color: #20252b !important;
      }
      .lm_header .lm_tab {
        border-top: 1px solid rgba(0, 0, 0, 0) !important;
        border-left: none !important;
        border-bottom: 1px solid #171a1f !important;
        border-right: 1px solid #171a1f !important;
        background: #272c34 !important;
      }

      .lm_header .lm_tab.lm_active {
        border-top: 1px solid #048cd4 !important;
        border-bottom: none !important;
        border-left: none !important;
      }
      .lm_header .lm_tab {
        margin-right: 0 !important;
      }
      .netlang .no-code-source .code-tree,
      .netlang .no-code-source .java-editor {
        border-right: none;
      }

      .netlang-flex-root,
      .bottom-tab {
        background: #20252b !important;
      }
      .netlang .development-toolbar {
        background-color: inherit !important;
      }

      body,
      .checkbox-table .text-sub,
      .output-console,
      .btn {
        color: #989faa !important;
      }

      .fancytree-active .fancytree-title {
        color: inherit !important;
      }

      .code-tree .fancytree-drop-target.fancytree-drop-over,
      .code-tree .fancytree-drop-target.fancytree-drop-accept {
        border-bottom: 1px solid #989faa !important;
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background-color: #646464;
      }
      ::-webkit-scrollbar-track-piece {
        background-color: #282c34;
        border-left: 1px solid #3f4349;
        border-top: 1px solid #3f4349;
      }
      ::-webkit-scrollbar-thumb {
        height: 50px;
        background-color: #39414d;
      }
      ::-webkit-scrollbar-thumb:hover {
        background-color: #3f4855;
      }
      ::-webkit-scrollbar-corner {
        background-color: #282c34;
      }
      ::-webkit-resizer {
        background-color: #666;
      }

      .netlang .development-toolbar,
      .netlang-flex-root,
      .bottom-tab {
        background-color: #20252b !important;
      }

      .bottom-tab .btn-secondary:not(:disabled):not(.disabled):active,
      .bottom-tab .btn-secondary:not(:disabled):not(.disabled).active {
        border-bottom: 1px solid #048cd4 !important;
      }

      .bottom-tab .btn-secondary:not(.active) {
        border-bottom: 1px solid rgba(0, 0, 0, 0) !important;
      }

      .bottom-tab .btn-secondary {
        border-radius: 0 !important;
        background-color: #282c34 !important;
      }

      .float-ui-container {
        border-color: #048cd4 !important;
        background-color: #20252b !important;
        border-radius: 0 !important;
      }

      .checkbox-table .text-sub,
      .output-console,
      .btn {
        color: #989faa !important;
      }

      .float-ui-container > .float-ui-arrow {
        background-color: #048cd4 !important;
        z-index: auto !important;
      }

      .ngxp__inner > div {
        background-color: #20252b !important;
      }

      .ngxp__inner > div span {
        font-weight: 900 !important;
      }

      .ngxp__inner > div p {
        font-weight: 600 !important;
      }

      .ngxp_inner > m-user-view {
        color: black !important;
      }

      .netlang.m-header,
      .m-page--fluid .m-header {
        background-image: url("https://svgshare.com/i/15yW.svg");
        background-color: #0f1017;
        box-shadow: inset 0 0 2rem 0 #000;
      }

      body {
        background-color: #20252b;
      }

      .m_quick_sidebar_netlang {
        background-color: #282c34 !important;
        box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 1);
      }

      .m_quick_sidebar_header_netlang {
        background-color: #20252b;
      }

      .netlang-logo {
        width: 215px !important;
      }
    </style>`);

    $(() => {
        const prismCSS = $('<link>');

        prismCSS.attr({
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-one-dark.css',
        });

        $('head').append(prismCSS);

        const agGridCSS = $('<link>');

        agGridCSS.attr({
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/@ag-grid-community/styles@31.3.1/ag-theme-quartz.min.css',
        });

        $('head').append(agGridCSS);
    });

    await waitForMonaco();

    window.monaco.editor.setTheme('vs-dark');
    window.monaco.editor.EditorOptions.fontFamily.defaultValue =
        'JetBrains Mono';

    setInterval(highlightJavaSyntax, 1000);
})();
