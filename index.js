import 'dotenv/config';
import express from "express";
import { PrismaClient } from "@prisma/client";
import {PrismaPg} from '@prisma/adapter-pg';
import cors from "cors";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({connectionString});
const prisma = new PrismaClient({adapter});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/roomdata", async(req, res) => {
    try {
        const roomdata = await prisma.room.findMany();
        res.json(roomdata);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch room data" });
    }
});



app.listen(4000, () => console.log("Server running on 4000"));