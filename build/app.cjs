"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const helmet = require("helmet");
const connect_cjs_1 = __importDefault(require("./db/connect.cjs"));
// Custom middlewares
const not_found_cjs_1 = __importDefault(require("./middlewares/not-found.cjs"));
const error_handler_cjs_1 = __importDefault(require("./middlewares/error-handler.cjs"));
// Helps secure the application by setting various HTTP headers
app.use(helmet({
    // Your policy should include a default-src policy directive, which is a fallback
    // for other resource types when they don't have policies of their own
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net/"],
        },
    },
}));
/* Parses incoming requests with JSON payloads and creates a **body** object
containing the parsed data in the request object (**req.body**) */
app.use(express_1.default.json());
app.use(express_1.default.static("build/public"));
// Routers
const tasksRouter = require("./routers/tasksRouter.cjs");
// Routes
// You want to forward requests made to this route to this router
app.use("/api/v1/tasks", tasksRouter);
app.use(not_found_cjs_1.default);
// This must be added after all the routes, including the "Not Found" route
app.use(error_handler_cjs_1.default);
const port = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_cjs_1.default)(process.env.CONNECTION_STRING);
        app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
    }
    catch (err) {
        console.log(err);
    }
});
start();
