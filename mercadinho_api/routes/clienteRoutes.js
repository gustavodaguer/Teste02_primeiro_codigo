const express = require("express");
const clienteController = require("../controllers/clienteController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin"]),
  clienteController.create
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  clienteController.getAll
);
router.get(
  "/:cpf",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  clienteController.getById
);
router.put(
  "/:cpf",
  authMiddleware,
  roleMiddleware(["Admin", "Gerente"]),
  clienteController.update
);
router.delete(
  "/:cpf",
  authMiddleware,
  roleMiddleware(["Admin"]),
  clienteController.delete
);

module.exports = router;
