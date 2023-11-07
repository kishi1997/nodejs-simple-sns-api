import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1697998408038 implements MigrationInterface {
    name = 'UpdateTable1697998408038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`roomId\` varchar(255) NOT NULL, \`postId\` varchar(255) NOT NULL DEFAULT '0', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
