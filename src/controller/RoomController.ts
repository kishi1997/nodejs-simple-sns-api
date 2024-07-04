import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { authAdmin, verifyToken } from 'src/authMiddleware/auth'
import { Room } from 'src/entity/Room'
import { RoomService } from 'src/service/RoomService'
import { formatRoomResponse } from 'src/utils/responseUtils/formatRoomResponse'
import { validateUserRoomMembership } from 'src/utils/validateUtils/validateUser'

export const RoomController = express.Router()
RoomController.post(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userIds } = req.body
      const userId = req.userId
      const roomData = await RoomService.createRoom(userIds, userId!)
      res.json({ room: formatRoomResponse(roomData) })
    } catch (error) {
      next(error)
    }
  }
)
RoomController.get(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.userId
      const roomDatas = await RoomService.getRooms(userId!)
      res.json({
        rooms: roomDatas.map((roomData: Room) => {
          return formatRoomResponse(roomData)
        }),
      })
    } catch (error) {
      next(error)
    }
  }
)
RoomController.get(
  '/:id',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomId = req.params.id
      const userId = req.userId
      await validateUserRoomMembership(roomId, userId!)
      const roomData = await RoomService.findRoom(roomId)
      res.json({ room: formatRoomResponse(roomData) })
    } catch (error) {
      next(error)
    }
  }
)
