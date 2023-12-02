import { User } from "src/entity/User"

export const formatUserResponse = (user: User) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        iconImageUrl: user.iconImageUrl,
    }
}
export const formatUserResponseWithoutEmail = (user: User) => {
    return {
        id: user.id,
        name: user.name,
        iconImageUrl: user.iconImageUrl,
    }
}