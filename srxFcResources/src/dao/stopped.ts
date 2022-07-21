import { getConnection, Table} from "typeorm";

const queryRunner = getConnection().createQueryRunner();

export async function query(sql) {
    let runner = getConnection().createQueryRunner();
    let result = await runner.query(sql);
    await runner.release();
    return result;
}