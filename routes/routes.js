const express = require('express');

const controller = require('../controllers/controller.js');
const userController = require('../controllers/userController.js');
const orderController = require('../controllers/orderController.js');
const adminController = require('../controllers/adminController.js');
const messageController = require('../controllers/messageController.js');
const bookController = require('../controllers/bookController.js');
const requestController = require('../controllers/requestController.js');
const cartController = require('../controllers/cartController.js');
const searchController = require('../controllers/searchController.js');
const notificationController = require('../controllers/notificationController.js');

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
    storage: storage
})

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
	

const app = express();

app.get('/',controller.getHome);
app.get('/home',controller.getHome);

app.get('/signup',userController.getSignUp);

app.get('/getsession', controller.getSession);

app.get('/login',userController.getLogin);
app.post('/login', userController.postLogin);

app.get('/logout',userController.getLogout);

app.get('/getUsername', userController.getUsername);
app.get('/getEmail', userController.getEmail);

app.post('/search', searchController.postSearch);

app.get('/aboutus', controller.getAboutUs);

app.get('/notification', notificationController.getNotification);

app.get('/messages', messageController.getMessage);
app.get('/messages/:username', messageController.getMessageByUsername);
app.post('/messages/:username', messageController.postMessage);
app.post('/composenewmessage', messageController.composenewmessage);
// app.get('/getMessagesList/:username', messageController.getMessagesList);
// app.get('/getMessages/:username/:messages', messageController.getMessages);
// app.get('/messages/:messages/:messagesList', messageController.getMessage);
// app.get('/messages/:username/:messages/:messagesList', messageController.getMessageByUsername);


app.post('/signup',userController.postSignup);

app.get('/cart', cartController.getCart);
app.post("/checkout", cartController.postCheckout);

app.get('/checkout', cartController.postCheckout);

app.get('/requestbook',function(req,res){
	res.render("requestform",{});
});

app.get('/requestlist',function(req,res){
	res.render("requestlist",{});
});
app.get('/requestlist/:status', requestController.getRequestsForRegular);



app.get('/dummyupload', controller.getDummyUpload);
app.post('/dummyupload',  controller.postDummyUpload);
app.get('/dummyphoto', controller.dummyphoto);
app.get('/dummyphoto/:id', controller.dummyphotobyID);
app.get('/dummyuploadtos3', controller.getDummyUploadToS3);
app.post('/dummyuploadtos3',  controller.postDummyUploadToS3);


app.get('/books/:bookVersion_ID',bookController.getOneBook);
app.post('/books/:bookVersion_ID',cartController.postAddToCart);

app.get('/pageslist',function(req,res){
	res.render("pageslist",{});
});

app.get('/browse',bookController.getBook);
app.get('/browse/:category',bookController.getBookByCategory);



app.get('/confirmpayment',function(req,res){
	res.render("confirmpayment",{});
});

app.get('/generatesalesreport',orderController.getGenerateSales);

app.post('/salesreport',orderController.postSalesReport);

app.get('/Orders',orderController.getOrders);
app.get('/Orders/:view', orderController.getOrdersByStatus);

app.post('/sendpayment', upload.single('myImage'), orderController.postSendPayment); //contains image upload

app.post('/uploadphoto',  controller.uploadPhoto);

app.post('/addProducts',adminController.postProduct);
app.get('/addProducts',adminController.getAddProduct);


app.get('/adminRequestsList',adminController.getAdminRequestList);
app.get('/adminRequestsList/:view',requestController.getRequestsForAdmin);

app.post('/override/:request_ID', requestController.postOverrideRequest);
app.post('/requestbook', requestController.postRequestABook);
app.post('/fulfillrequest', requestController.postFulfillRequest);
app.post('/postOneBookVersion', bookController.postOneBookVersion);

app.post('/confirmpayment', orderController.postConfirmPayment);
app.post('/rejectpayment', orderController.postRejectPayment);

module.exports = app;
