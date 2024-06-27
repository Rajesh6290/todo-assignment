import { Router } from "express";
import { todoController } from "../controller";

const router = Router();
router.post("/", todoController.create);
router.get("/", todoController.getAll);
router.put("/:id", todoController.update);
router.delete("/:id",  todoController.delete);


export default router;