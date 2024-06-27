
import { config } from "dotenv";
import { connect } from "mongoose";
config();

const configs = {
  PORT: process.env.PORT,
  API_VERSION: `api/v1`,
  HOST: `${process.env.HOST}`
};

const dbConnect = ()=>{
  try {
    connect(`${process.env.DB_URL}`)
    console.log("Database connected 👁️👁️👁️👁️")
  } catch (error) {
   console.log(error)
  }
}
export { configs,dbConnect };