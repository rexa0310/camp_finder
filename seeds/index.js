const mongoose =require('mongoose');
const cities=require('./cities');
const {places, descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');

mongoose.connect('mongodb+srv://rexa0310:Rexa0310@mycluster.ubuf07c.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log('Database connecteed');
});

const sample=array=>array[Math.floor(Math.random()*array.length)];



const seeDB= async()=>{
    await Campground.deleteMany({});

    for(let i=0;i<300;i++)
    {
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*30)+10;
        const camp=new Campground({
            author:'62e5964c5cf327f4ff6637fa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sit iure fugiat fuga maxime ipsa quo praesentium nesciunt nemo dolorum! Dolor, optio. Ab repellat cupiditate sequi! Reiciendis commodi nihil a?",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitutde,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/rexa0310/image/upload/v1659360536/YelpCamp/ydgeqdwhrnhi71s3ijru.png',
                  filename: 'YelpCamp/ydgeqdwhrnhi71s3ijru',
                  
                },
                {
                  url: 'https://res.cloudinary.com/rexa0310/image/upload/v1659360536/YelpCamp/rvvc2kcdmu1a9q1priul.png',
                  filename: 'YelpCamp/rvvc2kcdmu1a9q1priul',
                  
                }
              ]
        })

        await camp.save();
    }
}

seeDB().then(() => {
    mongoose.connection.close();
})