import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { User } from "./entity/User";

const init = async () => {
  try {
    const connection = await createConnection();

    const photoRepository = connection.getRepository(Photo);
    const userRepository = connection.getRepository(User);
    const photoMetadataRepository = connection.getRepository(PhotoMetadata);

    // const photos = await photoRepository.find({ relations: ["metadata"] });
    const metadata = await photoMetadataRepository.find({
      relations: ["photo"],
    });

    console.log(metadata);
  } catch (error) {
    console.log(error);
  }
};

init();

//기본적으로 정방향 참조도 eager는 false
//역방향과 정방향 모두 relation으로 dynamic하게 relation data를 fetch할 수 있다.
