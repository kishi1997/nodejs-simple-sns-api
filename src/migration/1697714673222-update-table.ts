import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1697714673222 implements MigrationInterface {
    name = 'UpdateTable1697714673222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_94f168faad896c0786646fa3d4a\``);
        await queryRunner.query(`DROP INDEX \`IDX_94f168faad896c0786646fa3d4\` ON \`token\``);
        await queryRunner.query(`DROP INDEX \`REL_94f168faad896c0786646fa3d4\` ON \`token\``);
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`tokenId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_63301650f99948e1ff5e0af00b\` (\`tokenId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_63301650f99948e1ff5e0af00b\` ON \`user\` (\`tokenId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_63301650f99948e1ff5e0af00b5\` FOREIGN KEY (\`tokenId\`) REFERENCES \`token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_63301650f99948e1ff5e0af00b5\``);
        await queryRunner.query(`DROP INDEX \`REL_63301650f99948e1ff5e0af00b\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_63301650f99948e1ff5e0af00b\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`tokenId\``);
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_94f168faad896c0786646fa3d4\` ON \`token\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_94f168faad896c0786646fa3d4\` ON \`token\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_94f168faad896c0786646fa3d4a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
