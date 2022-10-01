import dotenv from 'dotenv';

dotenv.config();
const {
    PORT,
    DB_URL,
    DB_Name,
    SALT,
    PAPPER,
    TOKEN_SECRET
} =process.env ;

const config = {
    port:PORT,
    db_name :DB_Name,
    db_url:DB_URL,
    salt:SALT,
    pepper:PAPPER,
    token:TOKEN_SECRET
};
export default config ; 