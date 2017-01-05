module.exports = {
    "/ddc/public/ui/bett3r/config.js": {
        target: "http://localhost:8882"
    },
    "/ddc/public/ui/bett3r/assets/images/*": {
        // rewrite all the local asset request to remove the relative path from them, this is not needed in the environments and is only for local
        target: "http://localhost:3000",
        pathRewrite: function (path, req) {
            if (req.url) {
                let to = req.url.replace(/\/ddc\/public\/ui\/bett3r\/assets\/images/, '/assets/images');
                if (to !== req.url) {
                    console.log('rewriting api request from : ' + req.url + ' to : ' + to);
                    req.url = to;
                }
            } else {
                console.log('request does not have a url path ' + path, 'req: ', req);
            }
        }
    },
    '/ddc/public/api/*': {
        // this will rewrite all the request to api to dev , for save and submit ,
        secure: false,
        target: "https://ddc-dev.digital-pilot.ampaws.com.au",
        pathRewrite: function (path, req) {
            if (req.url) {
                let to = req.url;
                to     = req.url.replace(/\/save|/, '/bett3r/save');
                to     = req.url.replace(/\/submit|/, '/bett3r/submit'); // I know I could do a better regex , but this is better as we can easily comment the line out.
                if (to !== req.url) {
                    console.log('rewriting api request from : ' + req.url + ' to : ' + to);
                    req.url = to;
                }
            } else {
                console.log('request does not have a url path ' + path, 'req: ', req);
            }
        }
    }
};
