import { OrmModuleConfigType } from "./types/database.types";


export const constants = {
    DATABASE: {
      CONFIG: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        synchronize: false
      } as OrmModuleConfigType
    }
  };