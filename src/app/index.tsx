import { StyleSheet, View, SafeAreaView } from 'react-native';
import Start from '../components/Start';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Start />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EBB2', // Match the card background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
