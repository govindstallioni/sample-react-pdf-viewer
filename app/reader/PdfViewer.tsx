"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const DEFAULT_ZOOM_INDEX = 2; // 1x

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [zoomIndex, setZoomIndex] = useState<number>(DEFAULT_ZOOM_INDEX);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    setContainerWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const scale = ZOOM_STEPS[zoomIndex];
  const pageWidth = containerWidth > 0 ? Math.floor(containerWidth * scale) : undefined;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors shrink-0"
        >
          ← Back
        </Link>
        <span className="text-sm text-gray-400 truncate">
          {numPages > 0 ? `Page ${pageNumber} of ${numPages}` : "Loading…"}
        </span>
      </header>

      {/* PDF area */}
      <main className="flex-1 overflow-auto py-6 px-4">
        {/* Constrain base width; zoom expands beyond it via overflow */}
        <div ref={containerRef} className="w-full max-w-2xl mx-auto">
          <Document
            file="/document-1.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-80 text-gray-400 text-sm">
                Loading document…
              </div>
            }
            error={
              <div className="flex items-center justify-center h-80 text-red-400 text-sm">
                Failed to load document.
              </div>
            }
          >
            {pageWidth !== undefined && (
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                className="shadow-lg mx-auto"
                renderTextLayer
                renderAnnotationLayer
              />
            )}
          </Document>
        </div>
      </main>

      {/* Toolbar: zoom + pagination */}
      {numPages > 0 && (
        <footer className="bg-white border-t border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomIndex((i) => Math.max(i - 1, 0))}
              disabled={zoomIndex === 0}
              aria-label="Zoom out"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 disabled:opacity-30 hover:bg-gray-200 transition-colors text-lg leading-none"
            >
              −
            </button>
            <span className="text-sm text-gray-500 w-10 text-center tabular-nums">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setZoomIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1))}
              disabled={zoomIndex === ZOOM_STEPS.length - 1}
              aria-label="Zoom in"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 disabled:opacity-30 hover:bg-gray-200 transition-colors text-lg leading-none"
            >
              +
            </button>
            <button
              onClick={() => setZoomIndex(DEFAULT_ZOOM_INDEX)}
              disabled={zoomIndex === DEFAULT_ZOOM_INDEX}
              aria-label="Reset zoom"
              className="text-xs text-gray-400 disabled:opacity-30 hover:text-gray-700 transition-colors px-1"
            >
              Reset
            </button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-full disabled:opacity-30 hover:bg-gray-700 transition-colors"
            >
              Prev
            </button>
            <span className="text-sm text-gray-500 tabular-nums">
              {pageNumber} / {numPages}
            </span>
            <button
              onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
              disabled={pageNumber >= numPages}
              className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-full disabled:opacity-30 hover:bg-gray-700 transition-colors"
            >
              Next
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
