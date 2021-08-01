import "reflect-metadata";
import { createConnection } from "typeorm";
import { Album } from "./entity/Album";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { User } from "./entity/User";

const init = async () => {
  try {
    const connection = await createConnection();

    let photos = await connection
      .getRepository(Photo)
      .createQueryBuilder("photo")
      .innerJoinAndSelect("photo.metadata", "metadata")
      .leftJoinAndSelect("photo.albums", "album")
      .where("photo.isPublished = true")
      .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
      .orderBy("photo.id", "DESC")
      .skip(5)
      .take(10)
      .setParameters({ photoName: "My", bearName: "Mishka" })
      .getMany();
  } catch (error) {
    console.log(error);
  }
};

init();
