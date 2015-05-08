
var Comment = require('../models/Comment');

module.exports = function(app) {
  app.post('/comment', function(req, res){
    var aCmt = new Comment();
    aCmt.title=req.body.title;
    aCmt.body=req.body.content;
    aCmt.save(function (err){if(err) console.log('save error :'+err); /* else console.log('save OK'); */ });
    res.status(200).send(aCmt);
  });
  app.get('/comment', function(req, res){
    var qtitle = req.query.title;
    var qstart = req.query.start;
    var qnum = req.query.num;
    console.log(qtitle+" "+qstart+" "+qnum)
    Comment.count({'title':qtitle}).count(function (err,num){
      if(err){
        console.log('count error:'+err);
        res.status(404).send('count error:'+err);
      }else if(qstart!=0 && num<=qnum){
        console.log('no more comments:'+err);
        res.status(404).send('count error:'+err);
      }else{
        Comment.find({title:qtitle}).sort({'date':-1}).skip(qstart).limit(qnum).exec(function (err,comments){
          if(err){
            console.log('query error:'+err);
            res.status(200).send('query error:'+err);
          }else{
            res.status(200).send({'totle':num,'comments':comments});
          }
        });
      }
    });
  });
}
