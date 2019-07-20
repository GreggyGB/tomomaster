'use strict'
const express = require('express')
const config = require('config')
const router = express.Router()
const web3 = require('../models/blockchain/web3rpc')

router.get('/', async function (req, res, next) {
    let appConfig = {}
    appConfig.blockchain = config.get('blockchain')
    try {
        appConfig.blockchain.blockNumber = await web3.eth.getBlockNumber()
    } catch (e) {
        appConfig.blockchain.blockNumber = 0
    }
    appConfig.explorerUrl = config.get('explorerUrl')
    appConfig.GA = config.get('GA')
    appConfig.tomoscanUrl = config.get('tomoscanUrl')
    return res.json(appConfig)
})

module.exports = router
