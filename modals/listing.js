const mongoose = require("mongoose");
const { Schema } = mongoose;
const data = require('../init_data/data.js');
require('dotenv').config();
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const db_url=process.env.ALTAS_DB;

const Reviewmodel= require('./review.js')
const usermodel=require('./user.js');
const { type } = require("../schema.js");
const User= require('./user.js')

main()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(db_url);
}


const ListingSchema = new Schema({
  title: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      set: (v) => v === "" ? "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" : v,
    },
  },
  price: {
    type: Number,
    required: true,
    min: 1,

  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  review: [{
    type: Schema.Types.ObjectId,
    ref: 'Reviewmodel'

  }],
  Owner:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

ListingSchema.post('findOneAndDelete', async (list) => {
  if (list) {
    await Reviewmodel.deleteMany({ _id: {$in: list.review } })
  }})

const Listingmodel = mongoose.model('Listingmodel', ListingSchema);


const adddata = async () => {
  const userInfo = await Listingmodel.insertMany()

  // userInfo.save();
  console.log('data saved');


}
// adddata();

const finddata = async () => {
  const res = await Listingmodel.find();
  console.log(res);
}
// finddata();

module.exports = Listingmodel







