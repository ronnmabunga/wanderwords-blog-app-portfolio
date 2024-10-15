# Application Info:

## Application Name: WanderWords

## Primary Features:

-   A Blog Website where users can make their own blog posts, and comment on existing posts.

# Technical Features:

-   All users can view all posts and comments, contact the admin through a form, and post comments.
-   Non-authenticated users can register and login.
-   Authenticated users can logout, post blogs, update their own posts, delete their own posts, and edit their own comments.
-   Admins can delete any blog posts, and delete any comments.

# Prepared Accounts:

## Non-admin Credentials

-   `{ "email": "user@mail.com", "password": "pAs$w0rd" }`
-   `{ "email": "user2@mail.com", "password": "pAs$w0rd" }`

## Admin Credentials

-   `{ "email": "admin@mail.com", "password": "pAs$w0rd" }`
-   `{ "email": "admin2@mail.com", "password": "pAs$w0rd" }`

# Server Route Info:

## Route: /users

### Endpoint: /register

-   Short description: Route for registration of users
-   Method: POST
-   Request must not contain a valid verifiable Bearer Token
-   Request Body Sample:
    -   `{ "email": "user@mail.com", "password": "pAs$w0rd" }`
        -   `email` must be a valid email according to w3.org standards
        -   `password` must be a string of 8-32chars long, at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character (~!@#$%^&\*()\_-+={[}]|\:;"'<,>.?/)
-   Response:
    -   On success: `{ success: "Registered Successfully" }`
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /login

-   Short description: Route for authentication of users
-   Method: POST
-   Request must not contain a valid verifiable Bearer Token
-   Request Body Sample:
    -   `{ "email": "user@mail.com", "password": "pAs$w0rd" }`
        -   `email` must be a valid email according to w3.org standards
-   Response:
    -   On success: `{ success: "User access granted.", access: <bearer_token> }`
        -   `bearer_token` is a string that contains a valid verifiable Bearer Token for the authenticated user
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /details

-   Short description: Route for retrieving user details
-   Method: GET
-   Request must contain a valid verifiable Bearer Token
-   Request Body Sample:
    -   No Request Body
-   Response:
    -   On success: `{ success: "User data found.", user: <user_details> }`
        -   `user_details` is a JS object that contains the details of the user retrieved from the database.
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

## Route: /blogs

### Domain:

-   https://wanderwords-blog-app-portfolio.onrender.com/

### Endpoint: /all

-   Short description: Route for retrieving all blog entries
-   Method: GET
-   Request may contain or not contain a valid verifiable Bearer Token
-   Request Body Sample:
    -   No Request Body
-   Response:
    -   On success: `{ success: "Blogs retrieved.", blogs: <blogs> }`
        -   `blogs` is a JS Array object that contains the all blog entries
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /:blogId

-   Short description: Route for retrieving a single blog entry
-   Method: GET
-   Request may contain or not contain a valid verifiable Bearer Token
-   Parameters:
    -   `blogId` is a valid Object ID that references an existing Blog instance on the database
-   Request Body Sample:
    -   No Request Body
-   Response:
    -   On success: `{ success: "Blog retrieved.", blog: <blog> }`
        -   `blog` is a JS object that contains the blog entry indicated by the Object ID in the parameter
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /

-   Short description: Route for retrieving all blog entries by the authenticated user
-   Method: GET
-   Request must contain a valid verifiable Bearer Token
-   Request Body Sample:
    -   No Request Body
-   Response:
    -   On success: `{ success: "Blogs retrieved.", blogs: <blogs> }`
        -   `blogs` is a JS Array object that contains the blog entries of the authenticated user
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /

-   Short description: Route for posting a new blog entry
-   Method: POST
-   Request must contain a valid verifiable Bearer Token
-   Request Body Sample:
    -   `{ "title": "Sample Title", "posterId": "6709168f57260bef131dfd1d", "posterEmail": "admin2@mail.com", "content":"Sample content.", "comments":[] }`
        -   `posterId`, `posterEmail`, `content`, and `comments` are optional fields.
        -   `title` is a string
        -   `email`, if provided, must be a valid email string according to w3.org standards
        -   `posterId` and `content`, if provided, are strings
        -   `comments`, if provided, is an array of JS objects with string properties `commenterId` and `comment`.
            -   `commenterId` is a valid Object ID that references an existing User instance
-   Response:
    -   On success: `{ success: "Blog created.", blog: <blog> }`
        -   `blog` is a JS object that represent the newly posted blog.
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /:blogId

-   Short description: Route for posting a new comment
-   Method: POST
-   Request must contain a valid verifiable Bearer Token
-   Parameters:
    -   `blogId` is a valid Object ID that references an existing Blog instance
-   Request Body Sample:
    -   `{ "comment": "Sample comment" }`
        -   `comment` is a string
-   Response:
    -   On success: `{ success: "Comment added.", blog: <blog> }`
        -   `blog` is a JS Array object that contains the blog entry wherein the new comment was posted on
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /:blogId

-   Short description: Route for updating a blog entry
-   Method: PATCH
-   Request must contain a valid verifiable Bearer Token
-   Parameters:
    -   `blogId` is a valid Object ID that references an existing Blog instance
-   Request Body Sample:
    -   `{ "title": "Sample Title", "posterId": "6709168f57260bef131dfd1d", "posterEmail": "admin2@mail.com", "content":"Sample content.", "comments":[] }`
        -   All fields are optional.
        -   `email`, if provided, must be a valid email string according to w3.org standards
        -   `title`, `posterId` and `content`, if provided, are strings
        -   `comments`, if provided, is an array of JS objects with string properties `commenterId` and `comment`.
            -   `commenterId` is a valid Object ID that references an existing User instance
-   Response:
    -   On success: `{ success: "Blog updated successfully", blog: <blog> }`
        -   `blog` is a JS Array object that contains the newly updated blog entry
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /:blogId

-   Short description: Route for deleting a blog entry
-   Method: DELETE
-   Request must contain a valid verifiable Bearer Token
-   Parameters:
    -   `blogId` is a valid Object ID that references an existing Blog instance
-   Response:
    -   On success: `{ success: "Blog deleted successfully", blog: <blog> }`
        -   `blog` is a JS Array object that contains the newly deleted blog entry
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

### Endpoint: /:blogId/:commentId

-   Short description: Route for deleting a comment
-   Method: DELETE
-   Request must contain a valid verifiable Bearer Token
-   Parameters:
    -   `blogId` is a valid Object ID that references an existing Blog instance
    -   `commentId` is a valid Object ID that references an existing comment instance
-   Response:
    -   On success: `{ success: "Comment deleted successfully", blog: <blog> }`
        -   `blog` is a JS Array object that contains the blog entry wherein the newly deleted comment was previously posted on
    -   On error: `{ error: <error_message> }`
        -   `error_message` is a string describing the cause of the error

# Client Route Info:

### Domain:

-   https://wanderwords-blog-app-portfolio.vercel.app/

### Endpoint: /

-   Home Page

### Endpoint: /register

-   User Registration Page

### Endpoint: /login

-   User Login Page

### Endpoint: /logout

-   User Logout Page

### Endpoint: /about

-   About Page

### Endpoint: /contact

-   Contact Page

### Endpoint: /search?query=:queryParam

-   Search By Query Page

### Endpoint: /posts

-   View All Blogs Page (Unauthenticated)
-   View All Own Blogs Page (Authenticated)

### Endpoint: /posts/new

-   Create New Post Page (Authenticated)

### Endpoint: /posts/:blogId

-   View Blog Post By ID Page

### Endpoint: /posts/feed

-   View All Blogs Page

### Endpoint: /authors

-   View Blogs Authors Page

### Endpoint: /authors/:userId

-   View Author Page

### Endpoint: /dashboard/posts

-   View All Blogs Page (Administrator)

### Endpoint: /dashboard/comments

-   View All Comments Page (Administrator)

### Endpoint: /dashboard/contact

-   View All Contact Form Messages Page (Administrator)
