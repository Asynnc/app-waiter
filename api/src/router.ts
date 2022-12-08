import Router, { Request, Response } from 'express';
import path from 'node:path';
import cuid from 'cuid';
import multer from 'multer';
import { createCategories } from './app/useCases/Category/createCategory';
import { listCategories } from './app/useCases/Category/listCategory';
import { createProducts } from './app/useCases/Product/createProduct';
import { listProducts } from './app/useCases/Product/listProduct';
import { listProductsByCategory } from './app/useCases/Category/listProductsByCategory';
import { listOrders } from './app/useCases/Order/listOrder';
import { createOrder } from './app/useCases/Order/createOrder';
import { changeOrderStatus } from './app/useCases/Order/changeOrderStatus';
import { cancelOrder } from './app/useCases/Order/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(request, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(request, file, callback) {
      callback(null, `${cuid()}-${file.originalname}`);
    }
  })
});

router.get('/', (request: Request, response: Response) => {
  return response.json({
    application: 'AppWaiter Api',
    message: 'Api AppWaiter Nodejs Online'
  });
});


router.get('/categories', listCategories);

router.post('/categories', createCategories);

router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/products', listProducts);

router.post('/products', upload.single('image') , createProducts);

router.get('/orders', listOrders);

router.post('/orders', createOrder);

router.patch('/orders/:orderId', changeOrderStatus);

router.delete('/orders/:orderId', cancelOrder);
