// TODO: Cater for HTML 5 push state stuff, i.e. for all request non found from static assets redirect to index.html
module.exports = {
    '/ddc/secure/ui/<%=appId%>/config.js' : {
        target : 'http://localhost:8882'
    },
    '/eam/login': {
        target: 'http://localhost:8882'
    },
    '/wps/myportal/sec/xseed/dashboard/mywealth/': {
        target: 'http://localhost:8882'
    },
    '/ddc/public/ui/<%=appId%>/assets/images/*': {
        // rewrite all the local asset request to remove the relative path from them, this is not needed in the environments and is only for local
        target: 'http://localhost:3000',
        pathRewrite: function (path, req) {
            if (req.url) {
                let to = req.url.replace(/\/ddc\/public\/ui\/<%=appId%>\/assets\/images/, '/assets/images');
                if (to !== req.url) {
                    console.log('rewriting api request from : ' + req.url + ' to : ' + to);
                    req.url = to;
                }
            } else {
                console.log('request does not have a url path ' + path, 'req: ', req);
            }
        }
    },
    '/ddc/secure/ui/<%=appId%>/assets/images/*': {
        // rewrite all the local asset request to remove the relative path from them, this is not needed in the environments and is only for local
        target: 'http://localhost:3000',
        pathRewrite: function (path, req) {
            if (req.url) {
                let to = req.url.replace(/\/ddc\/secure\/ui\/<%=appId%>\/assets\/images/, '/assets/images');
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
