import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSampleTable1698564699056 implements MigrationInterface {
    name = 'UpdateSampleTable1698564699056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`body\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`body\` varchar(300) NOT NULL DEFAULT ''`);
    }

}
