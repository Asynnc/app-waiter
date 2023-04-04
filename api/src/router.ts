import cuid from 'cuid';
import Router, { Request, Response } from 'express';
import multer from 'multer';
import path from 'node:path';
import { authenticate } from './app/useCases/Auth/auth';
import { createCategories } from './app/useCases/Category/createCategory';
import { listCategories } from './app/useCases/Category/listCategory';
import { listProductsByCategory } from './app/useCases/Category/listProductsByCategory';
import { cancelOrder } from './app/useCases/Order/cancelOrder';
import { changeOrderStatus } from './app/useCases/Order/changeOrderStatus';
import { createOrder } from './app/useCases/Order/createOrder';
import { listOrders } from './app/useCases/Order/listOrder';
import { createProducts } from './app/useCases/Product/createProduct';
import { listProducts } from './app/useCases/Product/listProduct';
import { createUser } from './app/useCases/User/createUser';

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
    application: 'The Coffee Class Api',
    message: 'Api The Coffee Class Nodejs Online'
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

router.post('/users', createUser);

router.post('/auth', authenticate);


