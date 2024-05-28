## _Engineering Documentation for:_
# CurateWeb

CurateWeb Database is a simple, mobile-ready, Node.js- and MongoDB- powered web app featuring a curated collection of free online materials for learning web development.
![Screenshot from 2024-05-27 21-31-42](https://github.com/mrzamin/top-search/assets/142754418/225db719-22c1-4d62-b1ce-9580972e9774)


## Rationale
With my new-found knowledge of server-side rendering and routing, I thought I'd take my homework of creating a [basic app](https://www.theodinproject.com/lessons/nodejs-members-only) one step further and create something useful and meaningful. While [The Odin Project resources](https://www.theodinproject.com/) have been great for learning full-stack web development, the curriculum is by no means a one-size-fits-all or comprehesive deal, and I frequently found myself having to fill in small and large gaps with resources outside of their curriculum. Why not build something useful for others and share some hidden web development gems I've uncovered? 

The mission of this app is to serve people with a simple, convenient, and curated database containing links to current and relevant web development resources. It will contain the best external resources I've used in addition to The Odin Project resources. Given the CRUD project requirements noted in the Background section [below](#Background) non-logged in guests visiting the site will also be able to add resources to the database. 

The website will also exist to address a current problem of The Odin Project's website: **the lack of search feature**. Their curriculum is large, and I often found myself wanting to reference an article/video/documentation from weeks or months ago... but I couldn't remember in which lesson it was or even the name it had. A quick Google search using key words was often faster than trying to go through the long Odin lessons to find it. Hence, I plan to implement text search into this app. The full list of planned features is below. 

## Background
This project effectively combines two smaller backend projects (the [inventory app](https://www.theodinproject.com/lessons/nodejs-inventory-application) and [members only app](https://www.theodinproject.com/lessons/nodejs-members-only)) from The Odin Project into one larger one for quality over quantity. 

For the inventory app, the designated learning outcomes are:
- Express App basics
-  CRUD and HTTP
-  MVC (routes, controllers, view template engines)
-  Handling forms
-  Deployment with a PaaS

For the members only app, user authentication using the Passport Local Strategy and security configuration via environment variables are added to the list of requirements. 

## Non-Goals
- Non-logged in guests visiting the site will not be able to remove or update items in the database. Only the Admin User/Website Owner will be able to update and delete resources, add new subjects, or add new resource types. 

- This is a backend-based project that will not have a frontend. In the future, I may integrate the Node API for this project with a frontend framework once I am comfortable with combining frontend and backend frameworks effectively. For now, this project purely focuses on the backend concepts.

## Table of Contents
<!--ts-->
   * [Project](#Project)
      * [Goals](#Goals)
      * [Plans for feature feedback](#plans-for-feature-feedback)
   * [UI](#ui)
      * [Research](#Research)
      * [Componentization](#Componentization)
      * [Design](#Design)
      * [Page design](#Page-design)
   * [Engineering](#Engineering)
     * [Architecture](#Architecture)
        * [Frontend](#Frontend)
        * [Backend](#Backend)
        * [Database](#Database)
           * [Schema](#Schema)
           * [ODM](#ODM)
      * [Testing](#Testing)
      * [Deployment](#Deployment)
  * [Tech](#Tech)

<!--te-->

## Project
### Goals
MVP:
- Visitors can view lists and detailed views of resources, authors, types
- Vistors can add new resources to the database
- Vistors can click a URL link to navigate to the external resource (article, documentation, video, etc.)
- Admin users can add, remove, update, and delete items from the database
- Admin users can access an admin dashboard with a data collection summary
- Users can quickly reference a resource using text search

Nice-to-haves:
- Resource voting/rankings (potentially using a third-party package)
- Resource comments section
- Users must login to leave a comment and view all comments
- Frontend integration
  
### Plans for feature feedback
- Gather feedback from Kan
- Gather feedback from Odin Discord

## UI

### Research

This website will be distributed with friends, family, and peers who will likely access it for the first time on mobile phones. Hence for this app, I specifically wanted to implement a mobile-first design. It was a good opportunity to practicing doing it with vanilla CSS and HTML, given that this is a backend-focused project where the UI styles are intentionally simplistic. The site does not have much reactive complexity; the values are plugged server-side into a template to serve the HTML to the client. I have previous experience with responsive design, but not mobile-first, so I decided to research it. The mobile-first approach simply means coding the website with mobile screen sizes in mind at the start. Media queries are used to achieve this.

### Componentization

I chose Pug as my template engine of choice over others -- like EJS -- due to their concise and intuitive indentation. 

Located in `views`:

- `admin_dashboard.pug`: Admin Dashboard with data summary and quick links
- `*_detail.pug`: Detail View for an item (resource, author)
- `*_list.pug`: List View for an item (resource, author, type, subject)
- `*_form.pug`: Create Form for an item (resource, author, type, subject)
- `*_delete.pug`: Delete Form for an item (resource, author, type, subject)
-  `user_create_form.pug`: Register Form for users and admins
-  `user_login_form.pug`: Login Form for users and admins
-  `index.pug`: Homepage
-  `error.pug`: Errorpage

### Design
#### Inspiration:
- [Symbolset](https://symbolset.com/)
- [goodbooks.io](https://www.goodbooks.io/)

#### Logo - Colors - Fonts:
- [Logo](https://www.canva.com/design/DAGFyETaigg/kAHnBVUu4k918FyfcgyHpg/edit?utm_content=DAGFyETaigg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- Primary: #F7F6F1
- Secondary: #1F4D8F
- [Font](https://fonts.google.com/specimen/Montserrat+Alternates)

### Page Design
- [X] Homepage
- [X] Admin Dashboard
- [ ] Detail Pages
- [ ] List Pages
- [ ] Sign-up Page
- [ ] Login Page
- [ ] Error Page


![Screenshot from 2024-05-28 00-07-04](https://github.com/mrzamin/top-search/assets/142754418/e17c9b48-5512-49fd-a08f-086f607f6b22)


## Engineering
### Architecture
I use the Model-View-Controller (MVC) architectural/design framework for separating out my Express application into logical components. The advantage of MVC is that it creates a clear division between the user interface, data store, and application logic. Every type of entry in the database (Resource, Author, Type, and Subject) has its own **model** that holds the data logic of that type of entry. Similarly, each of the various pages (login form, admin dashboard, resource list, etc. ) of the website are represented and created with a **view**: a component that generates the UI with data supplied by the controllers. Finally, my **controllers** are components that get called upon whenever a user makes a GET request to my application. These controllers act as the intermediaries between the models and views; they use the details of the request to determine which view is shown to the user.

Other advantages of MVC for software development include reusability, scalability, and testability.

### Frontend
This is a backend-focused project, so there is no frontend for this app. At the time of writing, I am new to backend development and am therefore focused on backend concepts here. 

### Backend
For my app's backend, the Express Web Framework was chosen due to my familiarity with programming using JavaScript as well as Express's simplification of development processes of Node.js applications. Express is a very popular framework according to [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#introducing_express) and is therefore well-supported and well-documented. Additionally, there is an abundance of third-party middleware packages available to Express apps that make the development process easier or better. 

### Database
When it comes to choosing databases, the general idea is to choose the best fit for whatever you are working on. My application has several models: Resource, Author, Type, and Subject. Authors, types, and subjects can have multiple resources, and resources can have multiple subjects. My database choice therefore has to model **many-to-many** relationships, for which a SQL database would be a good choice. However, this app uses a NoSQL database, MongoDB, since I'm following [The Odin Project's learning path](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs) where MongoDB is used. 

For a small-to-medium app like this one, the choice to use MongoDB is acceptable and provides an opportunity to learn about NoSQL databases, specifically document stores. However, a relational database like MySQL or PostgreSQL would have been a better fit. 

### Schema
- Think about data I need to store and the relationships between the different objects
   - subject, author, resource, and type of material it is
- Have a separate model for every “object” — group of related information
- Diagram that shows the relationship between the models and their multiplicities

#### Database Models 
The intitial plan for the database models is below. (A User model was added later to accommodate user login and authentication.)
![database-models](https://github.com/mrzamin/top-search/assets/142754418/5c2a5c2c-4da3-416e-8eb2-915bd8371b26)

#### User Model
![Screenshot from 2024-05-27 21-05-43](https://github.com/mrzamin/top-search/assets/142754418/1e490874-bdba-45ee-8eb9-628ffafe3fd7)


#### ODM
Mongoose, an object modeling tool (ODM) for MongoDB, is used to map the JavaScript objects in my code to the underlying database. It helps me focus on implementing my application features rather than database semantics:

```sh
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean,
});
module.exports = mongoose.model("User", UserSchema);

```

### Testing
Not yet implemented.

### Deployment
Not yet implemented.

## Tech
- Languages: Node.js, HTML, and CSS
- Web Framework: Express
- UI Library: N/A
- Styling: Global stylesheet
- Build Tool:
- Deployment:
- Dependencies/middlewares:
  - bcryptjs
  - connect-mongo
  - cookie-parser
  - debug
  - dotenv
  - express
  - express-async-handler
  - express-session
  - express-validator
  - http-errors
  - mongoose
  - morgan
  - passport
  - passport-local
  - pug
  - validator











