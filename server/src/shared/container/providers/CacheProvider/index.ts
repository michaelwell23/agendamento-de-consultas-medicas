import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';

import RedisCacheProvide from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvide,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
