import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function App() {
  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages.length > 0) {
        setScannedImage(scannedImages[0]);
      }
    } catch (err) {
      console.log("Error scanning document:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Document Scanner</Text>
      
      {scannedImage && (
        <Image
          resizeMode="contain"
          style={{ width: '100%', height: 400, marginBottom: 20 }}
          source={{ uri: scannedImage }}
        />
      )}
      
      <Button title="Scan Document" onPress={scanDocument} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  header: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold'
  }
});
