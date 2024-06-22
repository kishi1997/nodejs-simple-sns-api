import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSmpleTable1708154245658 implements MigrationInterface {
    name = 'UpdateSmpleTable1708154245658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roomUser\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`roomId\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`roomUser\``);
    }

}
