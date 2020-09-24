
// const db = require('../model/db.js');
const dummyModel = require('../model/dummyModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const booksModel = require('../model/booksModel.js');


const path = require('path');
const multer = require('multer');


//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/img',
    filename: function( req, file, callback){
        callback(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
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


const controller ={
    getIndex: function(req,res){
        res.render("index", {});
    },
    getHome: function(req,res){
        // console.log("GETTING HOME");

        var categoryList = []; //what is needed: category
        var bookList = []; //what is needed: bookCover, title, bookVersion_ID

        bookVersionsModel.find({}, function (err, versionsresult) {
            if (versionsresult != null) {
                versionsresult.forEach(function(v, err) {
                    var bookVersion_ID = v.bookVersion_ID;
                    var book_ID = v.book_ID;
                    var bookCover = v.bookCover;

                    booksModel.findOne({book_ID: book_ID}, function(err, booksresult) {
                        if (booksresult != null) {
                            var title = booksresult.title;
                            var category = booksresult.category;

                            var booklisting = {
                                bookVersion_ID: bookVersion_ID,
                                bookCover: bookCover,
                                title: title
                            }

                            bookList.push(booklisting);

                            if (categoryList.includes(category)) {
                                // console.log(category +" is already stored.");
                            }
                            else {
                                categoryList.push(category);
                                // console.log("Category: " + category);
                            }
                        }
                    });
                });

            }

            //renders page
            res.render("home", {
                bookList: bookList,
                categoryList: categoryList
            });
        });
    },

    //gets current session's userType. useful for validating user permissions
    getSession: function(req, res){
        
        if(req.session.userType != null) // logged in, either Regular or Admin
            res.json({userType:req.session.userType});
        else // if noone is logged in
            res.json({userType:"Visitor"});
    },
    getAboutUs: function(req,res) {
        res.render("aboutus");
    },
    getDummyUpload: function(req, res){
        res.render("dummyupload");
    },
    postDummyUpload: function(req, res){
        upload(req, res, (err) =>{
            if(err){
                res.render('dummyupload',{
                    msg:err,
                })
            }else{
                console.log(req.file);
                if(req.file == undefined){
                    res.render('dummyupload',{
                        msg:"Error: no file selected",
                    })
                }else{
                    res.render('dummyupload', {
                        msg:"File upload successful",
                        image: `img/${req.file.filename}`
                    })
                }
            }
        });
    },
    postDummyUploadToS3: function(req, res){
        res.render('dummyupload',{

        })
    },
    getDummyUploadToS3: function(req, res){
        res.render('dummyupload',{
            
        })
    },

    dummyphoto: function(req, res){
        db.collection('mycollection').find().toArray((err, result) => {
 
            const imgArray= result.map(element => element._id);
                  console.log(imgArray);
       
         if (err) return console.log(err)
         res.send(imgArray)
       
        })
     

    },

    dummyphotobyID: function(req, res){
        var filename = req.params.id;
 
        db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
        
            if (err) return console.log(err)
        
        res.contentType('image/jpeg');
        res.send(result.image.buffer)
        
            
        })

    },

    uploadPhoto: function (req, res){

        console.log(req.file);
        upload(req, res, (err) =>{
            if(err){
                res.send("error");

            }else{
                console.log(req.file);
                if(req.file == undefined){
                    res.send("error");
                }else{
                    // res.render('dummyupload', {
                    //     msg:"File upload successful",
                    //     image: `img/${req.file.filename}`
                    // })
                    res.send({img: req.file.filename})
                }
            }
        });


    }

}

module.exports = controller;
