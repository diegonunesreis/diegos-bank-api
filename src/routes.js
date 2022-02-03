import { Router } from "express";
import ClientsController from "./controllers/ClientsController";
import TransactionsController from "./controllers/TransactionsController";
import AccountsController from "./controllers/AccountsController";
import SessionsController from "./controllers/SessionsController";

import auth from "./middlewares/auth"

const routes = new Router();

routes.post("/sessions", SessionsController.create);

routes.use(auth);

routes.get("/clients", ClientsController.index);
routes.get("/clients/:id", ClientsController.show);
routes.post("/clients", ClientsController.create);
routes.put("/clients/:id", ClientsController.update);
routes.delete("/clients/:id", ClientsController.destroy);

routes.post("/transact", AccountsController.transact);
routes.post("/transfer", AccountsController.transfer);

routes.get("/transactions/:clientId", TransactionsController.index);

export default routes;