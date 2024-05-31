#! /usr/bin/env node

console.log("This script populates data to your database");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Subject = require("./models/subject");
const ResourceDetail = require("./models/resourceDetail");
const ResourceType = require("./models/resourceType");
const Author = require("./models/author");

//Create arrays
const subjects = [];
const resources = [];
const types = [];
const authors = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createSubjects();
  await createTypes();
  await createAuthors();
  await createResources();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// I pass the index to the ...Create functions so that, for example,
// type[0] will always be the Article type, regardless of the order
// in which the elements of promise.all's argument complete.
async function typeCreate(index, name) {
  const type = new ResourceType({ type: name });
  await type.save();
  types[index] = type;
  console.log(`Added type: ${name}`);
}

async function authorCreate(index, name) {
  const author = new Author({ name: name });
  await author.save();
  authors[index] = author;
  console.log(`Added author: ${name}`);
}

async function resourceCreate(index, name, subject, author, type, href) {
  const resourcedetail = {
    name: name,
    subject: subject,
    author: author,
    type: type,
    href: href,
  };
  const resource = new ResourceDetail(resourcedetail);
  await resource.save();
  resources[index] = resource;
  console.log(`Added resource: ${name}`);
}

async function subjectCreate(index, name) {
  const subject = new Subject({ name: name });
  await subject.save();
  subjects[index] = subject;
  console.log(`Added subject: ${name}`);
}

//Add data in parallel

async function createTypes() {
  console.log("Adding types");
  await Promise.all([
    typeCreate(0, "Article"),
    typeCreate(1, "Documentation"),
    typeCreate(2, "Video"),
    typeCreate(3, "Audio"),
  ]);
}

async function createAuthors() {
  console.log("Adding Authors");
  await Promise.all([
    authorCreate(0, "Treehouse"),
    authorCreate(1, "TechTerms.com"),
    authorCreate(2, "Codeacademy"),
  ]);
}

async function createResources() {
  // index, name,subject, Author, type, href
  console.log("Adding resources");
  await Promise.all([
    resourceCreate(
      0,
      "Front-End vs. Back-End: The Complete Guide",
      subjects[0],
      authors[0],
      types[0],
      "https://blog.teamtreehouse.com/i-dont-speak-your-language-frontend-vs-backend"
    ),
    resourceCreate(
      1,
      "Backend",
      subjects[0],
      authors[1],
      types[0],
      "https://techterms.com/definition/backend"
    ),
    resourceCreate(
      2,
      "Back-End Web Architecture",
      subjects[0],
      authors[2],
      types[0],
      "https://www.codecademy.com/article/back-end-architecture"
    ),
  ]);
}

async function createSubjects() {
  console.log("Adding subjects");
  await Promise.all([
    subjectCreate(0, "Node"),
    subjectCreate(1, "React"),
    subjectCreate(3, "Advanced HTML & CSS"),
    subjectCreate(4, "Intermediate HTML & CSS"),
    subjectCreate(5, "JavaScript"),
    subjectCreate(6, "Foundations"),
    subjectCreate(7, "Getting Hired"),
  ]);
}
