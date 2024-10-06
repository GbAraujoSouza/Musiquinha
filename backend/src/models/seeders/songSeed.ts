import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import axios from "axios";
import SongUtils from "../../utils/songUtils";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { SongService } from "../../modules/Song/song.service";
import auth from "../../config/auth";

const prisma = new PrismaClient();

const SAMPLE = 30;
const FREESOUND_API_KEY = "G6XUVx345cUDTcisNbBTaxpR29cTsAXpybNnDDQN";
const BUCKET_NAME = process.env.BUCKET_NAME;

const freesoundApi = axios.create({
  headers: {
    Authorization: `TOKEN ${FREESOUND_API_KEY}`,
  },
  baseURL: "https://freesound.org/apiv2",
});

async function fetchFreeSound() {
  const response = await freesoundApi.get("/search/text", {
    params: {
      query: "piano",
      page_size: SAMPLE,
      fields: "previews",
    },
  });

  return response.data.results;
}

export default async function songSeeder() {
  const songsResponse = await fetchFreeSound();

  for (let song = 0; song < SAMPLE; song++) {
    const songPreview = await axios.get(songsResponse[song].previews["preview-lq-mp3"], {
      responseType: "arraybuffer",
    });

    const fakeSongName = SongUtils.randomSongName();

    const params = {
      Bucket: BUCKET_NAME,
      Key: fakeSongName,
      Body: songPreview.data,
      ContentType: "audio/mpeg",
    };

    const command = new PutObjectCommand(params);

    SongService.getS3().send(command);

    const password = faker.internet.password({
      length: 20,
      memorable: false,
      pattern: /[A-Za-z\@!-_%*]/,
    });
    const { salt, hash } = auth.generatePassword(password);

    await prisma.song.create({
      data: {
        title: faker.music.songName(),
        likes: faker.number.int({max: 3000}),
        key: fakeSongName,
        artist: {
          create: {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            isArtist: true,
            hash: hash,
            salt: salt,
            artist: {
              create: {},
            },
          },
        },
      },
    });
  }
}
