import dotenv from 'dotenv';
import { app } from './app.js';
import connectToDatabase from './db/index.js';

dotenv.config({
    path: './.env'
});

connectToDatabase()
    .then(
        () => {
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    )
    .catch(
        (err) => {
            console.log("Error connecting to the database");
            throw new Error("Error connecting to the database");
        }
    )
    ;


