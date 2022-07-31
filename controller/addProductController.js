exports.getProduct=((req,res)=> {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render("addProduct", {
        pageTitle: "Add Products",
        isAuthenticated : isAuthenticated
    })
});