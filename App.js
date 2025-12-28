import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function App() {
  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    // prompt user to verify permissions if needed, but plugin usually handles this.
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        // maxNumDocuments: 1
      });
      if (scannedImages.length > 0) {
        setScannedImage(scannedImages[0]);
      }
    } catch (err) {
      console.log("Error scanning document:", err);
    }
  };

  return (
    <View style={styles.container}>
      {scannedImage && (
        <Image
          resizeMode="contain"
          style={{ width: '100%', height: 300, marginBottom: 20 }}
          source={{ uri: scannedImage }}
        />
      )}
      <Button title="Scan Document" onPress={scanDocument} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
