import { Room } from "src/entity/Room";
import { User } from "src/entity/User";
import { createError } from "src/utils/errorUtils/createError";
import { getRoomRepository } from "src/utils/getRepository";
import { validateNull } from "src/utils/validateUtils/validateNull";

export class RoomService {
    static roomRepo = getRoomRepository();

    static validateRoomData(roomUserId:number) {
        validateNull({name:'roomUsersId', value:roomUserId})
    };

    static async createRoom(roomUsersId: number[], userId: number) {
        roomUsersId.forEach(this.validateRoomData);
        const allUserIds = new Set([...roomUsersId, userId]);
        const formattedUserIds = Array.from(allUserIds).sort((a, b) => a - b).join('-');
        const roomUsers = await User.find({
            where: Array.from(allUserIds).map( id => ({id}) )
        })
        if (!roomUsers) {
            throw createError('User does not exist', 422);
        };
        const existingRoom = await Room.findOne({ where: { usersId: formattedUserIds } });
        if (existingRoom) {
            throw createError("Duplicate entry", 422);
        }
        const newRoom = RoomService.roomRepo.create({ usersId: formattedUserIds });
        await RoomService.roomRepo.save(newRoom);
        return { roomUsers, newRoom };
    }
}