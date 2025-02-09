import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTodoTable1698160660280 implements MigrationInterface {
    name = 'UpdateTodoTable1698160660280'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`body\` varchar(300) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`createdDate\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`text\` varchar(300) NOT NULL DEFAULT ''`);
    }

}
