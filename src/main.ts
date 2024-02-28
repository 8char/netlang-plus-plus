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
// @ts-ignore
import getLoader from 'prismjs/dependencies';
import components from 'prismjs/components';

import type { editor } from 'monaco-editor';

declare global {
    interface Window {
        monaco: {
            editor: typeof editor;
        };
    }
}
(async function () {
    'use strict';
    const componentsToLoad = ['java'];

    getLoader(components, componentsToLoad, []).load((id: string) =>
        require(`prismjs/components/prism-${id}.min.js`),
    );

    function makeNice() {
        var codeTitles = document.querySelectorAll(
            '#codeTreeDiv .fancytree-title',
        );

        Array.from(codeTitles)
            .filter(
                (el) =>
                    !el.classList.contains('language-java') &&
                    !el.classList.contains('code-comment'),
            )
            .forEach((el) => el.classList.add('language-java'));

        document
            .querySelectorAll('.language-java')
            .forEach((element) => Prism.highlightElement(element));

        const codeTree = document.getElementById('codeTreeDiv');
        codeTree.style.backgroundColor = '#282c34';
    }

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    function waitForMonaco() {
        if (typeof window.monaco !== 'undefined') {
            window.monaco.editor.setTheme('vs-dark');
            window.monaco.editor.EditorOptions.fontFamily.defaultValue =
                'JetBrains Mono';
        } else {
            setTimeout(waitForMonaco, 250);
        }
    }

    document.getElementsByTagName('head')[0].innerHTML +=
        `<link rel="preconnect" href="https://fonts.googleapis.com">
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

    .fancytree-active .fancytree-title.code-comment,.fancytree-selected .fancytree-title.code-comment,.fancytree-title.code-comment,.fullline .fancytree-treefocus .fancytree-selected .fancytree-title.code-comment,i.code-comment {
        color: inherit !important;
    }

    .table {
        color: #989faa !important;
        background-color: #282c34 !important;
    }

    .project-tree tbody tr td {
        color: #989faa !important;
    }

    .lm_content {
        background: #282c34 !important;
    }

    .fullline .fancytree-node {
        border-bottom: 1px solid rgb(0, 0, 0, 0) !important;
    }

    ul {
        border-left: 1px solid rgb(152, 159, 170, 0.4);
    }

    .lm_header .lm_tab {
        color: #989faa !important;
        background: #272c34 !important;
        border: 1px solid #20252b !important;
    }

    .lm_header .lm_tab.lm_active {
        background: #272c34 !important;
    }

    .netlang-flex-root {
        background: #20252b !important;
    }
    .netlang .development-toolbar {
        background-color: inherit !important;
    }

    .fancytree-ext-table tbody tr.fancytree-selected {
        background: #272c34 !important;
    }
</style>`;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
        'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-one-dark.css';
    document.head.appendChild(link);

    waitForMonaco();

    await sleep(20000);
    makeNice();
})();
