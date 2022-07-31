exports.getProduct=((req,res)=> {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render("home", {  
        pageTitle: "Home Page",
        isAuthenticated: isAuthenticated
    })
 })
