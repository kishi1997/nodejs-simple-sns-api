import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { verifyToken, authAdmin } from 'src/authMiddleware/auth'
import { Message } from 'src/entity/Message'
import { MessageService } from 'src/service/MessageService'
import { formatMessageResponse } from 'src/utils/responseUtils/formatMessageResponse'
import { parsePaginationParams } from 'src/utils/paginationUtils'
import { validateUserRoomMembership } from 'src/utils/validateUtils/validateUser'

export const MessageController = express.Router()
MessageController.post(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { content, roomId } = req.body
      const userId = req.userId
      const newMessageData = await MessageService.createMessage(
        content,
        roomId,
        userId!
      )
      const formattedMessageData = formatMessageResponse(newMessageData)
      res.json({
        message: formattedMessageData,
      })
    } catch (error) {
      next(error)
    }
  }
)

MessageController.post(
  '/via_post',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { content, postId } = req.body
      const userId = req.userId
      const messageViaPostData = await MessageService.createMessageViaPost(
        content,
        postId,
        userId!
      )
      const formattedMessageData = formatMessageResponse(messageViaPostData)
      res.json({
        message: formattedMessageData,
      })
    } catch (error) {
      next(error)
    }
  }
)

MessageController.get(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.userId
      const roomId = req.query.roomId as string
      await validateUserRoomMembership(roomId, userId!)
      const pagination = parsePaginationParams(req.query)
      const messages = await MessageService.getMessages(pagination, roomId)
      const formattedMessagesData = messages.map((message: Message) => {
        return formatMessageResponse(message)
      })
      res.json({ messages: formattedMessagesData })
    } catch (error) {
      next(error)
    }
  }
)
