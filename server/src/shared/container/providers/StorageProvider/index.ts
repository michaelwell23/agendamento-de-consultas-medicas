import { container } from 'tsyringe';

import DisckStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  diskstorage: DisckStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.diskstorage,
);
