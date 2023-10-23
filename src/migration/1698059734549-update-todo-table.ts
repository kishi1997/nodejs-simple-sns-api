import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTodoTable1698059734549 implements MigrationInterface {
    name = 'UpdateTodoTable1698059734549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`text\` \`content\` varchar(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`content\` \`text\` varchar(300) NOT NULL`);
    }

}
