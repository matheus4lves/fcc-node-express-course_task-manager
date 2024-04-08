import { connect } from "mongoose";

const connectDB = (uri: string) => connect(uri);

export default connectDB;
