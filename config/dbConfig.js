const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const databaseConnection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // idhar dalna rahega env se username password
      // bin gui ke setup kar lo
      // usme mat karna login, idhar se karo connect
    });
    console.log(
      "Connected to Database : " + databaseConnection.connection.host
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
