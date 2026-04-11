import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import dbConfig from 'src/config/db.config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    @Inject(dbConfig.KEY)
    private readonly dbEnvs: ConfigType<typeof dbConfig>,
  ) {
    const url = dbEnvs.url;

    const adapter = new PrismaPg({
      connectionString: url,
    });

    super({ adapter });
  }
}
