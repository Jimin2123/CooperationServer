import { TypeOrmModuleOptions } from '@nestjs/typeorm'

// export const typeORMConfig: TypeOrmModuleOptions = {
//   // Database Type
//   type: 'mysql',
//   host: process.env.DATABASE_HOST || 'cooperationdb.cfol68w6pa0r.us-east-2.rds.amazonaws.com',
//   port: Number(process.env.DATABASE_PORT) || 3306,
//   username: process.env.DATABASE_USERNAME || 'admin',
//   password: process.env.DATABASE_PASSWORD || 'kminening02',
//   database: process.env.DATABASE_DATABASE || 'test',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// }

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'cooper',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}
