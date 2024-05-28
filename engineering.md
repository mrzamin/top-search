## _Engineering Documentation for:_
# CurateWeb

CurateWeb Database is a simple, mobile-ready, Node.js- and MongoDB- powered web app featuring a curated collection of free online materials for learning web development.
![Screenshot from 2024-05-27 21-31-42](https://github.com/mrzamin/top-search/assets/142754418/225db719-22c1-4d62-b1ce-9580972e9774)


## Rationale
With my new-found knowledge of server-side rendering and routing, I thought I'd take my homework of creating a [basic app](https://www.theodinproject.com/lessons/nodejs-members-only) one step further and create something useful and meaningful. While [The Odin Project resources](https://www.theodinproject.com/) have been great for learning full-stack web development, the curriculum is by no means a one-size-fits-all or comprehesive deal, and I frequently found myself having to fill in small and large gaps with resources outside of their curriculum. Why not build something for others that shares some hidden web development gems I've uncovered? 

The mission of this app is to serve people with a simple, convenient, and curated database containing links to current and relevant web development resources. It will contain the best external resources I've used in addition to The Odin Project resources. Given the CRUD project requirements noted in the Background section below, non-logged in guests visiting the site will also be able to add resources to the database. 

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

## Terminology
## Non-Goals
Non-logged in guests visiting the site will not be able to remove or update items in the database. Only the Admin User/Website Owner will be able to update and delete resources, add new subjects, and add new resource types. 

This is a backend-based project that will not have a frontend. In the future, I may integrate the Node API for this project with a frontend framework once I am comfortable with combining frontend and backend frameworks effectively. For now, this project purely focuses on the backend concepts.

## Table of Contents
<!--ts-->
   * Project/Product
      * Goals
      * Plans for feature feedback
   * UI/UX
      * Research(#stdin)
      * UI/Componentization
      * Design
      * Plans for design feedback
   * Engineering
     * Architecture
        * Frontend/Client
        * Backend
        * Database
           * Schema
           * ORM/ODM
      * Testing
      * Deployment
<!--te-->

## Project/Product
### Goals
### Plans for feature feedback

## UI/UX
### Research(#stdin)
### UI/Componentization
### Design
### Plans for design feedback

## Engineering
### Architecture
I use the Model-View-Controller (MVC) architectural/design framework for separating out my Express application into logical components. The advantage of MVC is that it creates a clear division between the user interface, data store, and application logic. Every type of entry in the database (Resource, Author, Type, and Subject) has its own **model** that holds the data logic of that type of entry. Similarly, each of the various pages (login form, admin dashboard, resource list, etc. ) of the website are represented and created with a **view**: a component that generates the UI with data supplied by the controllers. Finally, my **controllers** are components that get called upon whenever a user makes a GET request to my application. These controllers act as the intermediaries between the models and views; they use the details of the request to determine which view is shown to the user.

Other advantages of MVC for software development include reusability, scalability, and testability.
### Frontend/Client
This is a backend-focused project, so there is no frontend for this app. At the time of writing, I am new to backend development and am therefore focused on backend concepts here. 

### Backend
For my app's backend, the Express Web Framework was chosen due to my familiarity with programming using JavaScript as well as Express's simplification of development processes of Node.js applications. Express is a very popular framework according to [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#introducing_express) and is therefore well-supported and well-documented. Additionally, there is an abundance of third-party middleware packages available to Express apps that make the development process easier or better. 

### Database
When it comes to choosing databases, the general idea is to choose the best fit for whatever you are working on. My application has several models: Resource, Author, Type, and Subject. Authors, types, and subjects can have multiple resources, and resources can have multiple subjects. My database choice therefore has to model **many-to-many** relationships, for which a SQL database would be a good choice. However, this app uses a NoSQL database, MongoDB, since I'm following [The Odin Project's learning path](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs) where MongoDB is used. 

For a small-to-medium app like this one, the choice to use MongoDB is acceptable and provides an opportunity to learn about NoSQL databases, specifically document stores. However, a relational database like MySQL or PostgreSQL would have been a better fit. 

### Schema
#### Database Models 
The intitial plan for the database models is below. (A User model was added later to accommodate user login and authentication.)
![database-models](https://github.com/mrzamin/top-search/assets/142754418/5c2a5c2c-4da3-416e-8eb2-915bd8371b26)

#### User Model
![Screenshot from 2024-05-27 21-05-43](https://github.com/mrzamin/top-search/assets/142754418/1e490874-bdba-45ee-8eb9-628ffafe3fd7)


#### ORM/ODM
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

#### 
### Testing
Not yet implemented.
### Deployment
Not yet implemented.

## Tech



## Progress Logs

## Milestones



| Plugin | README |
| ------ | ------ |
| Languages |  |
| Web Framework | Express |
| UI Library | N/A |
| Styling | Global stylesheet |
| Build Tool | |
| Deployment | |
| Dependencies |  



- Languages: Node.js, HTML, and CSS
- Web Framework: Express
- UI Library: N/A
- Styling: Global stylesheet
- Build Tool:
- Deployment:
- Dependencies:
- - bcryptjs
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
  - validator|

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.



This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
