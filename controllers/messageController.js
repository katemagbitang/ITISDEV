

const db = require('../model/db.js');
const userModel = require('../model/userModel.js');
const messagesModel = require('../model/messagesModel.js');
const messagesHistoryModel = require('../model/messagesHistoryModel.js');
const ObjectId = require('mongodb').ObjectID;


function CheckMessageRelationship(sender, receiver, exist){

    

    messagesHistoryModel.find({user1: sender}, function (err1, user1Result){
        messagesHistoryModel.find({user2: sender}, function (err2, user2Result){

            
            const combined = [];

            
            console.log("sender: " + sender);
            console.log("receiver: " + receiver);

            for(i=0; i<user1Result.length; i++){
                if(user1Result[i].user1 == sender && user1Result[i].user2 == receiver){
                    exist.exist =true;
                }else if(user1Result[i].user1 == receiver && user1Result[i].user2 == sender){
                    exist.exist = true;
                }
            }

            for(i=0; i<user2Result.length; i++){
                if(user2Result[i].user1 == sender && user2Result[i].user2 == receiver){
                    exist.exist =true;
                }else if(user2Result[i].user1 == receiver && user2Result[i].user2 == sender){
                    exist.exist = true;
                }
            }

            console.log(exist);
            return exist;

        })
    })

   

   

}


const messageController = {



    getMessageByUsername: function(req, res){
        

        messagesHistoryModel.find({user1: req.session.username}, function (err, user1result){
            messagesHistoryModel.find({user2: req.session.username}, function (err, user2result){

                
                // stores _id of the las messages in the user's messageHistory
                //used in the sidebar of chat
                const messageSnippetIDs = [];

                //relationship or link is stored in 2 separate variable, so this is necessary
                // to make sure that all messages are retrieved
                for(i = 0 ; i < user1result.length; i++){
                    if(user1result[i].user1 == req.session.username){ //will get the user2 attribute
                        var messageSnippetID1 = user1result[i].messages[user1result[i].messages.length - 1];
                        messageSnippetIDs.push(messageSnippetID1);

                    }
                }

                //relationship or link is stored in 2 separate variable, so this is necessary
                // to make sure that all messages are retrieved
                for(i = 0 ; i < user2result.length; i++){
                    if(user2result[i].user2 == req.session.username){ //will get the user2 attribute
                        var messageSnippetID2 = user2result[i].messages[user2result[i].messages.length - 1];
                        messageSnippetIDs.push(messageSnippetID2);
                    }
                }

                // console.log(messageSnippetIDs); //debugging

                // an arraylist of object to be passed to the handlebar.
                //this contains all necessary information in the front end
                const messagesList = [];

                const messages = [];

                var messagesListDetails ; // for storing each messages details

                // finding the message object by the _id (messageSnippetID)
                messagesModel.find({_id: messageSnippetIDs },   function(err, latestMessage){

                    for( i = 0 ; i< latestMessage.length; i++){
                        if(latestMessage[i].sender == req.session.username){//gets the receiver username
                            messagesListDetails = {
                                username: latestMessage[i].receiver,
                                messageSnippet : latestMessage[i].message,
                                snippetDate: latestMessage[i].date
                            }
                            messagesList.push(messagesListDetails); //add to the array
                        }else if(latestMessage[i].receiver == req.session.username){ //gets the sender
                            messagesListDetails = {
                                username: latestMessage[i].sender,
                                messageSnippet : latestMessage[i].message,
                                snippetDate: latestMessage[i].date
                            }
                            messagesList.push(messagesListDetails);//add to the array
                        }
                    }

                    // console.log("messagesList: " + JSON.stringify(messagesList)); //debug

                    


                    // CODES ABOVE THIS IS SAME AS ON getMessages

                    var usernameParam = req.params.username;
                    var loggedusername = req.session.username;

                    // console.log(usernameParam);
                    // console.log(loggedusername);

                    messagesHistoryModel.findOne({user1: usernameParam, user2: loggedusername}, function(err, result1){
                        if(result1 != null){
                            // console.log("result1: " + result1);
                            const messagesID = result1.messages;
                            messagesModel.find({ _id: messagesID}, function(err, messagesResult){
                                const messages = [];
                                var message;
                                for(i=0; i<messagesResult.length; i++){
                                    // used in HBS if-else so that it can identify whether it's outgoing/ingoing UI
                                    if(messagesResult[i].sender == loggedusername){ 
                                        // deletes receiver to the passed infos
                                        //so if sender exists, it means the msg is ingoing (hbs)
                                        message = {
                                            read: messagesResult[i].read,
                                            _id: messagesResult[i]._id,
                                            sender: messagesResult[i].sender,
                                            message: messagesResult[i].message,
                                            date: messagesResult[i].date.toLocaleString()
                                        }
                                        messages.push(message);
                                    }else if(messagesResult[i].receiver == loggedusername){
                                        // deletes sender to the passed infos
                                        //so if receiver exists, it means the msg is outgoing (hbs)
                                        message = {
                                            read: messagesResult[i].read,
                                            _id: messagesResult[i]._id,
                                            receiver: messagesResult[i].receiver,
                                            message: messagesResult[i].message,
                                            date: messagesResult[i].date.toLocaleString()
                                        }
                                        messages.push(message);
                                    }
                                }

                                // // sorts messageslist by date descending order
                                messagesList.sort((b,a) =>  a.snippetDate -  b.snippetDate );

                                //converts iso date to a more uhm minimal format
                                for( i = 0 ; i< messagesList.length; i++){
                                    messagesList[i].senusernameder= messagesList[i].username;
                                    messagesList[i].messageSnippet = messagesList[i].messageSnippet;
                                    messagesList[i].snippetDate = messagesList[i].snippetDate.toLocaleString();
                                }
                                
                                // console.log("messages: "+ JSON.stringify(messages));
                                res.render("messages", {
                                    activeMessageUsername: usernameParam,
                                    messagesHistory_id: result1._id,
                                    messagesList: messagesList, // all infos for the messages sidebar
                                    messages: messages});
                            })
                        }else{
                            messagesHistoryModel.findOne({user2: usernameParam, user1: loggedusername}, function(err, result2){
                                if(result2 != null){
                                    // console.log("result2: " + result2);
                                    const messagesID = result2.messages;
                                    messagesModel.find({ _id: messagesID}, function(err, messagesResult){
                                        const messages = [];
                                        var message;
                                        for(i=0; i<messagesResult.length; i++){
                                            // used in HBS if-else so that it can identify whether it's outgoing/ingoing UI
                                            if(messagesResult[i].sender == loggedusername){ 
                                                // deletes receiver to the passed infos
                                                //so if sender exists, it means the msg is ingoing (hbs)
                                                message = {
                                                    read: messagesResult[i].read,
                                                    _id: messagesResult[i]._id,
                                                    sender: messagesResult[i].sender,
                                                    message: messagesResult[i].message,
                                                    date: messagesResult[i].date.toLocaleString()
                                                }
                                                messages.push(message);
                                            }else if(messagesResult[i].receiver == loggedusername){
                                                // deletes sender to the passed infos
                                                //so if receiver exists, it means the msg is outgoing (hbs)
                                                message = {
                                                    read: messagesResult[i].read,
                                                    _id: messagesResult[i]._id,
                                                    receiver: messagesResult[i].receiver,
                                                    message: messagesResult[i].message,
                                                    date: messagesResult[i].date.toLocaleString()
                                                }
                                                messages.push(message);
                                            }
                                        }

                                        // // sorts messageslist by date descending order
                                        messagesList.sort((b,a) =>  a.snippetDate -  b.snippetDate );

                                        //converts iso date to a more uhm minimal format
                                        for( i = 0 ; i< messagesList.length; i++){
                                            messagesList[i].senusernameder= messagesList[i].username;
                                            messagesList[i].messageSnippet = messagesList[i].messageSnippet;
                                            messagesList[i].snippetDate = messagesList[i].snippetDate.toLocaleString();
                                        }

                                        // console.log("messages: "+ JSON.stringify(messages));
                                        res.render("messages", {
                                            activeMessageUsername: usernameParam,
                                            messagesHistory_id: result2._id,
                                            messagesList: messagesList, // all infos for the messages sidebar
                                            messages: messages});
                                    })
                                }else{
                                    res.send("error");
                                }
                            })
                        }
                    })
                })
            });
        });




                                               
    },
    getMessage: function(req,res){

        messagesHistoryModel.find({user1: req.session.username}, function (err, user1result){
            messagesHistoryModel.find({user2: req.session.username}, function (err2, user2result){

                if(!err && !err2){
                    // stores _id of the las messages in the user's messageHistory
                    //used in the sidebar of chat
                    const messageSnippetIDs = [];

                    //relationship or link is stored in 2 separate variable, so this is necessary
                    // to make sure that all messages are retrieved
                    for(i = 0 ; i < user1result.length; i++){
                        if(user1result[i].user1 == req.session.username){ //will get the user2 attribute
                            var messageSnippetID1 = user1result[i].messages[user1result[i].messages.length - 1];
                            messageSnippetIDs.push(messageSnippetID1);

                        }
                    }

                    //relationship or link is stored in 2 separate variable, so this is necessary
                    // to make sure that all messages are retrieved
                    for(i = 0 ; i < user2result.length; i++){
                        if(user2result[i].user2 == req.session.username){ //will get the user2 attribute
                            var messageSnippetID2 = user2result[i].messages[user2result[i].messages.length - 1];
                            messageSnippetIDs.push(messageSnippetID2);
                        }
                    }

                    // console.log(messageSnippetIDs); //debugging

                    // an arraylist of object to be passed to the handlebar.
                    //this contains all necessary information in the front end
                    var messagesList = [];

                    const messages = [];

                    var messagesListDetails ; // for storing each messages details

                    // finding the message object by the _id (messageSnippetID)
                    messagesModel.find({_id: messageSnippetIDs }).sort([['snippetDate', 1]]).exec(   function(err, latestMessage){

                        for( i = 0 ; i< latestMessage.length; i++){
                            if(latestMessage[i].sender == req.session.username){//gets the receiver username
                                messagesListDetails = {
                                    username: latestMessage[i].receiver,
                                    messageSnippet : latestMessage[i].message,
                                    snippetDate: latestMessage[i].date
                                }
                                messagesList.push(messagesListDetails); //add to the array
                            }else if(latestMessage[i].receiver == req.session.username){ //gets the sender
                                messagesListDetails = {
                                    username: latestMessage[i].sender,
                                    messageSnippet : latestMessage[i].message,
                                    snippetDate: latestMessage[i].date
                                }
                                messagesList.push(messagesListDetails);//add to the array
                            }
                        }

                        // // console.log("messagesList: " + JSON.stringify(messagesList)); //debug


                        // // sorts messageslist by date descending order
                        messagesList.sort((b,a) =>  a.snippetDate -  b.snippetDate );

                        //converts iso date to a more uhm minimal format
                        for( i = 0 ; i< messagesList.length; i++){
                            messagesList[i].senusernameder= messagesList[i].username;
                            messagesList[i].messageSnippet = messagesList[i].messageSnippet;
                            messagesList[i].snippetDate = messagesList[i].snippetDate.toLocaleString();
                        }


                        // Render
                        res.render("messages", {
                            messagesList: messagesList, // all infos for the messages sidebar
                            messages: messages
                        });
                    })
                }
            });
        });
    },

    postMessage: function(req, res){

        var messageText = req.body.message;
        var messagesHistory_id = req.body.messagesHistory_id;
        var receiver = req.body.receiver ;

        var sender = req.session.username;

        console.log(messageText +" "+messagesHistory_id +" "+receiver+" "+sender )

        
        messagesHistoryModel.findOne({_id: messagesHistory_id}, function(err, messagesHistoryResult){

            if(!err){
                if(messageText != ""){

                    console.log(messagesHistory_id);
                    console.log(messagesHistoryResult);
    
                    var message = new messagesModel({
                        _id: ObjectId(),
                        sender: sender,
                        receiver: receiver,
                        message: messageText,
                        date: Date.now()
                    })
                    console.log(message);
                    message.save();
    
                    var messages = [];
                    messages = messagesHistoryResult.messages;
                    messages.push(message._id);
    
                    console.log(messages);
    
                    var messagesHistoryUpdate = {
                        _id: messagesHistoryResult._id,
                        user1: messagesHistoryResult.user1,
                        user2: messagesHistoryResult.user2,
                        messages: messages
                    }
    
                    console.log(messagesHistoryUpdate);
    
                    db.updateOne( messagesHistoryModel, { _id: messagesHistory_id }, messagesHistoryUpdate );
    
                    res.redirect('back');
                    // res.send(message);
                }else{
                    res.redirect('back');
                }
            }else{
                console.log("ERR");
            }

        })
    },

    composenewmessage: function (req, res){

        var sender = req.session.username;
        var receiver = req.body.composeNewMessageRecipient;
        var messageText = req.body.composeNewMessageText;
        var messagesHistory_id;
        var exist = false;


        // res.redirect("/messages/"+receiver);

        
        messagesHistoryModel.find({user1: sender}, function (err1, user1Result){
            messagesHistoryModel.find({user2: sender}, function (err2, user2Result){
    
            
                
                console.log("sender: " + sender);
                console.log("receiver: " + receiver);
    
                // checks if the 2 users already have a convo
                for(i=0; i<user1Result.length; i++){
                    if(user1Result[i].user1 == sender && user1Result[i].user2 == receiver){
                        exist =true;
                        messagesHistory_id= user1Result[i]._id;
                    }else if(user1Result[i].user1 == receiver && user1Result[i].user2 == sender){
                        exist= true;
                        messagesHistory_id= user1Result[i]._id;
                    }
                }
                for(i=0; i<user2Result.length; i++){
                    if(user2Result[i].user1 == sender && user2Result[i].user2 == receiver){
                        exist=true;
                        messagesHistory_id= user2Result[i]._id;
                    }else if(user2Result[i].user1 == receiver && user2Result[i].user2 == sender){
                        exist= true;
                        messagesHistory_id= user2Result[i]._id;
                    }
                }

                //if may past convo na, just add the message to existing messagesHistory object
                if(exist){ 
                    // console.log("exist");
                    // console.log(messagesHistory_id);
                    messagesHistoryModel.findOne({_id: messagesHistory_id}, function(err, messagesHistoryResult){
                        if(err){
                            res.send("error");
                        }else{
                            var message = new messagesModel({
                                _id: ObjectId(),
                                sender: sender,
                                receiver: receiver,
                                message: messageText,
                                date: Date.now()
                            })
                            // console.log(message);
                            message.save();
            
                            var messages = [];
                            messages = messagesHistoryResult.messages;
                            messages.push(message._id);
            
                            // console.log(messages);
            
                            var messagesHistoryUpdate = {
                                _id: messagesHistoryResult._id,
                                user1: messagesHistoryResult.user1,
                                user2: messagesHistoryResult.user2,
                                messages: messages
                            }
            
                            // console.log(messagesHistoryUpdate);
            
                            db.updateOne( messagesHistoryModel, { _id: messagesHistory_id }, messagesHistoryUpdate );
                            res.redirect("/messages/"+receiver);
                        }
                    })
                }
                // if no convo yet, make a messagesHistory object first, then add msg to it.
                else{

                    console.log(receiver);
                    userModel.findOne({username:receiver}, function(err, receiverExists){
                        console.log(receiverExists);
                        if(receiverExists){
                            var message = new messagesModel({
                                _id: ObjectId(),
                                sender: sender,
                                receiver: receiver,
                                message: messageText,
                                date: Date.now()
                            })

                            message.save();

                            const messages = [];
                            messages.push(message._id);

                            var messageHistory = new messagesHistoryModel({
                                _id: ObjectId(),
                                user1: sender,
                                user2: receiver,
                                messages: messages
                            })

                            messageHistory.save();
                            res.redirect("/messages/"+receiver);

                        }else{
                            res.send("Error: recipient does not exist.");
                        }


                    })
                }
    
            })
        })



    }
}

module.exports = messageController;