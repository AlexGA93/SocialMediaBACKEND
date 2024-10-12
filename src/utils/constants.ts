import { OrmModuleConfigType } from "./types/database.types";


export const constants = {
    DATABASE: {
      CONFIG: {
        type: process.env.MYSQL_TYPE as OrmModuleConfigType['type'],  // lowercase `type`
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        username: process.env.MYSQL_GLOBAL_TERM,
        password: process.env.MYSQL_GLOBAL_TERM,
        database: process.env.MYSQL_DATABASE,
        synchronize: true
      } as OrmModuleConfigType
    }
  };