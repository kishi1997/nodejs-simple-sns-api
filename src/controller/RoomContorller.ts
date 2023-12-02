import express from "express";
import { authAdmin, verifyToken } from "src/authMiddleware/auth";
import { RoomService } from "src/service/RoomService";
import { formatUserResponseWithoutEmail } from "src/utils/responseUtils/formatUserResponse";

export const RoomController = express.Router();
RoomController.post('/', verifyToken, authAdmin, async (req, res, next) => {
    try {
        const { userIds } = req.body;
        const roomData = await RoomService.createRoom(userIds, (req as any).userId);
        const { roomUsers, newRoom } = roomData;

        const formattedRoomUsers = roomUsers.map(user => formatUserResponseWithoutEmail(user));

        const roomUserDetails = formattedRoomUsers.map((user) => {
            return {
                roomid: newRoom.id,
                userId: user.id,
                user: user
            };
        });

        const responseData = {
            id: newRoom.id,
            messages: [],
            roomUsers: roomUserDetails
        };

        res.json(responseData);
    }
    catch (error) {
        next(error);
    }
});