import { Request, Response, Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../../../config/multer';
import { createProductController } from '../useCases/createProduct';
import { listProductController } from '../useCases/listProduct';
import fs from 'node:fs';

import PDFPrinter from 'pdfmake';
import { fontsPDF } from '../../../config/pdf-make';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const productsRouter = Router();

const upload = multer(multerConfig);

productsRouter.post('/', upload.single('image'), (request: Request, response: Response) => {
  return createProductController.handle(request, response);
});

productsRouter.get('/', (request: Request, response: Response) => {
  return listProductController.handle(request, response);
});

productsRouter.get('/report', (request: Request, response: Response) => {
  const printer = new PDFPrinter(fontsPDF);
  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      { text: 'Meu Primeiro relatório' }
    ]
  };
  const pdfDOC = printer.createPdfKitDocument(docDefinitions);

  // pdfDOC.pipe(fs.createWriteStream('./uploads/products.pdf'));

  const chunks = [];

  pdfDOC.on('data', (chunk) => {
    chunks.push(chunk);
  });

  pdfDOC.end();
  pdfDOC.on('end', () => {
    const result = Buffer.concat(chunks);
    response.end(result);
  });
});

export { productsRouter };
