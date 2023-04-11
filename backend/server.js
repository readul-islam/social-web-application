
// external imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dbConnection from './DB/index.js';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';






/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('combined'));
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use('/assets', express.static(path.join(__dirname,'public/assets')));

/* FILE STORAGE */

const storage = multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, 'public/assets');
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);

/* ROUTES */

app.use('/auth', authRoutes);
app.use('/user',userRoutes);
app.use('/posts',postRoutes);

dbConnection();

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})

    
