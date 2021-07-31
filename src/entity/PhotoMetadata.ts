import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  height: number;

  @Column("int")
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  @OneToOne((type) => Photo, (photo) => photo.metadata)
  @JoinColumn() // own fk
  photo: Photo;
}
