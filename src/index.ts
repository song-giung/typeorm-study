import "reflect-metadata";
import { createConnection } from "typeorm";
import { Album } from "./entity/Album";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { User } from "./entity/User";

const init = async () => {
  try {
    const connection = await createConnection();

    let album1 = new Album();
    album1.name = "Me";
    await connection.manager.save(album1);

    let album2 = new Album();
    album2.name = "Bears";
    await connection.manager.save(album2);

    let photo = new Photo();

    photo.name = "Me and Bears3";
    photo.description = "I am near dark bears";
    photo.filename = "photo-with-dark-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;
    photo.albums = [album1, album2];

    await connection.manager.save(photo);

    const loadedPhotos = await connection
      .getRepository(Photo)
      .findOne(3, { relations: ["albums"] });
    console.log(loadedPhotos);
  } catch (error) {
    console.log(error);
  }
};

init();

//기본적으로 정방향 참조도 eager는 false
//역방향과 정방향 모두 relation으로 dynamic하게 relation data를 fetch할 수 있다.
