#! /usr/bin/env node

console.log("This script populates data to your database");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Course = require("./models/course");
const ResourceDetail = require("./models/resourceDetail");
const ResourceType = require("./models/resourceType");
const Owner = require("./models/owner");

//Create arrays
const courses = [];
const resources = [];
const types = [];
const owners = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCourses();
  await createTypes();
  await createOwners();
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

async function ownerCreate(index, name) {
  const owner = new Owner({ owner: name });

  await owner.save();
  owners[index] = owner;
  console.log(`Added owner: ${name}`);
}

async function resourceCreate(index, name, course, owner, type, href) {
  const resourcedetail = {
    name: name,
    course: course,
    owner: owner,
    type: type,
    href: href,
  };
  const resource = new ResourceDetail(resourcedetail);
  await resource.save();
  resources[index] = resource;
  console.log(`Added resource: ${name}`);
}

async function courseCreate(index, name) {
  const course = new Course({ course: name });
  await course.save();
  courses[index] = course;
  console.log(`Added course: ${name}`);
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

async function createOwners() {
  console.log("Adding owners");
  await Promise.all([
    ownerCreate(0, "Treehouse"),
    ownerCreate(1, "TechTerms.com"),
    ownerCreate(2, "Codeacademy"),
  ]);
}

async function createResources() {
  // index, name, course, owner, type, href
  console.log("Adding resources");
  await Promise.all([
    resourceCreate(
      0,
      "Front-End vs. Back-End: The Complete Guide",
      courses[0],
      owners[0],
      types[0],
      "https://blog.teamtreehouse.com/i-dont-speak-your-language-frontend-vs-backend"
    ),
    resourceCreate(
      1,
      "Backend",
      courses[0],
      owners[1],
      types[0],
      "https://techterms.com/definition/backend"
    ),
    resourceCreate(
      2,
      "Back-End Web Architecture",
      courses[0],
      owners[2],
      types[0],
      "https://www.codecademy.com/article/back-end-architecture"
    ),
  ]);
}

async function createCourses() {
  console.log("Adding courses");
  await Promise.all([
    courseCreate(0, "Node"),
    courseCreate(1, "React"),
    courseCreate(3, "Advanced HTML & CSS"),
    courseCreate(4, "Intermediate HTML & CSS"),
    courseCreate(5, "JavaScript"),
    courseCreate(6, "Foundations"),
    courseCreate(7, "Getting Hired"),
  ]);
}
