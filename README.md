# Chapter One Online Store (ITISDEV Project)
Chapter One is a fictional bookstore located at Leon Guinto. This web application aims to support the selling and the marketing of the bookstore as they struggle to operate during this pandemic.
## How to run the web application
### Option 1: Deployed Link
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
These features are located at the top-right of the home page, which can be accessed through the navigation bar by clicking **Sign Up** (not logged in) or **Profile**.
#### Create User Account
Click on **SIGN UP** and fill in the necessary information. All new users will be given a **Regular** user type.
#### Login Account
Login using the username and password you used to register, or choose one of the following to log in:
| Username | Password | Type |
| ----------- | ----------- | ----------- |
| seanxnieva | secret | Admin |
| katemagbitang | secret | Admin |
| willowsmith | secret | Regular |
#### Edit Profile
Click **EDIT PROFILE** and fill in the necessary information that you would want to change.
> This feature edits only the **first** and **last name**, as well as the **password**. To the information that you want to maintain, please input your original information or go back to the Home page.
#### Logout
Click **LOGOUT** located at **Profile**.

### Admin User Features
These features are only applicable to the Admin users.
#### Add Product
Click **Add Product** located on the navigation bar. Fill Up the necessary information about the new book to be added to the store. 

### Store Features 
All the products are located at **Browse Books**. Featured books can also be seen at the homepage.
#### Add to Cart
There are three (3) ways to add to cart:
1. From **Browse Books**, choose a book and press **Add to Cart**. This will add one copy of the book to your cart.
2. From **Browse Books**, click on a specific book. You will be directed to the specific book's page. You may adjust the quantity of copies you want to buy from here. Click **Add to Cart** to add the book/s to your cart.

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
