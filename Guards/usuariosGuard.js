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
        return res.status(403).json({ estado: "error", msg: "NO Autorizado" });
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
        return res.status(403).json({ estado: "error", msg: "NO Autorizado" });
    }
    next();
}

function clienteGuard(req, res, next) {
    // Captura la cabecera Authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(res.status(403).json({ estado: "error", msg:"NO Autorizado1" }));
    }
    // Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_PASS);
        if (payload.rol !== "c"){
            next(res.status(403).json({ estado: "error", msg:"NO Autorizado2" }));
        }
    } catch (error) {
        return res.status(403).json({ estado: "error", msg: "NO Autorizado3" });
    }
    next();
}

exports.clienteGuard = clienteGuard;
exports.uiGuard = uiGuard;
exports.admiGuard = admiGuard;