import express from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collectioName, connection } from "./dbconfig.js";
import jwt, { decode } from "jsonwebtoken";
import cookieParser  from 'cookie-parser'
const app = express();
const PORT = 8080;

app.use(express.json());// access body data middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
})); // cors issu fix
app.use(cookieParser())

app.post("/login", async (req, res) => {
    const userData = req.body;
    console.log(userData);

    if (userData.password && userData.email) {

        const db = await connection();
        const collection = await db.collection("users");
        const result = await collection.findOne({email:userData.email,password:userData.password});
        if (result) {
            jwt.sign(userData, "google", { expiresIn: "5d" }, (error, token) => {
                res.send({
                    success: true,
                    msg: "login",
                    token
                })
            });
        } else{
             res.send(
                {
                    success: false,
                    msg: "user not found",

                }
            )

        }

    }else {
            res.send(
                {
                    success: false,
                    msg: "login not done",

                }
            )
        }
   
})

// sign up
app.post("/signup", async (req, res) => {
    const userData = req.body;
    console.log(userData);

    if (userData.password && userData.email) {
6
        const db = await connection();
        const collection = await db.collection("users");
        const result = await collection.insertOne(userData);
        if (result) {
            jwt.sign(userData, "google", { expiresIn: "5d" }, (error, token) => {
                res.send({
                    success: true,
                    msg: "signup done",
                    token
                })
            });
        } else {
            res.send(
                {
                    success: false,
                    msg: "signup not don",

                }
            )
        }

    }
   
})


app.post("/add-task", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectioName);
    const result = await collection.insertOne(req.body);

    if (result) {
        res.send({ message: "new task added", success: true, result });
    } else {
        res.send({ message: "task not add", success: false, })
    }


});

app.get("/tasks",verifyJWTtoken, async (req, res) => {
    const db = await connection();
    console.log("cookies",req.cookies["token"]);
    const collection = await db.collection(collectioName);
    const result = await collection.find().toArray();

    if (result) {
        res.send({ message: "task list fetched", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false, })
    }


});

 function verifyJWTtoken(req,res,next){
    console.log("verifyJWTtoken",req.cookies["token"]);
    const token = req.cookies["token"];
    jwt.verify(token,"google",(error,decode)=>{
        if(error){
            return res.send("invaid token")
        }
        next()
        console.log(decode);
    })
    

};
// update task form
app.get("/task/:id", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectioName);
    const { id } = req.params;
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (result) {
        res.send({ message: "task list fetched", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false, })
    };
});

// update task:-
app.put("/update-task", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectioName);
    const { _id, ...fields } = req.body;
    const update = { $set: fields };
    console.log(fields);
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
    if (result) {
        res.send({ message: "task data updated", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false, })
    };

});
// single delete
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const db = await connection();
    const collection = await db.collection(collectioName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result) {
        res.send({ message: "task deleted", success: true, result });
    } else {
        res.send({ message: "error try after sometime", success: false, })
    }

    res.send("working......");
});
// multiple delete
app.delete("/delete-multiple", async (req, res) => {
    const db = await connection();
    const Ids = req.body;
    const deleteTaskId = Ids.map((item) => new ObjectId(item));
    console.log(Ids)

    const collection = await db.collection(collectioName);
    const result = await collection.deleteMany({ _id: { $in: deleteTaskId } });

    if (result) {
        res.send({ message: "task deleted", success: result });
    } else {
        res.send({ message: "error try after sometime", success: false, })
    }


});


app.listen(PORT, () => {
    console.log("server listen on port 8080");
})