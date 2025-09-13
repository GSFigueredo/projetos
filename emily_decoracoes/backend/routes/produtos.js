const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage });

const produtosController = require('../controllers/produtosController');

router.post('/inserir', upload.single('imagem'), produtosController.inserirProduto);
router.put('/atualizar', upload.single('imagem'), produtosController.atualizarProduto);
router.get('/consultarProdutos', produtosController.consultarProdutos);

module.exports = router;