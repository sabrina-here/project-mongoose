import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  database_url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.si1sqts.mongodb.net/project-mongoose?retryWrites=true&w=majority&appName=Cluster0`,
};
