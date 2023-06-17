const htmlCodeElement = document.getElementById("htmlCode");

const cssCodeElement = document.getElementById("cssCode");

const javascriptCodeElement = document.getElementById("javascriptCode");

htmlCodeElement.innerHTML = `<pre><code class="language-html">${htmlCodeElement.value}</code></pre>`;

cssCodeElement.innerHTML = `<pre><code class="language-css">${cssCodeElement.value}</code></pre>`;

javascriptCodeElement.innerHTML = `<pre><code class="language-javascript">${javascriptCodeElement.value}</code></pre>`;

Prism.highlightAll();
