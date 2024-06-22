import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSampleTable1700297949086 implements MigrationInterface {
    name = 'UpdateSampleTable1700297949086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`roomId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`postId\` \`postId\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_04a090968149bb6f728a253d683\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`postId\` \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`roomId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_04a090968149bb6f728a253d683\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
