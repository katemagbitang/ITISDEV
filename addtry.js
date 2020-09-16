const db = require('./model/db.js');
const mongodb = require('./model/mongodb.js');
const ObjectId = require('mongodb').ObjectID;


const userCollections = 'users';
const messageCollections = 'messages';
const messageHistoryCollections = 'messageshistories';
const authorCollections = 'authors';
const booksCollections = 'books';
const bookVersionsCollections = 'bookversions';
const requestsCollections = 'requests';
const cartItemsCollections = 'cartitems';
const ordersCollections = 'orders';
const orderItemsCollections = 'orderitems';
const paymentDetailsCollections = 'paymentdetails'

// it will error IF the collection doesn't exist in the first place
// it if errors, just run addtry.js again
mongodb.dropCollection(userCollections);
mongodb.dropCollection(messageCollections);
mongodb.dropCollection(messageHistoryCollections);
mongodb.dropCollection(authorCollections);
mongodb.dropCollection(booksCollections);
mongodb.dropCollection(bookVersionsCollections);
mongodb.dropCollection(requestsCollections);
mongodb.dropCollection(cartItemsCollections);
mongodb.dropCollection(ordersCollections);
mongodb.dropCollection(orderItemsCollections);
mongodb.dropCollection(paymentDetailsCollections);
// end of note



var user = [
    {
        _id : ObjectId(),
        username: "seanxnieva",
        email: "sean@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", //"secret"
        firstName: "sean",
        lastName: "nieva",
        userType: "Admin",
        lastLogin: new Date("2020-09-01T10:13:19.873+00:00")
    },
    {
        _id : ObjectId(),
        username: "katemagbitang",
        email: "kate@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "Kate",
        lastName: "Magbitang",
        userType: "Admin",
        lastLogin: new Date("2020-08-30T10:13:19.873+00:00")
    }
    ,
    {
        _id : ObjectId(),
        username: "shimeizhang08",
        email: "shimei@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "Shimei",
        lastName: "Zhang",
        userType: "Admin",
        lastLogin: new Date("2020-08-30T10:13:19.873+00:00")
    }
    ,
    {
        _id : ObjectId(),
        username: "oninolan",
        email: "onin@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "Olan",
        lastName: "Onin",
        userType: "Admin",
        lastLogin: new Date("2020-08-30T10:13:19.873+00:00")
    },
    {
        _id : ObjectId(),
        username: "johnsmith",
        email: "john@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "john",
        lastName: "smith",
        userType: "Regular",
        lastLogin: new Date("2020-08-27T10:13:19.873+00:00")
    },
    {
        _id : ObjectId(),
        username: "bobjohnson",
        email: "bob@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "bob",
        lastName: "johnson",
        userType: "Regular",
        lastLogin: new Date("2020-08-28T10:13:19.873+00:00")
    },
    {
        _id : ObjectId(),
        username: "willowsmith",
        email: "willow@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "willow",
        lastName: "smith",
        userType: "Regular",
        lastLogin: new Date("2020-08-30T10:13:19.873+00:00")
    }
]

mongodb.insertMany(userCollections, user);

var messages = [
    { // [0]
        _id : ObjectId(),
        sender: "willowsmith",
        receiver: "seanxnieva",
        message: "okay si willow smith ito 1",
        date: Date(),
        read: "Read"
    },
    {// [1]
        _id : ObjectId(),
        sender: "seanxnieva",
        receiver: "willowsmith",
        message: "si seanxnieva ito 1",
        date: Date(),
        read: "Read"
    },
    {// [2]
        _id : ObjectId(),
        sender: "willowsmith",
        receiver: "seanxnieva",
        message: "okay si willow smith ito 2",
        date: Date(),
        read: "Read"
    },
    {// [3]
        _id : ObjectId(),
        sender: "willowsmith",
        receiver: "seanxnieva",
        message: "okay si willow smith ito 3",
        date: Date(),
        read: "Read"
    },
    {// [4]
        _id : ObjectId(),
        sender: "johnsmith",
        receiver: "seanxnieva",
        message: "okay si john smith ito 2",
        date: Date(),
        read: "Read"
    },
    {// [5]
        _id : ObjectId(),
        sender: "seanxnieva",
        receiver: "johnsmith",
        message: "Hello, ask ko lang po yung.. jk kaxadskjfga ok test test lorem ipsum",
        date: Date(),
        read: "Read"
    }

]
mongodb.insertMany(messageCollections, messages);

var messageHistory = [
    {
        _id: ObjectId(),
        user1: "seanxnieva",
        user2: "willowsmith",
        messages: [
            messages[0]._id,
            messages[1]._id,
            messages[2]._id,
            messages[3]._id
        ]
    },
    {
        _id: ObjectId(),
        user1: "johnsmith",
        user2: "seanxnieva",
        messages: [
            messages[4]._id,
            messages[5]._id
        ]
        
    }

]

mongodb.insertMany(messageHistoryCollections, messageHistory);


var authors = [
    {
        // [0]
        _id: ObjectId(),
        aName: "J.K. Rowling"
    },
    {
        // [1]
        _id: ObjectId(),
        aName: "Elaine F. Weiss"
    },
    {
        // [2]
        _id: ObjectId(),
        aName: "Jay Shetty"
    },
    {
        // [3]
        _id: ObjectId(),
        aName: "Chrissy Teigen"
    },
    {
        // [4]
        _id: ObjectId(),
        aName: "Adeena Sussman"
    },
    {
        // [5]
        _id: ObjectId(),
        aName: "Brit Barron"
    },
    {
        // [6]
        _id: ObjectId(),
        aName: "Rachel Hollis"
    },
    {
        // [7]
        _id: ObjectId(),
        aName: "Kate Davies"
    },
    {
        // [8]
        _id: ObjectId(),
        aName: "Theodore Gray"
    },
    {
        // [9]
        _id: ObjectId(),
        aName: "Alan Finger"
    },
    {
        // [10]
        _id: ObjectId(),
        aName: "Peter Ferko"
    },
    {
        // [11]
        _id: ObjectId(),
        aName: "Shamash Alidina"
    },
    {
        // [12]
        _id: ObjectId(),
        aName: "Colleen Hoover"
    },
    {
        // [13]
        _id: ObjectId(),
        aName: "Guy Jackson"
    },
    {
        // [14]
        _id: ObjectId(),
        aName: "Celia Farrar"
    },
    {
        // [15]
        _id: ObjectId(),
        aName: "Veronica Ruth"
    }

]
mongodb.insertMany(authorCollections, authors);

var books = [
    {
        // [0]
        book_ID: ObjectId(),
        title: "Harry Potter and the Sorcerer's Stone",
        author : [
            authors[0]._id
        ],
        publisher: "Scholastic Inc",
        year : 2003 ,
        category: "Fantasy",
        bookSynopsis: "Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard. A mysterious visitor rescues him from his relatives and takes him to his new home, Hogwarts School of Witchcraft and Wizardry."
    },
    {
        // [1]
        book_ID: ObjectId(),
        title: "The Woman's Hour: Our Fight for the Right to Vote",
        author : [
            authors[1]._id
        ],
        publisher: "Random House Books for Young Readers",
        year: 2020 ,
        category: "History",
        bookSynopsis: "American women are so close to winning the right to vote. They've been fighting for more than seventy years and need approval from just one more state. But suffragists face opposition from every side, including the \"Antis\"--women who don't want women to have the right to vote. It's more than a fight over politics; it's a debate over the role of women and girls in society, and whether they should be considered equal to men and boys."
    },
    {
        // [2]
        book_ID: ObjectId(),
        title: "Think Like a Monk",
        author : [
            authors[2]._id
        ],
        publisher: "Simon and Schuster ",
        year : 2020 ,
        category: "Self-Help",
        bookSynopsis: "Jay Shetty, social media superstar and host of the #1 podcast On Purpose, distills the timeless wisdom he learned as a monk into practical steps anyone can take every day to live a less anxious, more meaningful life."
    },
    {
        // [3]
        book_ID: ObjectId(),
        title: "Cravings: Hungry for More",
        author : [
            authors[3]._id,
            authors[4]._id,
        ],
        publisher: "Clarkson Potter",
        year :  2018,
        category: "Cooking",
        bookSynopsis: "Cravings: Hungry for More takes us further into Chrissy’s kitchen…and life. It’s a life of pancakes that remind you of blueberry pie, eating onion dip with your glam squad, banana bread that breaks the internet, and a little something called Pad Thai Carbonara. After two years of parenthood, falling in love with different flavors, and relearning the healing power of comfort food, this book is like Chrissy’s new edible diary: recipes for quick-as-a-snap meals; recipes for lighter, brighter, healthier-ish living; and recipes that, well, are gonna put you to bed, holding your belly. And it will have you hungry for more. "
    },
    {
        // [4]
        book_ID: ObjectId(),
        title: "Worth It: Overcome Your Fears and Embrace the Life You Were Made For",
        author : [
            authors[5]._id,
            authors[6]._id
        ],
        publisher: "Broadleaf Books",
        year : 2020 ,
        category: "Memoir",
        bookSynopsis: "Brit Barron grew up in an Evangelical megachurch in the '90s, trying to fit neatly inside the boundaries her church and its narrow view of God had placed around her. She was boxed in by her fears, unable to realize her full potential. All that changed when she met a girl named Sami, fell in love, and chose to leave behind those narrow boundaries in favor of a fuller and more vibrant life."
    }
]

mongodb.insertMany(booksCollections, books);


var bookVersions = [
    {
        //[0]
        bookVersion_ID: ObjectId(),
        book_ID: books[0].book_ID,
        priceBought: 360.00,
        sellingPrice: 539.00,
        quality: "New",
        edition: "Library Edition",
        type: "Hardcover",
        quantity: 5,
        bookCover: "../img/Harry Potter and the Sorcerer's Stone.jpg"
    },
    {
        //[1]
        bookVersion_ID: ObjectId(),
        book_ID: books[1].book_ID,
        priceBought: 550.00,
        sellingPrice: 699.99,
        quality: "New",
        edition: "1st Hardcover Edition",
        type: "Hardcover",
        quantity: 12,
        bookCover: "../img/The Womans Hour Our Fight for the Right to Vote.jpg"
    },
    {
        //[2]
        bookVersion_ID: ObjectId(),
        book_ID: books[2].book_ID,
        priceBought: 590.00,
        sellingPrice: 799.00,
        quality: "New",
        edition: "1st Hardcover Edition",
        type: "Hardcover",
        quantity: 3,
        bookCover: "../img/Think Like a Monk.jpg"
    },
    {
        //[3]
        bookVersion_ID: ObjectId(),
        book_ID: books[3].book_ID,
        priceBought: 400.00,
        sellingPrice: 569.00,
        quality: "New",
        edition: "1st Hardcover Edition",
        type: "Hardcover",
        quantity: 10,
        bookCover: "../img/Cravings Hungry for More.jpg"
    },
    {
        //[4]
        bookVersion_ID: ObjectId(),
        book_ID: books[4].book_ID,
        priceBought: 780.00,
        sellingPrice: 929.99,
        quality: "New",
        edition: "1st Hardcover Edition",
        type: "Hardcover",
        quantity: 2,
        bookCover: "../img/Worth It Overcome Your Fears and Embrace the Life You Were Made For.jpg"
    }

]


mongodb.insertMany(bookVersionsCollections, bookVersions);


var requests = [
    { // [0]
        request_ID : ObjectId(),
        username: "johnsmith",
        // bookversion_ID: bookVersions[0].bookVersion_ID,
        book_title: "Rogue One: A Star Wars Story",
        book_author: "Alexander Freed",
        isUrgent: "Yes",
        maxPrice: 1000.00,
        description: "Hard Cover version",
        date_requested: new Date("2020-08-30T10:13:19.873+00:00"),
        status: "Active",
        priority_rating: 0.034,
        quantity: 1,
        override: false,
        //notifications: 
        ignored_notif_count: 0 
    },
    { // [1]
        request_ID : ObjectId(),
        username: "seanxnieva",
        // bookversion_ID: bookVersions[1].bookVersion_ID,
        book_title: "The Art of Moana",
        book_author: "Jessica Julius & Maggie Malone",
        isUrgent:"No",
        maxPrice: 1000.00,
        description: "none",
        date_requested: new Date("2020-09-01T10:13:19.873+00:00"),
        status: "Active",
        priority_rating: 0.034,
        quantity: 2,
        override: false,
        //notifications:
        ignored_notif_count: 0,
    },
    { // [2]
        request_ID : ObjectId(),
        username: "willowsmith",
        // bookversion_ID: bookVersions[2].bookVersion_ID,
        book_title: "Gordon Ramsay's Ultimate Cookery Course",
        book_author: "Gordon Ramsay",
        isUrgent:"No",
        maxPrice: 1500.00,
        description: "none",
        date_requested: new Date("2020-09-02T10:13:19.873+00:00"),
        status: "Active",
        priority_rating: 0.034,
        quantity: 2,
        override: false,
        //notifications:
        ignored_notif_count: 0,
    },
    { // [3]
        request_ID : ObjectId(),
        username: "bobjohnson",
        // bookversion_ID: bookVersions[3].bookVersion_ID,
        book_title: "On the Nature and Existence of God",
        book_author: "Richard M. Gale",
        isUrgent:"No",
        maxPrice: 1000.00,
        description: "none",
        date_requested: new Date("2020-09-05T10:13:19.873+00:00"),
        status: "Active",
        priority_rating: 0.034,
        quantity: 1,
        override: false,
        //notifications:
        ignored_notif_count: 0,
    },
    { // [4]
        request_ID : ObjectId(),
        username: "willowsmith",
        // bookversion_ID: bookVersions[4].bookVersion_ID,
        book_title: "The Art of Moana",
        book_author: "Janet Campbell",
        isUrgent:"No",
        maxPrice: 1000.00,
        description: "none",
        date_requested: new Date("2020-09-07T10:13:19.873+00:00"),
        status: "Active",
        priority_rating: 0.034,
        quantity: 1,
        override: false,
        //notifications:
        ignored_notif_count: 0,
    },
    { // [5]
        request_ID : ObjectId(),
        username: "willowsmith",
        // bookversion_ID: bookVersions[4].bookVersion_ID,
        book_title: "The Art of Moana",
        book_author: "Janet Campbell",
        isUrgent:"No",
        maxPrice: 1000.00,
        description: "none",
        date_requested: new Date("2020-09-09T10:13:19.873+00:00"),
        status: "Cancelled",
        priority_rating: 0.034,
        quantity: 1,
        override: false,
        //notifications:
        ignored_notif_count: 0,
    },
    { // [6]
        request_ID : ObjectId(),
        username: "willowsmith",
        // bookversion_ID: bookVersions[4].bookVersion_ID,
        book_title: "The Art of Moana",
        book_author: "Jessica Julius & Maggie Malone",
        isUrgent:"Yes",
        maxPrice: 1000.00,
        description: "none",
        date_requested: new Date("2020-09-12T10:13:19.873+00:00"),
        status: "Cancelled",
        priority_rating: 0.034,
        quantity: 1,
        override: false,
        //notifications:
        ignored_notif_count: 0,
    },
    { // [6]
        request_ID : ObjectId(),
        username: "willowsmith",
        // bookversion_ID: bookVersions[4].bookVersion_ID,
        book_title: "The Art of Moana",
        book_author: "Jessica Julius & Maggie Malone",
        isUrgent:"Yes",
        maxPrice: 1000.00,
        description: "none",
        date_requested: new Date(),
        status: "SoonExpiring",
        priority_rating: 0.034,
        quantity: 1,
        override: false,
        //notifications:
        ignored_notif_count: 0,
    }
    
]
mongodb.insertMany(requestsCollections, requests);



var cartItems = [
    {
        // [0]
        CartItems_ID: ObjectId(),
        username: "willowsmith",
        items: [
            {
                bookVersion: bookVersions[0].bookVersion_ID,
                quantity: 1
            },
            {
                bookVersion: bookVersions[1].bookVersion_ID,
                quantity: 2
            },
            {
                bookVersion: bookVersions[2].bookVersion_ID,
                quantity: 2
            }
        ],
        isActive: true
    },
    {
        // [1]
        CartItems_ID: ObjectId(),
        username: "willowsmith",
        items: [
            {
                bookVersion: bookVersions[3].bookVersion_ID,
                quantity: 1
            },
            {
                bookVersion: bookVersions[4].bookVersion_ID,
                quantity: 2
            }
        ],
        isActive: false
    },
    {
        // [2]
        CartItems_ID: ObjectId(),
        username: "willowsmith",
        items: [
            {
                bookVersion: bookVersions[0].bookVersion_ID,
                quantity: 2
            }
        ],
        isActive: false
    },
    {
        // [3]
        CartItems_ID: ObjectId(),
        username: "willowsmith",
        items: [
            {
                bookVersion: bookVersions[1].bookVersion_ID,
                quantity: 2
            }
        ],
        isActive: false
    },
    {
        // [4]
        CartItems_ID: ObjectId(),
        username: "willowsmith",
        items: [
            {
                bookVersion: bookVersions[2].bookVersion_ID,
                quantity: 2
            }
        ],
        isActive: false
    },
    {
        // [5]
        CartItems_ID: ObjectId(),
        username: "willowsmith",
        items: [
            {
                bookVersion: bookVersions[3].bookVersion_ID,
                quantity: 3
            }
        ],
        isActive: false
    }
]

mongodb.insertMany(cartItemsCollections, cartItems);


var Orders = [
    {
        // [0]
        order_ID: ObjectId(),
        username: "willowsmith",
        status: "Pending"
    },
    {
        // [1]
        order_ID: ObjectId(),
        username: "willowsmith",
        status: "Cancelled"
    },
    {
        // [2]
        order_ID: ObjectId(),
        username: "willowsmith",
        status: "Processing"
    },
    {
        // [3]
        order_ID: ObjectId(),
        username: "willowsmith",
        status: "Confirmed"
    },
    {
        // [4]
        order_ID: ObjectId(),
        username: "willowsmith",
        status: "Pending"
    }

]
mongodb.insertMany(ordersCollections, Orders);

var OrderItems = [
    {
        // [0]
        OrderItems_ID : ObjectId(),
        order_ID : Orders[0].order_ID,
        CartItems_ID: cartItems[1].CartItems_ID
    },
    {
        // [1]
        OrderItems_ID : ObjectId(),
        order_ID : Orders[1].order_ID,
        CartItems_ID: cartItems[2].CartItems_ID
    },
    {
        // [2]
        OrderItems_ID : ObjectId(),
        order_ID : Orders[2].order_ID,
        CartItems_ID: cartItems[3].CartItems_ID
    },
    {
        // [3]
        OrderItems_ID : ObjectId(),
        order_ID : Orders[3].order_ID,
        CartItems_ID: cartItems[4].CartItems_ID
    },
    {
        // [4]
        OrderItems_ID : ObjectId(),
        order_ID : Orders[4].order_ID,
        CartItems_ID: cartItems[5].CartItems_ID
    }

]
mongodb.insertMany(orderItemsCollections, OrderItems);

var paymentDetails = [
    {
        payment_ID: ObjectId(),
        username: "willowsmith",
        order_ID: Orders[0].order_ID,
        status: "Pending",
        bank_name: "BPI",
        ref_num: "11812345678",
    }
]

mongodb.insertMany(paymentDetailsCollections, paymentDetails);