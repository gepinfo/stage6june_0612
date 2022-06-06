import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes'
import mongoose = require('mongoose');

import { VaultConfig } from './config/VaultConfig';
import { SeedService } from './seed';


const PORT = 8005;

class App {
    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public DB_Url: string;
    

    constructor() {
        this.SeedData();
        this.config();
        this.routerPrv.routes(this.app);
        
         
        
       
       }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static("public"));
        this.app.use(cors({ credentials: true, origin: true }));

    }

    private DBSetup(): void {
        console.log('Database', this.DB_Url);
        mongoose.Promise = global.Promise;
        mongoose.connect(this.DB_Url, { useNewUrlParser: true, useUnifiedTopology: true }).then( async data => {
            
        });
    }




    private DatabaseCredits() {
        let vaultconfig = new VaultConfig();
        vaultconfig.vaultConfig( async data => {
            this.DB_Url = data.DB_URL_stage6june_0612;
            await this.DBSetup();
        });
    }

    private async SeedData(): Promise<void> {
        let seedData = new SeedService();
        await seedData.initkvdata( async (callback) => {
            console.log(callback);
            await this.DatabaseCredits();
        })
    }








}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})