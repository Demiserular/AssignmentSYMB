const express = require('express');
const router = express.Router();
const controller = require('../controllers/accountController');

router.post('/accounts', controller.createAccount);
router.get('/accounts', controller.listAccounts);
router.post('/accounts/:accountNo/deposit', controller.deposit);
router.post('/accounts/:accountNo/withdraw', controller.withdraw);
router.post('/transfer', controller.transfer);
//  KYC verification prototype route
router.post('/kyc/verify', controller.verifyKYC);

module.exports = router;
