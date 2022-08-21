import { ObjectId } from "mongodb";
import faker from "@faker-js/faker";
import { IActivity, ICreateActivity } from "@/interfaces/IActivity";

export default (
  userIds: string[],
  activityNumber: number
): ICreateActivity[] => {
  return Array.from(new Array(activityNumber)).map(() => {
    const randomUserIndex = Math.floor(Math.random() * userIds.length);
    const userId = userIds[randomUserIndex];

    const photos = [
      "https://cdn.pixabay.com/photo/2021/06/06/16/32/flowers-6315800_640.jpg",
      "https://cdn.pixabay.com/photo/2020/04/30/03/26/rufous-5111261_640.jpg",
      "https://cdn.pixabay.com/photo/2022/07/24/11/26/fallow-deer-7341424_640.jpg",
      "https://cdn.pixabay.com/photo/2022/07/18/19/57/dog-7330712_640.jpg",
      "https://cdn.pixabay.com/photo/2022/06/30/17/43/pink-flower-7294155_640.jpg",
    ];
    const randomPhotoIndex = Math.floor(Math.random() * photos.length);
    const photo = photos[randomPhotoIndex];

    const upVotes: string[] = [];
    const downVotes: string[] = [];

    userIds.map((userId) => {
      const random = Math.random() * 2;
      const letter = random <= 0.85 ? "a" : random < 1.7 ? "b" : "c";
      if (letter === "a") upVotes.push(userId);
      else if (letter === "b") downVotes.push(userId);
    });

    const votes = upVotes.length + downVotes.length;
    const upVoteRatio = upVotes.length / votes;
    return {
      user: userId,
      text: faker.random.words(10),
      photo,
      upVotesCount: upVotes.length,
      downVotesCount: downVotes.length,
      votes,
      upVoteRatio,
      date: new Date(),
    };
  });
};
