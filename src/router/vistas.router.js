import { Router } from "express"

import Contac from "../controller/contact.controller.js"
import Login from "../controller/login.controller.js"

import verificacion from "../middleware/verificacion.midleware.js"
import Register from "../controller/register.controller.js"

const contactos = new Contac()
const login = new Login()
const registro = new Register()

const router = Router()

router.get("/contac",[verificacion],contactos.mostrarVistaContacto)
router.get("/delete/:idC",[verificacion],contactos.borrarContacto)
router.get("/login",login.mostrarVistaLogin)
router.post("/login",login.inicioSeccion)
router.get("/register",contactos.mostrarVistaRegister)
router.post("/register",registro.registro)
router.get("/registerContac",[verificacion],contactos.mostrarFormContact)
router.post("/registerContac",[verificacion],contactos.registrarContacto)
router.get("/cerrarSesion",[verificacion],login.cerrarSession )
export default router;



