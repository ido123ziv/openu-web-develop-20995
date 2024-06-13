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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var moderatorHandler_1 = require("./moderatorHandler");
var globals_1 = require("../../../utils/global/globals");
var moderatorRouter = (0, express_1.Router)();
var handler = new moderatorHandler_1.default();
moderatorRouter.get("/allUsers", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handler.getAllUsers()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).send(users)];
            case 2:
                e_1 = _a.sent();
                console.log("Error message: ".concat(e_1.message, "\n").concat(e_1.stack));
                return [2 /*return*/, res.status(500).end()];
            case 3: return [2 /*return*/];
        }
    });
}); });
moderatorRouter.get("/allContactRequests", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contactRequests, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handler.getContactRequests()];
            case 1:
                contactRequests = _a.sent();
                return [2 /*return*/, res.status(200).send(contactRequests)];
            case 2:
                e_2 = _a.sent();
                console.log("Error message: ".concat(e_2.message, "\n").concat(e_2.stack));
                return [2 /*return*/, res.status(500).end()];
            case 3: return [2 /*return*/];
        }
    });
}); });
moderatorRouter.put("/editContactRequestStatus/:id", [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .isNumeric()
        .withMessage(globals_1.REQUEST_INVALID_INPUT_ERROR),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fieldValidationResult, requestId, newStatus, requestValidation, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                fieldValidationResult = (0, express_validator_1.validationResult)(req);
                if (!fieldValidationResult.isEmpty()) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: fieldValidationResult.array()[0].msg })];
                }
                requestId = req.params.id;
                newStatus = req.body.status;
                return [4 /*yield*/, handler.requestValidation(Number(requestId), newStatus)];
            case 1:
                requestValidation = _a.sent();
                if (!requestValidation.isValid) {
                    return [2 /*return*/, res.status(400).json({ message: requestValidation.message })];
                }
                return [4 /*yield*/, handler.editContactRequestStatus(Number(requestId), newStatus)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Status Changed." })];
            case 3:
                e_3 = _a.sent();
                console.log("Error message: ".concat(req.body.id, ": ").concat(e_3.message, "\n").concat(e_3.stack));
                return [2 /*return*/, res.status(500).end()];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = moderatorRouter;
