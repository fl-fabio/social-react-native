import { PersonDetails } from "./Data";

type RootStackParams = {
  Home: undefined;
  Detail: {person: PersonDetails};
  Profile: undefined;
  Favorite: {person: PersonDetails};
  Setting: undefined;
  Homepage: undefined;
  SignUp: undefined;
  Login: undefined;
  Logout: undefined;
  HomeStack: undefined;
  DrawerMenu: undefined;
};

export default RootStackParams;