export interface OrmModuleConfigType {
    type: 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql' | 'oracle' | 'mongodb' | 'cockroachdb' | 'sap' | 'better-sqlite3' | 'expo';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities?: any[];  // Adjust the type for entities if needed
    synchronize: boolean;
  }