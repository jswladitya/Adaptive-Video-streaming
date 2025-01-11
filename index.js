import express from "express";
import cors from "cors";
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";


const app = express();

//multer middleware
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
    }
});

//multer configuration
const upload = multer({storage: storage})

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true
}));


app.use((req, res, next) => {{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}})

app.use(express.json()); //json data accept
app.use(express.urlencoded({extended: true})); //form or url data accept
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send({message : "Hello World"});
});

app.post("/upload", upload.single("file"), (req, res) => { 
    console.log("file is uploaded")
 });

app.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});