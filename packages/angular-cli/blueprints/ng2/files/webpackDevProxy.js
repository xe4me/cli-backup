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
    }
};
