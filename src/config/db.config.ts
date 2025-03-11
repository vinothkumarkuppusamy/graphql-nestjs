import { registerAs } from "@nestjs/config";
import  * as path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export default registerAs("dbConfig-env",(): PostgresConnectionOptions =>({
    url: process.env.DB_URL,
    type: "postgres", 
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Don't use this in production
}))