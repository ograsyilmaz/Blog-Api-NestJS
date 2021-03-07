import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('blog')
export class BlogEntity {
  @ObjectIdColumn() id: ObjectID;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
  author: UserEntity;
}
