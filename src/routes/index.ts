import { Router, Request, Response } from "express";
import usecaseAuth from "@/cases/auth";
import usecaseGetCompanyData from "@/cases/get-company-data";
import usecaseGetCompaniesData from "@/cases/get-companies-data";
import usecaseGetConnectionsData from "@/cases/get-connections-data";
import usecaseGetConnectionData from "@/cases/get-connection-data";
import usecaseGetActionsData from "@/cases/get-actions-data";
import usecaseUpdateActionsData from "@/cases/update-actions-data";
import usecaseGetActionData from "@/cases/get-actions-detail";
import { usecaseStatus } from "@/shared/cases";
import usecaseUpdateActionsState from "@/cases/update-actions-state";
import usecaseGetActionDataBiNit from "@/cases/get-action-data";
// Crea una instancia del enrutador
const router = Router();

// Define una ruta GET básica
router.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseAuth.run(req.body);

    if (useCaseResult?.status === usecaseStatus.Success) {
      return res.status(200).json(useCaseResult);
    }

    return res.status(400).json(useCaseResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/company-data/:Nitempresa", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseGetCompanyData.run(req.params);

    console.log("useCaseResult - company", useCaseResult);
    res.status(200).json(useCaseResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(
  "/companies-data/:Idusuario",
  async (req: Request, res: Response) => {
    try {
      const useCaseResult = await usecaseGetCompaniesData.run(req.params);

      console.log("useCaseResult - companies", useCaseResult);
      res.status(200).json(useCaseResult);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/company-actions/:nit", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseGetActionsData.run({
      nit: req.params.nit!,
    });
    res.status(200).json(useCaseResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/company-action/:id", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseGetActionData.run(req.params);
    res.status(200).json(useCaseResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/company-action-nit/:nit", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseGetActionDataBiNit.run({
      nit: req.params.nit,
    });
    res.status(200).json(useCaseResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/company-action", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseUpdateActionsData.run({
      Acciones: req.body,
    });
    res.status(200).json(useCaseResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/company-action-state", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseUpdateActionsState.run({
      Acciones: req.body,
    });
    res.status(200).json(useCaseResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get(
  "/connections-data/:con_Nitempresa",
  async (req: Request, res: Response) => {
    try {
      const useCaseResult = await usecaseGetConnectionsData.run(req.params);

      console.log("useCaseResult - connections", useCaseResult);
      res.status(200).json(useCaseResult);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/connection-data/:Id", async (req: Request, res: Response) => {
  try {
    const useCaseResult = await usecaseGetConnectionData.run(req.params);
    res.status(200).json(useCaseResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Exporta el enrutador
export default router;
