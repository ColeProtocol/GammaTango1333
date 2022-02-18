import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  DrawerLayoutAndroidBase,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
//import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {Camera} from 'expo-camera';
import { Audio } from 'expo-av';
import { Searchbar } from "react-native-paper";
import * as MediaLibrary from 'expo-media-library';
import { useContext } from 'react';


export default function VideoScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const styles = StyleSheet.create({
     container : {
           flex: 1,
           marginTop: 30
     },
     camera: {
         flex: 1,
         backgroundColor: 'black',
         aspectRatio: 9/16,
     },
     bottomBarContainer: {
        position: 'absolute',
        marginBottom: 30,
        alignItems: 'center',
        //bottom: 40,
        //flexDirection: 'row',
     },
     recordButtonContainer: {
        flex: 1,
        marginHorizontal: 100,
        alignSelf: 'center' 
     },
     recordButton: {
       borderWidth : 8,
       borderColor: 'red',
       backgroundColor: 'brown',
       borderRadius: 100,
       height: 50,
       width: 50,
       alignSelf: 'center' 
     },
     galleryButton: {
       borderWidth : 2,
       borderColor: 'white',
       borderRadius: 10,
       overflow: 'hidden',
       width: 250,
       height: 250,
     },
     galleryButtonImage: {
       width: 250,
       height: 250,
     }
     });
  const[hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const[hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const[hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const[galleryItems, setGalleryItems] = useState([]);
  const[cameraRef, setCameraRef] = useState(null);
  const[cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const[cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const IsFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
        const cameraStatus = await Camera.requestPermissionsAsync();
        setHasCameraPermissions(cameraStatus.status == 'granted');
        console.log("camstat")
        console.log(cameraStatus);
        
        const audioStatus = await Audio.requestPermissionsAsync();
        setHasAudioPermissions(audioStatus.status == 'granted');
        console.log("audiostat")
        console.log(audioStatus);

        const galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
        setHasGalleryPermissions(galleryStatus.status == 'granted');
        console.log("gallstat")
        console.log(galleryStatus);
        //if(galleryStatus.status == 'granted') {
            const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy: ['creationTime'], mediaType: ['video'] });
            
            setGalleryItems(userGalleryMedia.assets)
        //}
    })()
   

  }, [])

  const recordVideo = async () => {
     if(cameraRef) {
      try{
        const options = {maxDuration: 60, quality: Camera.Constants.VideoQuality['480'],}
        const videoRecordPromise = cameraRef.recordAsync(options)
        if(videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          //pass into save component
        }
      } catch (error) {
        console.warn(error)
      }
    }
    
  }
  const stopVideo = async () => {
   if(cameraRef) {
      cameraRef.stopRecording();
    }
  }
  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspectRatio: [16, 9],
      quality: 1
    });
    if(!result.cancelled) {
      console.log(result);
      //pass into save component
    }
  }
  console.log(galleryItems)
  console.log(galleryItems[0]);
  if(!hasCameraPermissions|| !hasAudioPermissions){ //|| !hasGalleryPermissions) { //this doesnt work for some reason. please look into it. 
      return (
        <View>
            <Text style = {{marginTop: 30}}> don't got them perms</Text>
            <Text style = {{marginTop: 30}}> Imdoiasdfngitmrcrabs</Text>
        </View>
      )
  }
  return (
    <View Style = {styles.container}>
        <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
        {IsFocused ? 
        <Camera
        ref = {ref => setCameraRef(ref)}
        style = {styles.camera}
        ratio = {'16:9'}
        type = {cameraType}
        flashmode = {cameraFlash}
        onCameraReady = {() => setIsCameraReady(true)}
        />
      : null}
      <View style = {styles.bottomBarContainer}> 
          <View style = {{flex: 1}}></View>
            <View style = {styles.recordButtonContainer}>
              <TouchableOpacity
                disabled = {!isCameraReady}
                onLongPress= {() =>recordVideo()}
                onPressOut= {() => stopVideo()}
                style = {styles.recordButton}
              />
            
          <View style = {{flex:1}}>
              <TouchableOpacity
                  onPress={() =>pickFromGallery()}
                  style = {styles.galleryButton}>
                    {galleryItems[0] == undefined? 
                      <></>
                    :
                    <Image 
                      styles = {styles.galleryButtonImage}
                      source={{uri: galleryItems[0].uri}}
                      
                    />}
                    
                    <Text>Please select a video to upload</Text>
              </TouchableOpacity>
             
          </View>
          </View>
      </View>
    </View>
    
  );
}
