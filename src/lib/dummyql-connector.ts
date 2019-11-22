export class DummyQLConnector {
    public database: Object;

    constructor() {
        this.database = {};
    }

    addTable(name) {
        this.database[name] = [];
    }

    /**
     * CRUD: Create Read Update Delete
     */

    create(tableName: string, data) {
        this.database[tableName].push(data);
        return true;
    }

    read(tableName, column, value, returnOnlyFirstOne = true) {
        return returnOnlyFirstOne
            ? this.database[tableName].find(data => data[column] === value)
            : this.database[tableName].filter(data => data[column] === value);
    }

    update() {
        throw new Error('Method not implemented.');
    }

    delete(tableName, column, value) {
        try {
            const oldDataIndex =  this.database[tableName].findIndex(data => data[column] === value);
            this.database[tableName] = this.database[tableName].splice(oldDataIndex, 1);
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * Some extra features
     */

    all(tableName) {
        return this.database[tableName];
    }

    count(tableName) {
        return this.database[tableName].length;
    }
}