import "dotenv/config";
import express ,{NextFunction, Response,Request} from "express";
import notesRoutes from './routes/notes'
import userRoutes from "./routes/users"
import morgan from 'morgan'
import createHttpError,{isHttpError} from "http-errors";
import session from "express-session";
import env from "./util/validateEnv"
import MongoStore from "connect-mongo";
import { requireAuth } from "./middelware/auth";


const app = express();
app.use(morgan("dev"))


app.use(express.json())

app.use(session({
  secret: env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:60*60*1000,
  },
  rolling:true,
  store:MongoStore.create({
    mongoUrl:env.MONGOO_CONNECTION_STRING
  }),

}))

app.use("/api/users",userRoutes)


app.use("/api/notes",requireAuth,notesRoutes)



  app.use((req,res,next)=>{
        
    next(createHttpError(404,"Endpoint not found"))

  })

  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMesssage = "An unkwon error occur...";
    let statusCode=500;
    
  try {
    if(isHttpError(error)){
      statusCode = error.status;
      errorMesssage = error.message
     }
      // next(error)
      res.status(statusCode).json({
          error: errorMesssage
      }) 
    
  } catch (error) {
    next(error)
    
  }     
   

  })

  export default app;