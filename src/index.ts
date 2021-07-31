import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { User } from "./entity/User";

const init = async () => {
  try {
    const connection = await createConnection();

    // create photo obj
    let photo = new Photo();
    photo.name = "Me and Bears2";
    photo.description = "I am near grizzly bears";
    photo.filename = "photo-with-dangerous-bears.jpg";
    photo.isPublished = true;
    photo.views = 1;

    //create photo metadata obj
    let metadata = new PhotoMetadata();
    metadata.height = 800;
    metadata.width = 400;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portrait";

    photo.metadata = metadata; // connect one to one

    let photoRepository = connection.getRepository(Photo);

    await photoRepository.save(photo); // save photo also save the metadata
  } catch (error) {
    console.log(error);
  }
};

init();

//기본적으로 정방향 참조도 eager는 false
//역방향과 정방향 모두 relation으로 dynamic하게 relation data를 fetch할 수 있다.
