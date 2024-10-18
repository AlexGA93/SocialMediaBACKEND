import { ConstantType } from "./types/database.types";


export const constants: ConstantType = {
    DATABASE: {
      CONFIG: {
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        synchronize: true, // true for dev, false to prod
        retryAttempts: 5,  // number to attempts to reconnect
        retryDelay: 3000,  // wait 3 seconds to re-connect
      }
    }
  };