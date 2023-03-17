import {Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Animated, {SharedTransition, withSpring} from 'react-native-reanimated';

interface Props {
  text?: string;
}

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

const SPRING_CONFIG = {
  mass: 1,
  stiffness: 200,
  damping: 150,
};

export const sharedElementTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.targetHeight, SPRING_CONFIG),
    width: withSpring(values.targetWidth, SPRING_CONFIG),
    originX: withSpring(values.targetGlobalOriginX, SPRING_CONFIG),
    originY: withSpring(values.targetGlobalOriginY, SPRING_CONFIG),
  };
});

const Stack = createNativeStackNavigator<RootStackParamList>();

const Home = (props: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Animated.View
        sharedTransitionTag="sharedTag"
        sharedTransitionStyle={sharedElementTransition}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'green',
        }}
      />
      <Button
        title="Detail"
        onPress={() => props.navigation.navigate('Detail')}
      />
    </SafeAreaView>
  );
};

const Detail = () => {
  return (
    <SafeAreaView>
      <Animated.View
        sharedTransitionTag="sharedTag"
        sharedTransitionStyle={sharedElementTransition}
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'green',
        }}
      />
      <Text>Detail</Text>
    </SafeAreaView>
  );
};

export const App: React.FC<Props> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
