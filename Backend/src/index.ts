import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import apiRoutes from './routes/apiRoutes';
import s3Routes from './routes/s3Routes';

class Server{
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
              

    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({limit: '50mb'}));        
        this.app.use(express.urlencoded({limit: '50mb', extended: false}))
    }

    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/api', apiRoutes);
        this.app.use('/aws', s3Routes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log("Server listening on port ", this.app.get('port'));
        })
    }
}

export const server = new Server();
server.start();