import { PersonDetails } from "./Data";

type RootStackParams = {
  Home: undefined;
  Detail: {person: PersonDetails};
  Profile: undefined;
  Favorite: {person: PersonDetails};
  EditProfile: undefined;
  Setting: undefined;
  Homepage: undefined;
  SignUp: undefined;
  Login: undefined;
  Logout: undefined;
  HomeStack: undefined;
  DrawerMenu: undefined;
  info: undefined;
};

export default RootStackParams;