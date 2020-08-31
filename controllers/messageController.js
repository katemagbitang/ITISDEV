

const db = require('../model/db.js');
const userModel = require('../model/userModel.js');
const messagesModel = require('../model/messagesModel.js');
const messagesHistoryModel = require('../model/messagesHistoryModel.js');
const ObjectId = require('mongodb').ObjectID;



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
                                snippetDate: latestMessage[i].date.toLocaleString()
                            }
                            messagesList.push(messagesListDetails); //add to the array
                        }else if(latestMessage[i].receiver == req.session.username){ //gets the sender
                            messagesListDetails = {
                                username: latestMessage[i].sender,
                                messageSnippet : latestMessage[i].message,
                                snippetDate: latestMessage[i].date.toLocaleString()
                            }
                            messagesList.push(messagesListDetails);//add to the array
                        }
                    }

                    // console.log("messagesList: " + JSON.stringify(messagesList)); //debug


                    // CODES ABOVE THIS IS SAME AS ON getMessages

                    var usernameParam = req.params.username;
                    var loggedusername = req.session.username;

                    console.log(usernameParam);
                    console.log(loggedusername);

                    messagesHistoryModel.findOne({user1: usernameParam, user2: loggedusername}, function(err, result1){
                        if(result1 != null){
                            console.log("result1: " + result1);
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
                                console.log("messages: "+ JSON.stringify(messages));
                                res.render("messages", {
                                    activeMessageUsername: usernameParam,
                                    messagesList: messagesList, // all infos for the messages sidebar
                                    messages: messages});
                            })
                        }else{
                            messagesHistoryModel.findOne({user2: usernameParam, user1: loggedusername}, function(err, result2){
                                console.log("result2: " + result2);
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
                                    console.log("messages: "+ JSON.stringify(messages));
                                    res.render("messages", {
                                        activeMessageUsername: usernameParam,
                                        messagesList: messagesList, // all infos for the messages sidebar
                                        messages: messages});
                                })
                            })
                        }
                    })
                })
            });
        });




                                               
    },
    getMessage: function(req,res){

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
                                snippetDate: latestMessage[i].date.toLocaleString()
                            }
                            messagesList.push(messagesListDetails); //add to the array
                        }else if(latestMessage[i].receiver == req.session.username){ //gets the sender
                            messagesListDetails = {
                                username: latestMessage[i].sender,
                                messageSnippet : latestMessage[i].message,
                                snippetDate: latestMessage[i].date.toLocaleString()
                            }
                            messagesList.push(messagesListDetails);//add to the array
                        }
                    }

                    // console.log("messagesList: " + JSON.stringify(messagesList)); //debug

                    // Render
                    res.render("messages", {
                        messagesList: messagesList, // all infos for the messages sidebar
                        messages: messages
                    });
                })
            });
        });
    }
}

module.exports = messageController;