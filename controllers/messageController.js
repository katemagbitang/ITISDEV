

const db = require('../model/db.js');
const userModel = require('../model/userModel.js');
const messagesModel = require('../model/messagesModel.js');
const messagesHistoryModel = require('../model/messagesHistoryModel.js');
const ObjectId = require('mongodb').ObjectID;


// this returns a message object by the _id
// function getMessageByID(message_id, username, user1filteredresult){
//     var message_id = new ObjectId(message_id)

//     messagesModel.findOne({_id: message_id },   function(err, latestMessage){
//         console.log("2");

//         console.log("latestMessage 1st: " + latestMessage);
//         var messageSnippet = latestMessage.message;
//         var snippetDate = latestMessage.date;

//         var user1filteredresultdetails = {
//             username : username,
//             messageSnippet : messageSnippet,
//             snippetDate: snippetDate
//         }

//         console.log("user1filteredresultdetails: " +JSON.stringify(user1filteredresultdetails));
//         user1filteredresult.push(user1filteredresultdetails);
//         // collectiveFilteredResult.push(user1filteredresultdetails);
//         console.log("user1filteredresult: " + JSON.stringify(user1filteredresult));
//     })
// };


const messageController = {

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

                    // Render
                    res.render("messages", {
                        messagesList: messagesList // all infos for the messages sidebar
                    });
                })
            });
        });
    },

    BACKUPgetMessage: function(req,res){

        messagesHistoryModel.find({user1: req.session.username}, function (err, user1result){
            messagesHistoryModel.find({user2: req.session.username}, function (err, user2result){

                // console.log("user1result: " + user1result);
                // console.log("user1messageHistory: " + user1result.length);
                // console.log("user2result: " + user2result);
                // console.log("user2messageHistory: " + user2result.length);

                // const collectiveresults = []; // array to combine user1result and user2result

                // collectiveresults.push(user1result);
                // collectiveresults.push(user2result);

                // console.log("collectiveresults: " + collectiveresults);
                // console.log("collectiveresults length: " + collectiveresults.length);

                const user1filteredresult = [];
                const user2filteredresult = [];

                const collectiveFilteredResult = [];

                console.log("0");
                
                for(i = 0 ; i < user1result.length; i++){
                    if(user1result[i].user1 == req.session.username){ //will get the user2 attribute
                        var messageSnippetID = user1result[i].messages[user1result[i].messages.length - 1];
                        var username = user1result[i].user2;

                        console.log("1");

                        messagesModel.findOne({_id: messageSnippetID },   function(err, latestMessage){
                            console.log("2");
                    
                            console.log("latestMessage 1st: " + latestMessage);
                            var messageSnippet = latestMessage.message;
                            var snippetDate = latestMessage.date;

                            var user1filteredresultdetails = {
                                username : username,
                                messageSnippet : messageSnippet,
                                snippetDate: snippetDate
                            }

                            console.log("user1filteredresultdetails: " +JSON.stringify(user1filteredresultdetails));
                            user1filteredresult.push(user1filteredresultdetails);
                            collectiveFilteredResult.push(user1filteredresultdetails);
                            console.log("user1filteredresult: " + JSON.stringify(user1filteredresult));
                        })
                        console.log("3");
                    }
                }

                console.log("4");
                
                for(i = 0 ; i < user2result.length; i++){
                    if(user2result[i].user2 == req.session.username){ //will get the user1 attribute
                        var messageSnippetID2 = user2result[i].messages[user2result[i].messages.length - 1];
                        var username = user2result[i].user1;
                        
                        console.log("5");

                        messagesModel.findOne({_id: messageSnippetID2 },   function(err, latestMessage){
                    
                            console.log("6");
                            console.log("latestMessage 2nd: " + latestMessage);
                            var messageSnippet = latestMessage.message;
                            var snippetDate = latestMessage.date;

                            var user2filteredresultdetails = {
                                username : username,
                                messageSnippet : messageSnippet,
                                snippetDate: snippetDate
                            }
                            user2filteredresult.push(user2filteredresultdetails);
                            collectiveFilteredResult.push(user2filteredresultdetails);
                            console.log("user2filteredresult: " + JSON.stringify(user2filteredresult));
                            console.log("collectiveFilteredResult: " + JSON.stringify(collectiveFilteredResult));

                            console.log("7");
                        })
                    }
                }
                console.log("8!!");

                

                

                    
                
                // var msg = {
                //     user1: user1result[0].user1
                // }

                res.render("messages");
            });
        });

        
    },

    getMessageByUsername: function(req, res){

        
    }

}

module.exports = messageController;