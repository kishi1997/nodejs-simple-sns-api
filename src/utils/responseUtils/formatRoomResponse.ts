import { Room } from 'src/entity/Room'

export const formatRoomResponse = (room: Room) => {
  return {
    id: room.id,
    messages: room?.messages != null ? room?.messages : [],
    roomUsers:
      room?.roomUsers != null
        ? room?.roomUsers.map(roomUser => {
            return {
              roomId: roomUser.roomId,
              userId: roomUser.userId,
              user: {
                id: roomUser.user?.id,
                name: roomUser.user?.name,
                iconImageUrl: roomUser.user?.iconImageUrl,
              },
            }
          })
        : [],
  }
}
