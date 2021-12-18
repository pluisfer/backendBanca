const { verify } = require("jsonwebtoken");

function admiGuard(req, res, next) {
    // Captura la cabecera Authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
    }
    // Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_PASS);
        if (payload.rol !== "a"){
            next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
        }
    } catch (error) {

    }
    next();
}

function uiGuard(req, res, next) {
    // Captura la cabecera Authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
    }
    // Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_PASS);
        if (payload.rol !== "ui"){
            next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
        }
    } catch (error) {

    }
    next();
}

function clienteGuard(req, res, next) {
    // Captura la cabecera Authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
    }
    // Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_PASS);
        if (payload.rol !== "c"){
            next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
        }
    } catch (error) {

    }
    next();
}

exports.clienteGuard = clienteGuard;
exports.uiGuard = uiGuard;
exports.admiGuard = admiGuard;