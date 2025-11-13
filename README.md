## Security Notice
We take no responsibility for your data. This project is not a production ready project, it is for demonstration purposes only. Don't store real personal information in this system. 

# Description

MyBrokeLife is a RESTful API that allows users to manage their personal finances.
Users can log expenses and income, create categories, set monthly budgets, and view spending reports by category.
Each user will have their own secure data and be able to visualize trends in their financial activity through external tools or a frontend.

# Authentication
The API uses Google OAuth 2.0 for authentication.
Users will log in using their Google account, and their profile information (name, email, avatar) will be stored in the database.
Each request to protected routes will require a valid session or token, ensuring data isolation between users.

 


# Database
We use MongoDB Atlas (cloud-hosted) as our main database. You can use any MongoDB service assuming you connect it. 
We use Mongoose because it is easy to integrate MongoDB with Node.js through Mongoose. Mongoose supports flexible schemas, and scales well for document-based data like financial records.

# Frontends
There are currently no published frontends for the API. We have included thorough API docs so that you can build out a frontend if you want. The API will return a JWT or session cookie representing the authenticated user. You will just need to include this with your requests to authenticate to the endpoints. 

