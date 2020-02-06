const express = require('express')
const router = express.Router()

const wonders = [
    { name: "Mount Everest", location: "Nepal", visited: false },
    { name: "Grand Canyon", location: "Arizona", visited: false },
    { name: "Botanical Gardens", location: "Singapore", visited: true },
    { name: "Pantheon", location: "Greece", visited: false },
    { name: "Colosseum", location: "Italy", visited: true }
]

router.get('/wonders', function (req, res) {
    res.send(wonders)
})

router.post('/wonder', function (req, res) {
    wonders.push({...req.body,visited:false})
    res.end()
})

router.put('/wonder/:name', function(req,res) {
    const {name} = req.params
    wonders.forEach(wonder => {
        if(wonder.name == name) {
            wonder.visited = !wonder.visited
            return
        }
    });
    res.end()
})

router.delete('/wonder/:name', function(req,res) {
    const {name} = req.params
    wonderIndex = wonders.findIndex(wonder => wonder.name==name)
    if(wonderIndex != -1) {wonders.splice(wonderIndex,1)}
    res.end()
})

module.exports = router