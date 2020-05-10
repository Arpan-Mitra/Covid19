const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/covid19-tracker'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/covid19-tracker/index.html'));
});
ngApp.listen(process.env.PORT || 8000);