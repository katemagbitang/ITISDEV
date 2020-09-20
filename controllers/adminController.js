const db = require('../model/db.js');
//const booksModel = require('../model/booksModel.js');
const books = require('../model/booksModel.js');
const BookVersions = require('../model/bookVersionsModel.js');
const ObjectId = require('mongodb').ObjectID;

// for image upload
const path = require('path');
const multer = require('multer');


//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/img',
    filename: function( req, file, callback){
        callback(null, filename =  file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
    }
});

//init upload 
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        checkFileType(file, callback);
    }
}).single('myImage');

// check file type
function checkFileType(file , callback){
    // allowed extensions
    const filetypes = /jpeg|jpg|png/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return callback(null, true);
    }else{
        callback("Error: Images only");
    }
}


const adminController = {
    getAddProduct: function(req,res){
        res.render("addproducts",{});
    },
    getAdminRequestList: function(req,res){
        res.render("adminRequestsListCollective",{});
    },
    getAdminRequestListCollective: function(req,res){
        res.render("adminRequestsListCollective",{});
    },
    getAdminRequestListIndividual: function(req,res){
        res.render("adminRequestsListIndividual",{});
    },
    getAdminRequestListSTBC: function(req,res){
        res.render("adminRequestsListSTBC",{});
    },
    postProduct: function (req,res,next) {
        //res.render('addproducts', details);
        var book_ID = ObjectId();
        var title = req.body.Book_Title;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var year = req.body.year;
        var category = req.body.category;
        var bookSynopsis = req.body.bookSynopsis;

        var edition = req.body.edition;
        var type = req.body.type;
        var quality = req.body.quality;
        var quantity = req.body.quantity;
        var sellingPrice = req.body.sellingPrice;
        var priceBought = req.body.priceBought;

        var bookCover = req.file.filename; 

        var item = {
            book_ID: ObjectId(),
            title : title,
            author : ObjectId(), //??
            publisher : publisher,
            year : year,
            category : category,
            bookSynopsis : bookSynopsis
        }

        var item2 = {
            bookVersion_ID : ObjectId(),
            book_ID : book_ID,
            priceBought : priceBought,
            sellingPrice : sellingPrice,
            quality : quality,
            edition : edition,
            type : type,
            quantity : quantity,
            bookCover : bookCover
        }
        
        db.insertOne(books, item);
        db.insertOne(BookVersions, item2);
        
        res.redirect('/browse');
    }
}

module.exports = adminController;