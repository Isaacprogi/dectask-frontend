import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const PdfDisplay = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const link = 'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf';
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

  const arr:number[] = [3,7,11,15,19]

  function minOperations(arr:number[]) {
    const minElement = Math.min(...arr);
    const maxElement = Math.max(...arr);
  
    const uniqueElements = new Set(arr);
  
    let missingCount = 0;
    for (let i = minElement; i <= maxElement; i++) {
      if (!uniqueElements.has(i)) {
        missingCount++;
      }
    }
  
    return missingCount;
  }

  console.log(minOperations(arr))

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={`${corsAnywhereUrl}${link}`} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PdfDisplay;
