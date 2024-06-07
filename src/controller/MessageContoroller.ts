import * as express from 'express'
import { verifyToken, authAdmin } from 'src/authMiddleware/auth'
import { Message } from 'src/entity/Message'
import { MessageService } from 'src/service/MessageService'
import { formatMessageResponse } from 'src/utils/responseUtils/formatMessageResponse'

export const MessageContoroller = express.Router()
MessageContoroller.get('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const messages = await MessageService.getMessages(req.query)
    const formattedMessagesData = messages.map((message: Message) => {
      return formatMessageResponse(message)
    })
    res.json({ messages: formattedMessagesData })
  } catch (error) {
    next(error)
  }
})
MessageContoroller.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { content, roomId } = req.body
    const newMessageData = await MessageService.createMessage(
      content,
      roomId,
      (req as any).userId
    )
    const formattedMessageData = formatMessageResponse(newMessageData)
    res.json({
      message: formattedMessageData,
    })
  } catch (error) {
    next(error)
  }
})

MessageContoroller.post(
  '/via_post',
  verifyToken,
  authAdmin,
  async (req, res, next) => {
    try {
      const { content, postId } = req.body
      const messageViaPostData = await MessageService.createMessageViaPost(
        content,
        postId,
        (req as any).userId
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
