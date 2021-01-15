const commentsCtrl = {};
const Comment = require('../models/Comment');

commentsCtrl.getComments = async (req, res) =>{

    const comments = await Comment.find();
    res.json(comments);

};

commentsCtrl.createComment = async (req, res) => {
    console.log(req.body);
    const { id_product, autor, contenido } = req.body;
    const newComment = new Comment({

        id_product,
        autor, 
        contenido

    });

    await newComment.save();
    res.json({message: "Comentario Creado"});
 
};

commentsCtrl.getComment = async (req, res) => {

   const comment = await Comment.findById(req.params.id);
   res.json(product);

};

commentsCtrl.updateComment = async (req, res) => {

    const { autor, contenido } = req.body;

    await Comment.findOneAndUpdate({_id: req.params.id},{

        id_product,
        autor,
        contenido

    });

    res.json({message: "Comentario Actualizado"});

};

commentsCtrl.deleteComment = async (req, res) => {

    await Comment.findByIdAndDelete(req.params.id);
    res.json({message: "Comentario Eliminado"});

};

module.exports = commentsCtrl;