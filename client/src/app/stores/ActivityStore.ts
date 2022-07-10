import { IActivity, IActivityDetails } from "app/models/Activity";
import { makeAutoObservable } from "mobx";
import { IoTennisball } from "react-icons/io5";

export default class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }

  activities: IActivity[] | null = [
    {
      id: "1",
      user: {
        nick: "Danny",
      },
      title: "New post",
      photo:
        "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?cs=srgb&dl=pexels-nextvoyage-1461974.jpg&fm=jpg",
      commentCount: 5,
      likeCount: 10,
      date: new Date(),
    },
    {
      id: "2",
      user: {
        nick: "John",
      },
      title: "activity",
      photo:
        "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg",
      commentCount: 15,
      likeCount: 0,
      date: new Date(),
    },
  ];
  activity: IActivityDetails | null = {
    id: "1",
    user: {
      nick: "Danny",
    },
    title: "New post",
    photo:
      "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?cs=srgb&dl=pexels-nextvoyage-1461974.jpg&fm=jpg",
    commentCount: 5,
    likeCount: 10,
    date: new Date(),
    comments: [
      {
        user: {
          nick: "ruslav",
        },
        text: "Interesting",
      },
      {
        user: {
          nick: "daniel",
        },
        text: "lorem ipsum dolar",
      },
      {
        user: {
          nick: "John",
        },
        text: "vsdfdsa fdsaf  sd",
      },
    ],
  };

  getActivity = (id: string) => {
    return this.activities?.find((item) => item.id === id);
  };

  loadActivity = (id: string) => {
    return "aa";
  };
}
