import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn() id: ObjectID;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;
}
