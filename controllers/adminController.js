const db = require('../model/db.js');
//const booksModel = require('../model/booksModel.js');
const books = require('../model/booksModel.js');
const BookVersions = require('../model/bookVersionsModel.js');
const BookAuthors = require('../model/bookAuthorsModel.js');
const authorModel = require('../model/authorModel.js');
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
        var book_ID = ObjectId();
        var author_ID = ObjectId();
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




        console.log("author: " + author);

        var authorArr = author.split(',');
        var authorIDArr = [];

        console.log("authorArr.length: " + authorArr.length);
        
        authorArrCount = 0;
        authorArr.forEach(function(a, err){

            console.log("a: " + a.trim());
            var aName = a.trim();
            authorModel.findOne({aName: aName}, function(err, authorResult){
                if(authorResult){
                    console.log("if")
                    // if author already exists in the db, push its _ID
                    authorIDArr.push(authorResult._id);
                    console.log("authorIDArr: " + authorIDArr)
                }else{
                    // author DOES NOT exist in the db, make an author object then push its _ID
                    var author = new authorModel({
                        _id : new ObjectId(),
                        aName : aName
                    })

                    author.save();
                    authorIDArr.push(author._id);
                    console.log("authorIDArr: " + authorIDArr)
                }

                authorArrCount++;
                if( authorArrCount == authorArr.length){

                    var item = {
                        book_ID:  book_ID,
                        title : title,
                        author :  authorIDArr, // passes the IDs
                        publisher : publisher,
                        year : year,
                        category : category,
                        bookSynopsis : bookSynopsis
                    }
                    
            
                    var item2 = {
                        bookVersion_ID : ObjectId(),
                        book_ID :book_ID,
                        priceBought : priceBought,
                        sellingPrice : sellingPrice,
                        quality : quality,
                        edition : edition,
                        type : type,
                        quantity : quantity,
                        bookCover : '../img/'+bookCover
                    }
            
            
                    
            
                    db.insertOne(books, item);
                    db.insertOne(BookVersions, item2);
                    // db.insertOne(Author, author);
                    
            
                    res.redirect('/browse');


                }


                
            })


            



        })
        
        

        // var item = {
        //     book_ID:  book_ID,
        //     title : title,
        //     author :  author_ID, //??
        //     publisher : publisher,
        //     year : year,
        //     category : category,
        //     bookSynopsis : bookSynopsis
        // }
        

        // var item2 = {
        //     bookVersion_ID : ObjectId(),
        //     book_ID :book_ID,
        //     priceBought : priceBought,
        //     sellingPrice : sellingPrice,
        //     quality : quality,
        //     edition : edition,
        //     type : type,
        //     quantity : quantity,
        //     bookCover : '../img/'+bookCover
        // }


        

        // // db.insertOne(books, item);
        // // db.insertOne(BookVersions, item2);
        // // db.insertOne(Author, author);
        

        // // res.redirect('/browse');
    }
}

module.exports = adminController;