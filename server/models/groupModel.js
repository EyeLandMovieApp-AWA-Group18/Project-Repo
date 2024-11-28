import pool from '../database/db.js';

const createGroup = async (ownerId, name, description) => {
    const query = `
        INSERT INTO groups (owner_id, name, description)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [ownerId, name, description];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllGroups = async () => {
    const query = `
        SELECT * FROM groups;
    `;
    const result = await pool.query(query);
    return result.rows;
};

const getGroupById = async (groupId) => {
    const query = `
        SELECT * FROM groups WHERE id = $1;
    `;
    const result = await pool.query(query, [groupId]);
    return result.rows[0];
};

const deleteGroupById = async (groupId) => {
    const query = `
        DELETE FROM groups
        WHERE id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [groupId]);
    return result.rows[0];
};

export default {
    createGroup,
    getAllGroups,
    getGroupById,
    deleteGroupById,
};
