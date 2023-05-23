import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { fontsPDF } from '../../../../config/pdf-make';
import { Product } from '../../../../core/shared/infra/database/mongodb/models/Product';
import PDFPrinter from 'pdfmake';
import { Response } from 'express';
import { formatCurrency } from '../../../../core/utils/functions/formatCurrency';

export class PdfProductService {
  public async execute(response: Response): Promise<any[] | PDFKit.PDFDocument> {
    const products = await Product.find().sort({ name: 1 });

    const body = [];

    for await (const product of products) {
      const rows = [];

      rows.push(product.id);
      rows.push(product.name);
      rows.push(formatCurrency(product.price));
      rows.push(product.ingredients.length);

      body.push(rows);

    }

    const printer = new PDFPrinter(fontsPDF);
    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica' },
      content: [
        {
          table: {
            body: [
              ['ID', 'NAME', 'PRICE', 'INGREDIENTS'],
              ...body
            ]
          }
        }
      ]
    };
    const pdfDOC = printer.createPdfKitDocument(docDefinitions);

    // pdfDOC.pipe(fs.createWriteStream('./uploads/products.pdf'));

    const chunks: any[] = [];

    pdfDOC.on('data', (chunk) => {
      chunks.push(chunk);
    });

    pdfDOC.end();
    const result = pdfDOC.on('end', () => {
      const result = Buffer.concat(chunks);
      response.end(result);
    });

    return result || [];
  }
}
