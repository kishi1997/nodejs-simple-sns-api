import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1697713520948 implements MigrationInterface {
    name = 'UpdateTable1697713520948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_94f168faad896c0786646fa3d4a\``);
        await queryRunner.query(`DROP INDEX \`REL_94f168faad896c0786646fa3d4\` ON \`token\``);
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`userId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_94f168faad896c0786646fa3d4\` ON \`token\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_94f168faad896c0786646fa3d4a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
