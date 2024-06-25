import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSmpleTable1708154245658 implements MigrationInterface {
    name = 'UpdateSmpleTable1708154245658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\`
        ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        ADD \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`)
        await queryRunner.query(`CREATE TABLE \`room_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`roomId\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_507b03999779b22e06538595dec\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_27dad61266db057665ee1b13d3d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_27dad61266db057665ee1b13d3d\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_507b03999779b22e06538595dec\``);
        await queryRunner.query(`DROP TABLE \`room_user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedDate\``);
    }

}
