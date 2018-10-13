'use strict'

const express = require('express');
const router = express.Router();
const book = require('../model/book');

router.post('/bookmenu', (req, res) => {
    console.log(req.body)
    const data = req.body;
    const Book = new book(data);
    console.log(data)
    Book.save()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
        })
})


router.get('/bookmenu', (req, res) => {
book.find({})
.then((data)=>{
    res.status(200).send(data)
})
.catch(error =>{
    res.status(400).json(error)
})
})

router.get('/bookmenu/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    book.findById(id)
    .then((data)=>{
        console.log(data)
        res.status(200).send(data)
    })
    .catch(error =>{
        res.status(400).json(error)
    })
    })



router.put('/bookmenu/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    book.findOneAndUpdate({'_id': id}, data, {new: true})
    .then((data)=>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(400).json(error)
    })
    
})
router.delete('/bookmenu/:id', (req, res) => {
    console.log('hijikj')
    const id = req.params.id;
    const data = req.body;
    console.log(id)
    book.findOneAndRemove({'_id': id})
    .then((data)=>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(400).json(error)
    }) 
})
module.exports = router