"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const post_route_1 = require("../modules/post/post.route");
const comment_route_1 = require("../modules/comment/comment.route");
exports.router = (0, express_1.Router)();
const modulesRouters = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRouters,
    },
    {
        path: "/category",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/post",
        route: post_route_1.PostRoutes,
    },
    {
        path: "/comment",
        route: comment_route_1.CommentRoutes,
    },
];
modulesRouters.forEach((route) => {
    exports.router.use(route.path, route.route);
});
