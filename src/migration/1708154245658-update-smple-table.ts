import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSmpleTable1708154245658 implements MigrationInterface {
    name = 'UpdateSmpleTable1708154245658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\`
        ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        ADD \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`)
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`CREATE TABLE \`roomUser\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`roomId\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`roomUser\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`createdDate\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`content\` varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedDate\``);
    }

}
