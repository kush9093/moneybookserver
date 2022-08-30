
import express from "express";
import jwt from "jsonwebtoken";
import History from "../model/history.js";

const router = express.Router();


// auth token check middelware
router.use((req, resp, next) => {
    const authorization = req.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer")) {
        return resp.status(401).json({ result: false, message: "unauthorized error" })
    }
    const token = authorization.split(/\s/)[1];

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.logonEmail = payload.email;
    } catch (e) {
        console.log(e.message);
        return resp.status(401).json({ result: false, message: "invalid token" })
    }

    next()

})



router.get("/", async (req, resp) => {
    const month = req.query.month;   // 2022-08
    const parsed = month.split("-");
    const begin = new Date(parsed[0], parsed[1] - 1, 1);
    const end = new Date(parsed[0], parsed[1], 1);
    console.log(begin, end);
    try {
        const historys = await History.find({
            account: req.logonEmail,
            itemDate: { $gte: begin, $lt: end }
        }).sort("itemDate").lean();
        return resp.status(200).json({ result: true, datas: historys });
    } catch (err) {
        console.log(err);
        resp.status(500).send({ result: false, "message": err.message });
    }
});

router.get("/search", async (req, resp) => {

    const begin = new Date(req.query.begin);
    const end = new Date(req.query.end);
    end.setDate(end.getDate()+1);
    console.log(begin, end);
    try {
        const historys = await History.find({
            account: req.logonEmail,
            itemDate: { $gte: begin, $lt: end },
        }).sort("itemDate").lean();
        return resp.status(200).json({ result: true, datas: historys });
    } catch (err) {
        console.log(err);
        resp.status(500).send({ result: false, "message": err.message });
    }
});


router.post("/write", async (req, resp) => {
    const account = req.logonEmail;
    try {
        const r = await History.create({ ...req.body, account });
        console.log(r);
        return resp.status(200).json({ result: true, data: r })
    } catch (err) {
        return resp.status(401).json({ result: false, "message": err.message })
    }

})

router.post("/delete", async (req, resp) => {
    try {
        console.log(req.body.id)
        const r = await History.deleteMany({ _id: { $in: req.body.id } })
        return resp.status(200).json({ result: true, data: r })
    } catch (err) {
        return resp.status(401).json({ result: false, "message": err.message })
    }

})

router.get("/payment", async (req, resp) => {
    const month = req.query.month;   // 2022-08
    const parsed = month.split("-");
    const begin = new Date(parsed[0], parsed[1] - 1, 1);
    const end = new Date(parsed[0], parsed[1], 1);
    const payment = req.query.payment;
    console.log(begin, end);
    let payments;
    let category = req.query.category;
    try {
        if (category === "모두")
            if (payment === "cashAmt") {
                payments = await History.find({ account: req.logonEmail, $and: [{ itemDate: { $gte: begin, $lt: end } }, { cashAmt: { $gt: 0 } }] }).sort("itemDate").lean();
            } else if (payment === "cardAmt") {
                payments = await History.find({ account: req.logonEmail, $and: [{ itemDate: { $gte: begin, $lt: end } }, { cardAmt: { $gt: 0 } }] }).sort("itemDate").lean();
            } else {
                payments = await History.find({
                    account: req.logonEmail,
                    itemDate: { $gte: begin, $lt: end }
                }).sort("itemDate").lean();
            } else {
                if (payment === "cashAmt") {
                    payments = await History.find({ account: req.logonEmail, $and: [{ itemDate: { $gte: begin, $lt: end } }, { cashAmt: { $gt: 0 } },{category:category}] }).sort("itemDate").lean();
                } else if (payment === "cardAmt") {
                    payments = await History.find({ account: req.logonEmail, $and: [{ itemDate: { $gte: begin, $lt: end } }, { cardAmt: { $gt: 0 } },{category:category}] }).sort("itemDate").lean();
                } else {
                    payments = await History.find({
                        account: req.logonEmail,
                        itemDate: { $gte: begin, $lt: end },category:category
                    }).sort("itemDate").lean();
            }
        }
        return resp.status(200).json({ result: true, datas: payments });
    } catch (err) {
        console.log(err);
        resp.status(500).send({ result: false, "message": err.message });
    }
})


export default router;