import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Melly NIYONKURU",
      username: "melly",
      email: "melly@test.com",
      bio: "my name is melly, and I love coding, I am a fullstack developer",
      password: "$2b$10$ZzmVSBMk2vrzp.f9aLjBvetKINjFeEsQ2YYmLUFIJSicuOvG.Sh4e", //tset123 hashed by 10 rounds
      avatar: {
        create: {
          url: "https://images.unsplash.com/photo-1696939268439-8176e0f8b1b0",
        },
      },
      Profile: {
        create: {
          banner: {
            create: {
              url: "https://images.unsplash.com/photo-1682687220989-cbbd30be37e9",
            },
          },
        },
      },
      tweets: {
        create: [
          {
            content: "Hello world from seed",
            Media: {
              create: {
                url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
              },
            },
          },
          {
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Media: {
              create: {
                url: "https://images.unsplash.com/photo-1566837945700-30057527ade0",
              },
            },
          },
          {
            content:
              "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”",
            Media: {
              create: {
                url: "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9",
              },
            },
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
