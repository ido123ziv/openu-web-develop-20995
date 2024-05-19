import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";
import {ParentProfile, BabysitterProfile, BabysitterUpdate, ParentUpdate} from "./profileTypes";

export default class DBHandler {
    async getBabySitterProfile(babysitterId: number): Promise<BabysitterProfile[]> {
        const babysitterQuery = `SELECT babysitter_name AS "name",
                                 email,
                                 city,
                                 street,
                                 gender,
                                 experience,
                                 age,
                                 phone_number AS "phoneNumber",
                                 comments
                                 FROM babysitters
                                 WHERE babysitter_id = ($1)
                                 AND end_timestamp = ($2)`;
        const profile = await db.query(babysitterQuery, [babysitterId,END_TIMESTAMP]);
        return profile.rows;
    }

    async getParentProfile(parentId: number): Promise<ParentProfile[]> {
        const parentQuery = `SELECT parent_name AS "name",
                             email,
                             city,
                             street,
                             gender,
                             phone_number AS "phoneNumber",
                             min_kid_age AS "minKidAge",
                             max_kid_age AS "maxKidAge",
                             num_of_kids AS "numOfKids",
                             comments
                             FROM parents 
                             WHERE parent_id = ($1)
                             AND end_timestamp = ($2)`;

        const profile = await db.query(parentQuery, [parentId,END_TIMESTAMP]);
        return profile.rows;
    }

    async updateBabySitterProfile(babysitterId: number, babysitterData: BabysitterUpdate): Promise<void> {
        const fields: string[] = [];
        const params: any[] = [];
        let paramIndex = 1;

        if (babysitterData.babysitterName) {
            fields.push(`babysitter_name = $${paramIndex++}`);
            params.push(babysitterData.babysitterName);
        }

        if (babysitterData.email) {
            fields.push(`email = $${paramIndex++}`);
            params.push(babysitterData.email);
        }

        if (babysitterData.city) {
            fields.push(`city = $${paramIndex++}`);
            params.push(babysitterData.city);
        }

        if (babysitterData.street) {
            fields.push(`street = $${paramIndex++}`);
            params.push(babysitterData.street);
        }

        if (babysitterData.experience) {
            fields.push(`experience = $${paramIndex++}`);
            params.push(babysitterData.experience);
        }

        if (babysitterData.age) {
            fields.push(`age = $${paramIndex++}`);
            params.push(babysitterData.age);
        }

        if (babysitterData.phoneNumber) {
            fields.push(`phone_number = $${paramIndex++}`);
            params.push(babysitterData.phoneNumber);
        }

        if (babysitterData.gender) {
            fields.push(`gender = $${paramIndex++}`);
            params.push(babysitterData.gender);
        }

        if (babysitterData.comments) {
            fields.push(`comments = $${paramIndex++}`);
            params.push(babysitterData.comments);
        }

        params.push(babysitterId)

        const babysitterQuery = `UPDATE babysitters
                                 SET ${fields.join(', ')}
                                 WHERE babysitter_id = $${params.length}`;

        await db.query(babysitterQuery, params);
    }

    async updateParentProfile(parentId: number, parentData: ParentUpdate): Promise<void> {
        const fields: string[] = [];
        const params: any[] = [];
        let paramIndex = 1;

        if (parentData.parentName) {
            fields.push(`parent_name = $${paramIndex++}`);
            params.push(parentData.parentName);
        }

        if (parentData.email) {
            fields.push(`email = $${paramIndex++}`);
            params.push(parentData.email);
        }

        if (parentData.city) {
            fields.push(`city = $${paramIndex++}`);
            params.push(parentData.city);
        }

        if (parentData.street) {
            fields.push(`street = $${paramIndex++}`);
            params.push(parentData.street);
        }

        if (parentData.gender) {
            fields.push(`gender = $${paramIndex++}`);
            params.push(parentData.gender);
        }

        if (parentData.phoneNumber) {
            fields.push(`phone_number = $${paramIndex++}`);
            params.push(parentData.phoneNumber);
        }

        if (parentData.minKidAge) {
            fields.push(`min_kid_age = $${paramIndex++}`);
            params.push(parentData.minKidAge);
        }

        if (parentData.maxKidAge) {
            fields.push(`max_kid_age = $${paramIndex++}`);
            params.push(parentData.maxKidAge);
        }

        if (parentData.numOfKids) {
            fields.push(`num_of_kids = $${paramIndex++}`);
            params.push(parentData.numOfKids);
        }

        if (parentData.comments) {
            fields.push(`comments = $${paramIndex++}`);
            params.push(parentData.comments);
        }

        params.push(parentId)

        const parentQuery = `UPDATE parents
                             SET ${fields.join(', ')}
                             WHERE parent_id = $${params.length}`;

        await db.query(parentQuery, params);
    }
}