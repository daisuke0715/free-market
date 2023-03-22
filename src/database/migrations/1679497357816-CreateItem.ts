import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItem1679497357816 implements MigrationInterface {
  name = 'CreateItem1679497357816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item"`);
  }
}
