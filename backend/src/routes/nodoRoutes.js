import { Router } from 'express';
import { getNodoImpact } from '../controllers/nodoController.js';

const router = Router();

router.get('/:id/impact', getNodoImpact);

export default router;