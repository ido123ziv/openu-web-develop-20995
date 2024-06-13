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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../../utils/db/db");
var globals_1 = require("../../../utils/global/globals");
var DBHandler = /** @class */ (function () {
    function DBHandler() {
    }
    DBHandler.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parentQuery, babysitterQuery, parents, babysitters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parentQuery = "SELECT parent_id AS id,\n                                parent_name AS name, \n                                email, \n                                gender, \n                                phone_number AS \"phoneNumber\", \n                                min_kid_age AS \"minKidAge\",\n                                max_kid_age AS \"maxKidAge\", \n                                num_of_kids AS \"numOfKids\", \n                                comments, \n                                'parent' AS role\n                        FROM parents\n                        WHERE end_timestamp = $1";
                        babysitterQuery = "SELECT babysitter_id AS id, \n                                  babysitter_name AS name, \n                                  email, \n                                  gender, \n                                  city,\n                                  street,\n                                  age, \n                                  phone_number AS \"phoneNumber\",\n                                  experience,\n                                  image_string AS \"imageString\",\n                                  comments,\n                                  'babysitter' AS role\n                          FROM babysitters\n                          WHERE end_timestamp = $1";
                        return [4 /*yield*/, db_1.default.query(parentQuery, [globals_1.END_TIMESTAMP])];
                    case 1:
                        parents = _a.sent();
                        return [4 /*yield*/, db_1.default.query(babysitterQuery, [globals_1.END_TIMESTAMP])];
                    case 2:
                        babysitters = _a.sent();
                        return [2 /*return*/, __spreadArray(__spreadArray([], parents.rows, true), babysitters.rows, true)];
                }
            });
        });
    };
    DBHandler.prototype.getContactRequest = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, contactRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT request_status AS \"requestStatus\",\n                          user_name AS name,\n                          user_email AS email,\n                          message_title AS title,\n                          user_message AS message\n                   FROM contact_requests\n                   WHERE request_id = $1";
                        return [4 /*yield*/, db_1.default.query(query, [requestId])];
                    case 1:
                        contactRequest = _a.sent();
                        return [2 /*return*/, contactRequest.rows];
                }
            });
        });
    };
    DBHandler.prototype.getContactRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, contactRequests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT request_status AS \"requestStatus\",\n                          user_name AS name,\n                          user_email AS email,\n                          message_title AS title,\n                          user_message AS message\n                   FROM contact_requests\n                   ORDER BY request_id";
                        return [4 /*yield*/, db_1.default.query(query)];
                    case 1:
                        contactRequests = _a.sent();
                        return [2 /*return*/, contactRequests.rows];
                }
            });
        });
    };
    DBHandler.prototype.editContactRequestStatus = function (requestId, newStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE contact_requests\n                   SET request_status = $1\n                   WHERE request_id = $2";
                        return [4 /*yield*/, db_1.default.query(query, [newStatus, requestId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DBHandler;
}());
exports.default = DBHandler;
