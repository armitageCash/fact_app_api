"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("@/cases/auth"));
const get_company_data_1 = __importDefault(require("@/cases/get-company-data"));
const get_companies_data_1 = __importDefault(require("@/cases/get-companies-data"));
const get_connections_data_1 = __importDefault(require("@/cases/get-connections-data"));
const get_connection_data_1 = __importDefault(require("@/cases/get-connection-data"));
const get_actions_data_1 = __importDefault(require("@/cases/get-actions-data"));
const update_actions_data_1 = __importDefault(require("@/cases/update-actions-data"));
const get_actions_detail_1 = __importDefault(require("@/cases/get-actions-detail"));
const cases_1 = require("@/shared/cases");
// Crea una instancia del enrutador
const router = (0, express_1.Router)();
// Define una ruta GET básica
router.get("/", (req, res) => {
    res.send("Hello, world!");
});
router.post("/login", async (req, res) => {
    try {
        const useCaseResult = await auth_1.default.run(req.body);
        if (useCaseResult?.status === cases_1.usecaseStatus.Success) {
            return res.status(200).json(useCaseResult);
        }
        return res.status(400).json(useCaseResult);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/company-data/:Nitempresa", async (req, res) => {
    try {
        const useCaseResult = await get_company_data_1.default.run(req.params);
        console.log("useCaseResult - company", useCaseResult);
        res.status(200).json(useCaseResult);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/companies-data/:Idusuario", async (req, res) => {
    try {
        const useCaseResult = await get_companies_data_1.default.run(req.params);
        console.log("useCaseResult - companies", useCaseResult);
        res.status(200).json(useCaseResult);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/company-actions/:nit", async (req, res) => {
    try {
        const useCaseResult = await get_actions_data_1.default.run({
            nit: req.params.nit,
        });
        res.status(200).json(useCaseResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get("/company-action/:id", async (req, res) => {
    try {
        const useCaseResult = await get_actions_detail_1.default.run(req.params);
        res.status(200).json(useCaseResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.put("/company-action", async (req, res) => {
    try {
        const useCaseResult = await update_actions_data_1.default.run({
            Acciones: req.body,
        });
        res.status(200).json(useCaseResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get("/connections-data/:con_Nitempresa", async (req, res) => {
    try {
        const useCaseResult = await get_connections_data_1.default.run(req.params);
        console.log("useCaseResult - connections", useCaseResult);
        res.status(200).json(useCaseResult);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/connection-data/:Id", async (req, res) => {
    try {
        const useCaseResult = await get_connection_data_1.default.run(req.params);
        res.status(200).json(useCaseResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
// Exporta el enrutador
exports.default = router;
//# sourceMappingURL=index.js.map