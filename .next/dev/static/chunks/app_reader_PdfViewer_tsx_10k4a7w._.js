(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/reader/PdfViewer.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_114hvid._.js",
  "static/chunks/app_reader_PdfViewer_tsx_000o2zp._.js",
  {
    "path": "static/chunks/node_modules_react-pdf_dist_Page_0h.55tc._.css",
    "included": [
      "[project]/node_modules/react-pdf/dist/Page/AnnotationLayer.css [app-client] (css)",
      "[project]/node_modules/react-pdf/dist/Page/TextLayer.css [app-client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/node_modules_react-pdf_dist_Page_AnnotationLayer_css_0w3-wzy._.single.css",
      "static/chunks/node_modules_react-pdf_dist_Page_TextLayer_css_0w3-wzy._.single.css"
    ]
  },
  "static/chunks/app_reader_PdfViewer_tsx_0m4hs9w._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/app/reader/PdfViewer.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);