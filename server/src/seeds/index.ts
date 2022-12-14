import { connect, connection } from "mongoose";
import Project from "../models/project";

const dbUrl = "mongodb://127.0.0.1:27017/bug";
connect(dbUrl);
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("database connected");
});

const seedDatabase = async () => {
  await Project.deleteMany({});
  for (let i = 0; i < 8; i++) {
    const project = new Project({
      title: `Project ${i}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis provident nesciunt eaque tempore dicta, veritatis fuga id nisi tenetur.",
    });
    await project.save();
  }
};

seedDatabase().then(() => {
    connection.close();
});
