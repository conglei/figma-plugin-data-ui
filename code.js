// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-rectangles') {
        figma.loadFontAsync({
            family: 'Roboto',
            style: 'Regular',
        }).then(() => {
            const nodes = [];
            for (let i = 0; i < msg.count; i++) {
                const text = figma.createText();
                const svg = figma.createNodeFromSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="M14.54,10.87V7.26h.19a.35.35,0,1,0,0-.71H10.28a.35.35,0,1,0,0,.71h.19v3.61a7,7,0,1,0,4.08,0Zm-.71-3.61V8H11.17V7.26ZM12.5,23.79a6.26,6.26,0,0,1-1.59-12.31.35.35,0,0,0,.26-.34V8.73h2.66v2.41a.35.35,0,0,0,.26.34A6.26,6.26,0,0,1,12.5,23.79Z"/><path d="M13.42,5.86A1.36,1.36,0,1,0,12.06,4.5,1.36,1.36,0,0,0,13.42,5.86Zm0-2a.65.65,0,1,1-.65.65A.65.65,0,0,1,13.42,3.85Z"/><path class="cls-1" d="M11.39,3a1,1,0,1,0-1-1A1,1,0,0,0,11.39,3Zm0-1.25a.27.27,0,1,1-.27.27A.27.27,0,0,1,11.39,1.71Z"/><path class="cls-1" d="M16.89,18.14a.36.36,0,0,0-.38,0,4.4,4.4,0,0,1-1.6.49h0a10.23,10.23,0,0,1-2.05-.13c-1.58-.19-3.37-.4-4.54.29a.35.35,0,0,0-.15.43A4.61,4.61,0,0,0,17,18.49.35.35,0,0,0,16.89,18.14ZM12.5,21.51A3.92,3.92,0,0,1,9,19.25a8.68,8.68,0,0,1,3.82-.06,10.7,10.7,0,0,0,2.22.13,5.36,5.36,0,0,0,1.13-.26A3.92,3.92,0,0,1,12.5,21.51Z"/><path d="M14,13.86a4,4,0,0,1,.43.2.35.35,0,0,0,.17,0,.35.35,0,0,0,.17-.66,4.63,4.63,0,0,0-.5-.24.35.35,0,0,0-.27.65Z"/><path d="M8.24,17.3A.35.35,0,0,0,8.59,17a3.94,3.94,0,0,1,3.73-3.41.35.35,0,1,0,0-.71,4.65,4.65,0,0,0-4.4,4,.35.35,0,0,0,.3.4Z"/></svg>');
                text.characters = 'Welcome to DX';
                text.y = i * 100;
                svg.y = i * 100 + 40;
                // const text = figma.createText();
                // rect.x = i * 150;
                // rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
                // figma.createFrame();
                figma.currentPage.appendChild(text);
                figma.currentPage.appendChild(svg);
                nodes.push(text);
                nodes.push(svg);
            }
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        });
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
