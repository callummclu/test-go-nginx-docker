"use strict";
exports.id = 609;
exports.ids = [609];
exports.modules = {

/***/ 609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "H": () => (/* binding */ AuthProvider),
  "Z": () => (/* binding */ useAuth)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./src/api/sessions.tsx
async function sessions_login(loginParams) {
    const response = fetch(`${"http://localhost:8080"}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginParams)
    });
    return response;
}
async function logOut() {
    localStorage.removeItem("gocial_auth_token");
    return false;
}

;// CONCATENATED MODULE: ./src/api/users.tsx
function checkAuth() {
    const token = localStorage.getItem("gocial_auth_token");
    if (token) {
        const response = fetch(`${"http://localhost:8080"}/auth/${token}`);
        return response;
    }
    return new Promise((rej)=>{
        rej("error");
    });
}
function getUserDetails(username) {
    const response = fetch(`${"http://localhost:8080"}/user/${username}`);
    return response;
}

;// CONCATENATED MODULE: ./src/hooks/useAuth.tsx




const AuthContext = /*#__PURE__*/ (0,external_react_.createContext)({});
function AuthProvider({ children  }) {
    const [user, setUser] = (0,external_react_.useState)();
    const [loggedIn, setLoggedIn] = (0,external_react_.useState)(false);
    const [error, setError] = (0,external_react_.useState)();
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const [loadingInitial, setLoadingInitial] = (0,external_react_.useState)(true);
    (0,external_react_.useEffect)(()=>{
        if (error) setError(null);
    }, []);
    (0,external_react_.useEffect)(()=>{
        checkAuth().then(async (res)=>{
            if (res !== "error") {
                const res_json = await res.json();
                if (res_json.username) {
                    setLoggedIn(res_json.isAuthenticated);
                    getUserDetails(res_json.username).then(async (res)=>{
                        const res_json = await res.json();
                        setUser(res_json.data);
                    }).catch((err)=>{
                        setError(err);
                    });
                }
            }
        }).finally(()=>setLoadingInitial(false));
    }, []);
    function reload() {
        setLoading(true);
        checkAuth().then(async (res)=>{
            const res_json = await res.json();
            setLoggedIn(res_json.isAuthenticated);
            getUserDetails(res_json.username).then(async (res)=>{
                const res_json = await res.json();
                setUser(res_json.data);
            });
        }).finally(()=>setLoading(false));
    }
    function login({ username , password  }, callback) {
        setLoading(true);
        sessions_login({
            username,
            password
        }).then(async (res)=>{
            const res_json = await res.json();
            if (!Object.hasOwn(res_json, "error")) {
                localStorage.setItem("gocial_auth_token", res_json.token);
                checkAuth().then(async (res)=>{
                    const res_json = await res.json();
                    setLoggedIn(res_json.isAuthenticated);
                    getUserDetails(res_json.username).then(async (res)=>{
                        const res_json = await res.json();
                        setUser(res_json.data);
                    }).catch((err)=>{
                        setError(err);
                    });
                });
            } else {
                setError(res_json.error);
            }
        }).catch((error)=>{
            setError(error);
        }).finally(()=>{
            setLoading(false);
            callback?.();
        });
    }
    function clearError() {
        setError("");
    }
    function logout() {
        logOut().then(()=>setUser(undefined));
    }
    const memoedValue = (0,external_react_.useMemo)(()=>({
            user,
            error,
            loading,
            login,
            clearError,
            logout,
            loggedIn,
            reload
        }), [
        user,
        loading,
        loggedIn,
        error
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(AuthContext.Provider, {
        value: memoedValue,
        children: !loadingInitial && children
    });
}
function useAuth() {
    return (0,external_react_.useContext)(AuthContext);
}


/***/ })

};
;