#! /usr/bin/env node

console.log(
  'This script populates data to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Course = require("./models/course");
const ResourceDetail = require("./models/resourceDetail");
const ResourceType = require("./models/resourceType");
const Owner = require("./models/owner");

const courses = [];
const resources = [];
const types = [];
const owners = [];

const mongoose = require("mongoose");
const resourceType = require("./models/resourceType");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCourses();
  await createResources();
  await createTypes();
  await createOwners();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
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
  console.log(`course: ${name}`);
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

// async function createOwners() {
//   console.log("Adding owners");
//   await Promise.all([
//     authorCreate(0, "Patrick", "Rothfuss", "1973-06-06", false),
//     authorCreate(1, "Ben", "Bova", "1932-11-8", false),
//     authorCreate(2, "Isaac", "Asimov", "1920-01-02", "1992-04-06"),
//     authorCreate(3, "Bob", "Billings", false, false),
//     authorCreate(4, "Jim", "Jones", "1971-12-16", false),
//   ]);
// }

// async function createBooks() {
//   console.log("Adding Books");
//   await Promise.all([
//     bookCreate(
//       0,
//       "The Name of the Wind (The Kingkiller Chronicle, #1)",
//       "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
//       "9781473211896",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       1,
//       "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
//       "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
//       "9788401352836",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       2,
//       "The Slow Regard of Silent Things (Kingkiller Chronicle)",
//       "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
//       "9780756411336",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       3,
//       "Apes and Angels",
//       "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
//       "9780765379528",
//       authors[1],
//       [genres[1]]
//     ),
//     bookCreate(
//       4,
//       "Death Wave",
//       "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
//       "9780765379504",
//       authors[1],
//       [genres[1]]
//     ),
//     bookCreate(
//       5,
//       "Test Book 1",
//       "Summary of test book 1",
//       "ISBN111111",
//       authors[4],
//       [genres[0], genres[1]]
//     ),
//     bookCreate(
//       6,
//       "Test Book 2",
//       "Summary of test book 2",
//       "ISBN222222",
//       authors[4],
//       false
//     ),
//   ]);
// }

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
