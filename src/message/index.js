const express = require("express");
const router = new express.Router();

const db = require("./db.js")

router.get("/messages/history", (req, res) => {
    db.getAllHistory((err,data) => {
        res.status(200).send({
            "data": data
        })
    })
})

module.exports = router;