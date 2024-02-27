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
import type { editor } from 'monaco-editor';

declare global {
    interface Window { monaco: {
        editor: typeof editor
    }; }
}
(async function () {
    'use strict';
    console.log("runnnin")

  function makeNice() {
      Prism.manual = true;

      // Create link element for CSS
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-vsc-dark-plus.css';
      document.head.appendChild(link);

      // Create script element for JavaScript
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/8char/cdn@main/prism.js';
      document.body.appendChild(script);

      var codeTitles = document.querySelectorAll('#codeTreeDiv .fancytree-title');

      Array.from(codeTitles)
          .filter((el) => !el.classList.contains('language-java') && !el.classList.contains('code-comment'))
          .forEach((el) => el.classList.add('language-java'));

      codeTitles.forEach((element) => Prism.highlightElement(element));
  }

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  function waitForMonaco() {
      if (typeof window.monaco !== "undefined") {
          window.monaco.editor.setTheme('vs-dark')
          window.monaco.editor.EditorOptions.fontFamily.defaultValue = "JetBrains Mono"
      }
      else {
          setTimeout(waitForMonaco, 250);
      }
  }

  document.getElementsByTagName('head')[0].innerHTML += `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
<style>
  .code-tree .fancytree-title {
      font-family: JetBrains Mono !important;
  }
  .code-expression .CodeMirror {
      font-family: JetBrains Mono !important;
  }
</style>`
  waitForMonaco()

  await sleep(20000);
  console.log("making nice :)")
  makeNice();
})();