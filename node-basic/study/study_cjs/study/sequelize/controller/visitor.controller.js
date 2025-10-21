// const visitorModel = require('../model/visitor.model');

const models = require('../models')

// GET /visitors => localhost:PORT/visitor
exports.getVisitors = (req, res) => {

    // visitorModel.getVisitors((err, rows)=>{
    //     console.log(rows);
    //     if (err) {
    
    //         return;   
    //     }
    //     res.render('visitor', {data: rows});
    // });
    
    models.Visitor.findAll().then((result) => {
        res.render('visitor', {data: result});
    }).catch(() => {
        res.render('visitor', {data: {}});
    });

    
}
// GET /visitor => localhost:PORT/visitor?id
exports.getVisitor = (req, res) => {
    // visitorModel.getVisitor(req.query.id, (err, rows)=>{
    //     console.log(rows);
    //     if (err) {
    //         res.render('visitor', {data: {}}); 
    //         return;   
    //     }
    //     res.render('visitor', {data: rows});
    // });

    models.Visitor.findOne({
        where: { id : req.query.id }
    }).then((result) => {
        res.render('visitor', {data: [result]});
    }).catch(() => {
        res.render('visitor', {data: {}});
    });

}

exports.postVisitor = (req, res) => {

    // visitorModel.postVisitor(req.body.name, req.body.comment, (err, rows)=>{
    //     console.log(rows);
    //     if (err) {
    //         return;   
    //     }
    // });

    models.Visitor.create({
        name : req.body.name,
        comment : req.body.comment,
    }).then((result) => {
        res.send({id: result.dataValues.id, name: req.body.name, comment: req.body.comment});
    }).catch(() => {
        res.send({});
    })
}

exports.patchVisitor =  (req, res) => {

    // visitorModel.patchVisitor(req.body.id, req.body.name, req.body.comment, (err, rows)=>{
    //     console.log('rows', rows);
    //     if (err) {
    //         res.send({result:false });
    //         return;
    //     }
      
    // });

    models.Visitor.update(
        {   
            name : req.body.name,
            comment : req.body.comment
        },
        { where: {
            id: req.body.id,
        }}
    ).then(() => {
        res.send({result:true})
    }).catch(() => {
        res.send({result:false });
    })
}

exports.deleteVisitor = (req, res) => {

    // visitorModel.deleteVigitor(req.body.id, (err, rows)=>{
    //     console.log('rows', rows);
    //     if (err) {
    //         res.send({result:false });
    //         return;
    //     }
    //     res.send({result:true})
    // });

    models.Visitor.destroy({
        where: {
            id : req.body.id
        }
    })
    .then(() => {
        
        res.send({result:true})

    }).catch(() => {
        res.send({result:false });
    })
}
