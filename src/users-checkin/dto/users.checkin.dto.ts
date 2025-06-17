
export class UserCheckinInfoDto {
    id: string;
    fullName: string;
}

export class UsersCheckinDto {
    userId: UserCheckinInfoDto
    checkinDate: string
    checkinTime: string
    checkoutTime: string
}