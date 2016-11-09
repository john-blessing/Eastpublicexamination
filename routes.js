/**
 * Created by Administrator on 2016/1/9.
 */
const jy = require('./controller/jiaoyu.js');

exports.setRequestUrl = function(app){
  app.get('/', jy.getCource);
};