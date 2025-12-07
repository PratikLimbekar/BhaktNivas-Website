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

app.post("/book", async(req, res) => {
    try {
        const payload = req.body;

        const statusMap = {
        "Occupied": "OCCUPIED",
        "Free": "FREE",
        "Personal Use": "PERSONAL_USE",
        // allow direct enum too
        "OCCUPIED": "OCCUPIED",
        "FREE": "FREE",
        "PERSONAL_USE": "PERSONAL_USE"
        };

        const mappedStatus = statusMap[payload.status];
        if (!mappedStatus) return res.status(400).json({error: "Invalid Status"});

        const mobile = String(payload.mobile).trim();
        const name = String(payload.name).trim();
        const city = String(payload.city).trim();
        const amount = Number(payload.amount);

        const roomId = Number(payload.room);
        if (isNaN(roomId)) return res.status(400).json({ error: "Invalid room id" });

        const checkin = payload.Intime ? new Date(payload.Intime) : null;
        const checkout = payload.Outtime ? new Date(payload.Outtime) : null;

        const result = await prisma.$transaction(async (tx) => {
            const existingGuest = await tx.guest.findUnique({
                where: {mobile: mobile}
            });



            let guest;
            if (existingGuest) {
                guest = await tx.guest.update({
                    where: {id: existingGuest.id},
                    data: {
                        name, city, mobile, createdAt: new Date(), updatedAt: new Date()
                    }
                });
            } else {
                guest = await tx.guest.create({
                    data: {
                        name,
                        city,
                        mobile,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                    });
            }

            const booking = await tx.booking.create({
                data: {
                    room_id: roomId,
                    guest_id: guest.id,
                    checkin_date: checkin,
                    checkout_date: checkout,
                    amount: Math.round(amount),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });

            const room = await tx.room.update({
                where: {id:(roomId)},
                data: {status: mappedStatus, updatedAt: new Date()}
            });

            return { guest, booking, room};
        });

        return res.status(201).json(result);
    } catch (err) {
        console.error("Booking creation error:", err);
    // detect prisma known errors and respond accordingly
    return res.status(500).json({ error: "Internal server error", details: err.message });
    }
})

app.listen(4000, () => console.log("Server running on 4000"));