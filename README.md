# Chapter One Online Store (ITISDEV Project)
Chapter One is a fictional bookstore located at Leon Guinto. This web application aims to support the selling and the marketing of the bookstore as they struggle to operate during this pandemic.
## How to run the web application
### Option 1: Deployed Link
https://chapterone-itisdevs19.herokuapp.com/home
### Option 2: Running locally
#### Follow the steps below to set-up :
1. Clone the repository either by downloading the contents of the repository [here](https://github.com/katemagbitang/ITISDEV), or using the command below (Note: git should be installed in your system for this to work).
```
git clone https://github.com/katemagbitang/ITISDEV.git

```
2. Open Command Prompt
3. Navigate to the project folder - the folder containing the contents of the cloned or downloaded repository.
4. Run the command `npm install` to initialize and install all necessary modules used in the project.
5. Run the command `node addtry.js` to initialize the initial data in the mongodb.
6. We may now run our server. To do this, we run the command `node index.js`. Upon running the command, your Command Prompt should display the following statement:
7. Go to http://localhost:9090/.
```
Listening at port: 9090
Connected to Database: mongodb://localhost:27017/chapterone
```
## Running the tests

### User Features
#### Create User Account
Click on **Sign Up** and fill in the necessary information. All new users will be given a **Regular** user type.
#### Login Account
Login using the username and password you used to register, or choose one of the following to log in:
| Username | Password | Type |
| ----------- | ----------- | ----------- |
| seanxnieva | secret | Admin |
| katemagbitang | secret | Admin |
| willowsmith | secret | Regular |
#### Edit Profile
Click **Edit Profile** and fill in the necessary information that you would want to change. Note that you are not allowed to change your username.
#### Logout
Click **Logout** located at **Profile**.

### Admin User Features
These features are only applicable to the Admin users.
#### Add Products
Click **Add Products** located on the navigation bar. Fill Up the necessary information about the new book to be added to the store. Once done, click **Add Product** to add the item.
#### Confirm Payment
Click **Orders** located on the navigation bar. On the **Payment Processing** tab, you will see all the orders that have a proof of payment for confirmation. Select either **Confirm** or **Reject** depending on the validity of the payment made. 
#### Generate Sales Report
Click **Sales** located on the navigation bar. Input the start and end dates where you want to see the list of confirmed orders made during the range given. Once done, click **Submit**.
#### Fulfill Request
If the book is unavailable in the system, the admin must perform **Add Products** first before fulfilling the requested books. Click **Book Requests** and click on the **Fulfill** button to fulfill the requested books. To fulfill the requested books, on the right, you should find the exact title of the book requested. If the specific book pops up, copy the **bookVersion_ID** and paste it on the left, where you have to place the ID of the book. Once done, click **Send**.
#### Override Automatic Cancellation of Request
Click **Book Requests** and click on the **Override** button to override the automatic cancellation of the requested books.

### Store Features 
#### Add to Cart
Regular users can add tp cart in three (3) ways:
1. From **Browse Books**, choose a book and press **Add to Cart**. This will add one copy of the book to your cart.
2. From **Browse Books**, click on a specific book. You will be directed to the specific book's page. You may adjust the quantity of copies you want to buy from here. Click **Add to Cart** to add the book/s to your cart.
3. From the **Home page**, click on a specific book. You will be directed to the specific book's page. You may adjust the quantity of copies you want to buy from here. Click **Add to Cart** to add the book/s to your cart.
#### Remove Item from Cart
From **Cart**, click the **Remove** button to remove the item from the cart. 
#### Checkout Cart
From **Cart**, on the right side, fill up the form for your name, contact number, and billing address. Once this is done, and after reading about the payment details, click **Checkout/Pay**.
#### Send Payment Details
Click on **My Orders** located at the navigation bar. On the **To Pay** tab, click **Send Payment**. Select the bank, input the reference/official receipt number, and attach a picture of the receipt. Click **Send** once done.
#### Send Private Message
Click **Messages** on the navigation bar. If it is your first time to message an admin, click on the :memo: icon, and place any admin username as a recipient. Afterwards, input your message below. Click **Send** once done. If you had a history of messaging one of the admins already, click on your conversation on the left to view the whole conversation. You may now input your message at the bottom and click the **Send (paper airplane)** button.
#### Request a Book
On the navigation bar, click **Book Requests** and select **Request a Book**. Input the necessary details, tick the **Urgent** checkbox if necessary, and click **Submit** once done.

### System Feature
#### Notify to Update Interest on Required Book
The user will be notified every two weeks, if they are still interested in the requested book. This will be seen in **Notifications** on the navigation bar.

## Dependencies
- Assert
- AWS-SDK
- Bcrypt
- Body Parser
- Connect-Mongo
- Express
- Express Handlebars
- Express Session
- Express Validator
- HBS
- Moment
- MongoDB
- Mongoose
- Multer
- Multer-S3
- Nodejs
- Path

## Authors
- Julianne Magbitang
- Sean Nieva
- Gabriel Olan
- Shimei Zhang
