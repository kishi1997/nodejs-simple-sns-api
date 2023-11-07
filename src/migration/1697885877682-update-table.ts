import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1697885877682 implements MigrationInterface {
    name = 'UpdateTable1697885877682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_94f168faad896c0786646fa3d4\` ON \`token\``);
        await queryRunner.query(`ALTER TABLE \`token\` CHANGE \`token\` \`token\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` CHANGE \`token\` \`token\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_94f168faad896c0786646fa3d4\` ON \`token\` (\`userId\`)`);
    }

}
