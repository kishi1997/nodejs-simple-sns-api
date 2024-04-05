import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSmpleTable1708154245658 implements MigrationInterface {
    name = 'UpdateSmpleTable1708154245658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body\` varchar(255) NOT NULL DEFAULT '', \`userId\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room\` (\`id\` varchar(36) NOT NULL, \`usersId\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roomUser\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`roomId\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`iconImageUrl\` varchar(255) NOT NULL DEFAULT '', \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`roomId\` varchar(255) NOT NULL, \`postId\` int NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_446251f8ceb2132af01b68eb593\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_04a090968149bb6f728a253d683\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_fdfe54a21d1542c564384b74d5c\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_fdfe54a21d1542c564384b74d5c\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_04a090968149bb6f728a253d683\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_446251f8ceb2132af01b68eb593\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`DROP TABLE \`message\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`roomUser\``);
        await queryRunner.query(`DROP TABLE \`room\``);
        await queryRunner.query(`DROP TABLE \`post\``);
    }

}
