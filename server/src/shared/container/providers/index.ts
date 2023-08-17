import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DisckStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DisckStorageProvider,
);
