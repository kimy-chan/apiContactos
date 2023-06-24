import { Router } from "express"

import Contac from "../controller/contact.controller.js"
import Login from "../controller/login.controller.js"

import verificacion from "../middleware/verificacion.midleware.js"

const contactos = new Contac()
const login = new Login()

const router = Router()

router.get("/contac",[verificacion],contactos.mostrarVistaContacto)
router.get("/delete/:idC",contactos.borrarContacto)
router.get("/login",login.mostrarVistaLogin)
router.post("/login",login.inicioSeccion)
router.get("/register",contactos.mostrarVistaRegister)
export default router;



