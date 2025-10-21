const visitorModel = require('../model/visitor.model');

// GET /visitors => localhost:PORT/visitor
exports.getVisitors = (req, res) => {
    visitorModel.getVisitors((err, rows)=>{
        console.log(rows);
        if (err) {
            res.render('visitor', {data: {}}); 
            return;   
        }
        res.render('visitor', {data: rows});
    });
}
// GET /visitor => localhost:PORT/visitor?id
exports.getVisitor = (req, res) => {
    visitorModel.getVisitor(req.query.id, (err, rows)=>{
        console.log(rows);
        if (err) {
            res.render('visitor', {data: {}}); 
            return;   
        }
        res.render('visitor', {data: rows});
    });
}

exports.postVisitor = (req, res) => {

    visitorModel.postVisitor(req.body.name, req.body.comment, (err, rows)=>{
        console.log(rows);
        if (err) {
            res.send({});
            return;   
        }
        res.send({id: rows.insertId, name: req.body.name, comment: req.body.comment});
    });
}

exports.patchVisitor =  (req, res) => {

    visitorModel.patchVisitor(req.body.id, req.body.name, req.body.comment, (err, rows)=>{
        console.log('rows', rows);
        if (err) {
            res.send({result:false });
            return;
        }
        res.send({result:true})
    });
}

exports.deleteVisitor = (req, res) => {

    visitorModel.deleteVigitor(req.body.id, (err, rows)=>{
        console.log('rows', rows);
        if (err) {
            res.send({result:false });
            return;
        }
        res.send({result:true})
    });
}
