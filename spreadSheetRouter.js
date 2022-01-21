import Router from "express";
import SpreadSheetController from "./SpreadSheetController.js";

const router = new Router();

router.get("/livesearch", SpreadSheetController.livesearch);
router.get("/get_person", SpreadSheetController.getPerson);
router.get("/get_side_persons", SpreadSheetController.getSidePersons);
router.put("/update_db", SpreadSheetController.updateOnePage);
router.post("/fill_db", SpreadSheetController.loadAllData);

export default router;
