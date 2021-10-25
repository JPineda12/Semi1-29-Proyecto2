import { Router } from 'express';
import { s3Controller } from '../controllers/s3Controller';
class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/uploadFoto', s3Controller.uploadFoto);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;