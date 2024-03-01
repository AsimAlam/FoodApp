const mongoose = require('mongoose');
const mongoURI = 'mongodb://asimalam8:<PASSWORD>@ac-yogi2tv-shard-00-00.liakaku.mongodb.net:27017,ac-yogi2tv-shard-00-01.liakaku.mongodb.net:27017,ac-yogi2tv-shard-00-02.liakaku.mongodb.net:27017/fastfoodmern?ssl=true&replicaSet=atlas-lbmxxw-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log(" ....", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

            })
        }
    });
}

module.exports = mongoDB;
