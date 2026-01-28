import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  useWindowDimensions,
} from 'react-native';
import { getAuthorityScale } from '../utils/authorityScale';

const BASE_HEIGHT_RATIO = 0.55;
const BASE_WIDTH_RATIO = 0.42;

interface FactionAvatarProps {
  assetPath: ImageSourcePropType;
  authority: number;
  totalAuthority?: number;
  opponentAuthority?: number;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  baseHeight?: number;
  baseWidth?: number;
}

export function FactionAvatar({
  assetPath,
  authority,
  totalAuthority,
  opponentAuthority,
  containerStyle,
  imageStyle,
  baseHeight,
  baseWidth,
}: FactionAvatarProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const resolvedTotal =
    totalAuthority ?? authority + (opponentAuthority ?? 0);
  const scale = getAuthorityScale(authority, resolvedTotal);
  const resolvedBaseHeight = baseHeight ?? screenHeight * BASE_HEIGHT_RATIO;
  const resolvedBaseWidth = baseWidth ?? screenWidth * BASE_WIDTH_RATIO;
  const translateY = (1 - scale) * (resolvedBaseHeight / 2);

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={assetPath}
        style={[
          styles.image,
          {
            width: resolvedBaseWidth,
            height: resolvedBaseHeight,
            transform: [{ scale }, { translateY }],
          },
          imageStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
  },
});
