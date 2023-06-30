import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'clinica_de_saude_health',
});

AppDataSource.initialize().then(() => {
  console.log('Databese Initialize 💾');
});
