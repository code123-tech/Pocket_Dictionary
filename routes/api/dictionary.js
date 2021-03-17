require('dotenv').config();
const express = require("express");
const router = express.Router();
const https = require("https");
//Load dictionary Model
const dict = require("../../models/dictionaryModel");


//For Fetching all the words which is inside the Database (making a GET Request)
router.get("/",(req,res)=>
    dict.find()
    .then(words=>res.json(words))
    .catch(err=>{
        res.status(404).json({nobooksfound:'No Books Found Yet'})
    })
);

//GET/:word reqest for getting word particular word info
router.get("/:word",(req,res)=>{
    dict.findOne({word:req.params.word})
        .then(wordin=>res.send(wordin))
        .catch(err=>res.status(404).json({noword:'No Word Found Yet'}));
});

//Adding the given word in  Database by taking information from oxford API
router.post("/",(req,res)=>{
    const wordId = req.body.word;
        let parsed;
        const options = {
        host: 'od-api.oxforddictionaries.com',
        port: '443',
        path: '/api/v2/entries/en-gb/' + wordId,
        method: "GET",
        headers: {
            'app_id':process.env.app_id,
            'app_key': process.env.app_key
        }
        };
        https.get(options, (resp) => {
            let body = '';
            resp.on('data', (d) => {
                body += d;
            });
            resp.on('end', () => {
                parsed = JSON.parse(body);
                // console.log(parsed);
                dict.findOne({word:parsed["word"]},(err,example)=>{
                    if(example){
                        res.status(200).send({msg:"word is already present"})
                    }else{
                        const data = {word:parsed["word"],results:parsed["results"]};
                        dict.create(data)
                        .then(word=>res.json({msg:"Word added Succesfully Done"}))
                        .catch(err=>res.json({error: 'Unable to add this Word'}));
                    }
                })
            });
        });
})
module.exports = router;