import express from "express";
import {  readAllCalcados, createCalcado, updateCalcado, deleteCalcados } from "./controllers/UserController";
import {  getCalcadosByTamanho, getCalcadosByMarca, getTotalEstoque } from "./repositorie/UserRepositorie";


const routes = express.Router();

routes.get("/calcados", readAllCalcados);
routes.post("/calcados", createCalcado);
routes.patch("/calcados/:id", updateCalcado);
routes.delete("/calcados/:id", deleteCalcados);

routes.get("/calcados/tamanho/:tamanho", getCalcadosByTamanho);
routes.get("/calcados/marca/:marca", getCalcadosByMarca);
routes.get("/calcados/estoque/total", getTotalEstoque);

export default routes;
