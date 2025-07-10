import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuoteTable1751987453572 implements MigrationInterface {
    name = 'AddQuoteTable1751987453572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`quote\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`amount\` decimal(12,2) NOT NULL DEFAULT '0.00', \`country\` varchar(255) NOT NULL, \`exchangeRate\` int NOT NULL, \`fee\` int NOT NULL, \`fiatAmount\` decimal(12,2) NOT NULL DEFAULT '0.00', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`quote\``);
    }

}
