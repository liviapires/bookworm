const homeModel = require('../models/homeModel');

exports.getHome = ((req, res) => {
    const homeData = new homeModel();
    const data = homeData.getHomeData();

    res.send(`${data}`);
});