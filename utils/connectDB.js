import mongose from 'mongoose';

const dbOptions = {
    autoReconnect: true,
    reconnectTries: 999999999,
    reconnectInterval: 3000
}
const connectDB = () => {
    mongose.set('strictQuery', false);
    return mongose.connect(process.env.MONGODB_URI);
};
export default connectDB