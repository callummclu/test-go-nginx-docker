(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 735:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "container_container__VfBvr"
};


/***/ }),

/***/ 847:
/***/ ((module) => {

// Exports
module.exports = {
	"footer": "footer_footer__xOhUW"
};


/***/ }),

/***/ 728:
/***/ ((module) => {

// Exports
module.exports = {
	"nav": "nav_nav__vHLUj",
	"open": "nav_open__vIcGS",
	"hamburger": "nav_hamburger__LsrAW",
	"section": "nav_section__z1D2z",
	"show": "nav_show__gCt1I",
	"icons": "nav_icons__QKgHn",
	"mantine-Anchor-root": "nav_mantine-Anchor-root__7ocoi",
	"show-bottom-border": "nav_show-bottom-border__47LyO"
};


/***/ }),

/***/ 827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MyApp)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@mantine/core"
var core_ = __webpack_require__(247);
// EXTERNAL MODULE: external "@mantine/notifications"
var notifications_ = __webpack_require__(914);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./src/styles/sass/container.module.scss
var container_module = __webpack_require__(735);
var container_module_default = /*#__PURE__*/__webpack_require__.n(container_module);
// EXTERNAL MODULE: ./src/styles/sass/footer.module.scss
var footer_module = __webpack_require__(847);
var footer_module_default = /*#__PURE__*/__webpack_require__.n(footer_module);
;// CONCATENATED MODULE: ./src/components/footer.tsx



const Footer = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (footer_module_default()).footer,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(core_.Divider, {
                mb: "md"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.Text, {
                pt: "xs",
                children: [
                    "Thanks for visiting my site, feel free to contact me on ",
                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Anchor, {
                        style: {
                            color: "darkgreen"
                        },
                        href: "https://www.linkedin.com/in/callummclu/",
                        children: "linkedin"
                    }),
                    " or on email via ",
                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Anchor, {
                        style: {
                            color: "darkgreen"
                        },
                        href: "mailto:callummcluskey100@gmail.com",
                        children: "callummcluskey100@gmail.com"
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/components/Container.tsx



const Container = ({ children , isAdmin  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: `${!isAdmin && (container_module_default()).container}`,
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Footer, {})
        ]
    });
};

// EXTERNAL MODULE: ./src/styles/sass/nav.module.scss
var nav_module = __webpack_require__(728);
var nav_module_default = /*#__PURE__*/__webpack_require__.n(nav_module);
;// CONCATENATED MODULE: external "react-icons/bs"
const bs_namespaceObject = require("react-icons/bs");
// EXTERNAL MODULE: external "react-icons/bi"
var bi_ = __webpack_require__(652);
// EXTERNAL MODULE: external "react-icons/io"
var io_ = __webpack_require__(751);
;// CONCATENATED MODULE: ./src/components/nav.tsx







const Nav = ()=>{
    const [menuOpen, setMenuOpen] = (0,external_react_.useState)(false);
    const openMenu = ()=>setMenuOpen(!menuOpen);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `${(nav_module_default()).nav} ${menuOpen && (nav_module_default()).open}`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(core_.UnstyledButton, {
                "aria-label": "menu button",
                onClick: openMenu,
                className: (nav_module_default()).hamburger,
                children: menuOpen ? /*#__PURE__*/ jsx_runtime_.jsx(io_.IoMdClose, {
                    color: "grey",
                    size: 24
                }) : /*#__PURE__*/ jsx_runtime_.jsx(bi_.BiMenu, {
                    color: "gray",
                    size: 24
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `${(nav_module_default()).section} ${menuOpen && (nav_module_default()).show}`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "/",
                        children: "Home"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "/about",
                        children: "About"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `${(nav_module_default()).section} ${menuOpen && `${(nav_module_default()).show} ${(nav_module_default()).icons}`}`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Anchor, {
                        href: "https://github.com/callummclu",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(bs_namespaceObject.BsGithub, {
                            "aria-label": "github",
                            color: "gray",
                            size: 18
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Anchor, {
                        href: "https://www.linkedin.com/in/callummclu/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(bs_namespaceObject.BsLinkedin, {
                            "aria-label": "linkedin",
                            color: "gray",
                            size: 18
                        })
                    })
                ]
            })
        ]
    });
};

// EXTERNAL MODULE: ./src/hooks/useAuth.tsx + 2 modules
var useAuth = __webpack_require__(609);
// EXTERNAL MODULE: ./src/styles/sass/index.scss
var sass = __webpack_require__(85);
;// CONCATENATED MODULE: ./src/pages/_app.tsx









function MyApp({ Component , pageProps  }) {
    const isAdmin = ()=>{
        if (false) {}
    };
    (0,external_react_.useEffect)(()=>{
        if ("serviceWorker" in navigator) {
            if (false) {}
        }
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(core_.MantineProvider, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(notifications_.NotificationsProvider, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(useAuth/* AuthProvider */.H, {
                    children: [
                        !isAdmin() && /*#__PURE__*/ jsx_runtime_.jsx(Nav, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(Container, {
                            isAdmin: isAdmin(),
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                ...pageProps
                            })
                        })
                    ]
                })
            })
        })
    });
}


/***/ }),

/***/ 85:
/***/ (() => {



/***/ }),

/***/ 247:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/core");

/***/ }),

/***/ 914:
/***/ ((module) => {

"use strict";
module.exports = require("@mantine/notifications");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 652:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/bi");

/***/ }),

/***/ 751:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/io");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [609], () => (__webpack_exec__(827)));
module.exports = __webpack_exports__;

})();