const devController = require('./controllers');
const express = require('express');
const router = express.Router();
require('express-async-errors'); 

router.get("/", async(req, res) => {
    res.status(200).json(await devController.find(req));
});

router.get("/:id", async(req, res) => {
    try {
        const developer = await devController.findById(req);
        res.status(200).send(developer);
      } catch (e) {
        res.status(404).send({message: 'Desenvolvedor não encontrado!'});
      }
});

router.post("/", async(req, res) => {
    try {
        const developer = await devController.create(req);
        res.status(201).send(developer);
      } catch (e) {
        res.status(400).send({message: 'Falha ao criar novo Desenvolvedor!'});
      }
});

router.put("/:id", async(req, res) => {
    try {
        const developer = await devController.update(req);
        res.status(200).send(developer);
      } catch (e) {
        res.status(400).send({message: 'Falha ao editar Desenvolvedor!'});
      }
});

router.delete("/:id", async(req, res) => {
    try {
        const developer = await devController._delete(req);
        res.status(204).send(developer);
      } catch (e) {
        res.status(400).send({message: 'Falha ao excluir Desenvolvedor!'});
      }
});
module.exports = router;